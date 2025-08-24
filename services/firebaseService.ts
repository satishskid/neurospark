import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebaseConfig";
import { dbService } from "./dbService";
import { User } from "@/types";
import { LOGIN_BLOCKED, LOGIN_BLOCK_MESSAGE } from "@/maintenanceConfig";

const provider = new GoogleAuthProvider();

export const authService = {
  signInWithEmail: async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      if (LOGIN_BLOCKED) {
        throw new Error(LOGIN_BLOCK_MESSAGE);
      }
      const result = await signInWithEmailAndPassword(auth, email, password);

      // This means either the user creds are wrong or
      // the user is not whitelisted.
      if (!result.user) {
        throw new Error(
          "Sign in failed. User is not authorized. Please contact support."
        );
      }

      // Only whitelisted users reach this part.
      let user = await dbService.findUser(result.user.uid);

      if (user) {
        if (user.isLoggedIn) {
          throw new Error("User is already logged in.");
        }

        await dbService.updateUser(result.user.uid, { isLoggedIn: true });
      } else {
        // If user is whitelisted but not in db means first login
        // So create the user.
        await dbService.createUser({
          uid: result.user.uid,
          name: result.user.displayName || "Anonymous",
          email: result.user.email || "",
          isLoggedIn: true,
        });
      }

      return await dbService.findUser(result.user.uid);
    } catch (err) {
      console.log(err);
      throw new Error("Authorization Error. Please contact support");
    }
  },

  signInWithGoogle: async (): Promise<User | null> => {
    try {
      if (LOGIN_BLOCKED) {
        throw new Error(LOGIN_BLOCK_MESSAGE);
      }
      const result = await signInWithPopup(auth, provider);

      // This means either the user creds are wrong or
      // the user is not whitelisted.
      if (!result.user) {
        throw new Error(
          "Sign in failed. User is not authorized. Please contact support."
        );
      }

      // Only whitelisted users reach this part.
      let user = await dbService.findUser(result.user.uid);

      if (user) {
        if (user.isLoggedIn) {
          throw new Error("User is already logged in.");
        }

        await dbService.updateUser(result.user.uid, { isLoggedIn: true });
      } else {
        // If user is whitelisted but not in db means first login
        // So create the user.
        await dbService.createUser({
          uid: result.user.uid,
          name: result.user.displayName || "Anonymous",
          email: result.user.email || "",
          isLoggedIn: true,
        });
      }

      return await dbService.findUser(result.user.uid);
    } catch (err) {
      console.log(err);
      throw new Error("Authorization Error. Please contact support");
    }
  },

  signOut: async (): Promise<void> => {
    const user = auth.currentUser;

    if (user) {
      await dbService.updateUser(user.uid, { isLoggedIn: false });
    }

    return signOut(auth);
  },

  onAuthStateChanged: (callback: (user: any | null) => void): (() => void) => {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        dbService.findUser(firebaseUser.uid).then((dbUser) => {
          const appUser = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "Anonymous",
            email: firebaseUser.email || "",
            isLoggedIn: dbUser?.isLoggedIn || false,
          };
          callback(appUser);
        });
      } else {
        callback(null);
      }
    });
  },
};
