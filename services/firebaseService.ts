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

      // Check whitelist BEFORE completing login in Firebase or right after, but before making user session active.
      // Better to check right after we sign in, then sign out if unwhitelisted.
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user) {
        throw new Error(
          "Sign in failed. User is not authorized. Please contact support."
        );
      }

      const emailStr = result.user.email || "";
      const isWhitelisted = await dbService.isUserWhitelisted(emailStr);

      if (!isWhitelisted) {
        await signOut(auth);
        throw new Error("Unauthorized. Your email is not whitelisted. Please contact support.");
      }

      let user = await dbService.findUser(result.user.uid);

      if (user) {
        // We will allow logging in even if isLoggedIn was true, to prevent getting locked out on browser close,
        // but let's update their login state.
        await dbService.updateUser(result.user.uid, { isLoggedIn: true, updatedAt: new Date().toISOString() });
      } else {
        // If user is whitelisted but not in db means first login
        // So create the user.
        await dbService.createUser({
          uid: result.user.uid,
          name: result.user.displayName || emailStr.split('@')[0] || "Anonymous",
          email: emailStr,
          isLoggedIn: true,
        });
      }

      return await dbService.findUser(result.user.uid);
    } catch (err: any) {
      console.error(err);
      if (err.message && (err.message.includes("not whitelisted") || err.message.includes("logged in") || err.message.includes(LOGIN_BLOCK_MESSAGE))) {
        throw err;
      }
      throw new Error(err.message || "Authorization Error. Please contact support");
    }
  },

  signInWithGoogle: async (): Promise<User | null> => {
    try {
      if (LOGIN_BLOCKED) {
        throw new Error(LOGIN_BLOCK_MESSAGE);
      }
      const result = await signInWithPopup(auth, provider);

      if (!result.user) {
        throw new Error(
          "Sign in failed. User is not authorized. Please contact support."
        );
      }

      const emailStr = result.user.email || "";
      const isWhitelisted = await dbService.isUserWhitelisted(emailStr);

      if (!isWhitelisted) {
        await signOut(auth);
        throw new Error("Unauthorized. Your email is not whitelisted. Please contact support.");
      }

      let user = await dbService.findUser(result.user.uid);

      if (user) {
        await dbService.updateUser(result.user.uid, { isLoggedIn: true, updatedAt: new Date().toISOString() });
      } else {
        // If user is whitelisted but not in db means first login
        // So create the user.
        await dbService.createUser({
          uid: result.user.uid,
          name: result.user.displayName || emailStr.split('@')[0] || "Anonymous",
          email: emailStr,
          isLoggedIn: true,
        });
      }

      return await dbService.findUser(result.user.uid);
    } catch (err: any) {
      console.error(err);
      if (err.message && (err.message.includes("not whitelisted") || err.message.includes("logged in") || err.message.includes(LOGIN_BLOCK_MESSAGE))) {
        throw err;
      }
      throw new Error(err.message || "Authorization Error. Please contact support");
    }
  },

  signOut: async (): Promise<void> => {
    const user = auth.currentUser;

    if (user) {
      try {
        await dbService.updateUser(user.uid, { isLoggedIn: false });
      } catch (e) {
        console.error("Failed to update user login status in DB during sign out", e);
      }
    }

    return signOut(auth);
  },

  onAuthStateChanged: (callback: (user: any | null) => void): (() => void) => {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        dbService.findUser(firebaseUser.uid).then((dbUser) => {
          // Check if still whitelisted on state change
          dbService.isUserWhitelisted(firebaseUser.email || '').then((isWhitelisted) => {
            if (!isWhitelisted) {
              // Sign out immediately at runtime
              signOut(auth);
              callback(null);
            } else {
              const appUser = {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || dbUser?.name || "Anonymous",
                email: firebaseUser.email || "",
                isLoggedIn: dbUser?.isLoggedIn || false,
              };
              callback(appUser);
            }
          });
        });
      } else {
        callback(null);
      }
    });
  },
};
