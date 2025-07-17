import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { dbService } from './dbService';
import { User } from '@/types';

const provider = new GoogleAuthProvider();
  
export const authService = {
    signInWithGoogle: async (): Promise<User | null> => {
        const result = await signInWithPopup(auth, provider);

        if (!result.user) {
            throw new Error("Sign in failed, no user returned.");
        }

        // Is the User allowed to login?
        const isWhitelisted = await dbService.isUserWhitelisted(result.user.email || '');

        if (!isWhitelisted) {
            throw new Error("User is not whitelisted. Please contact support.");
        }

        // Is the User already logged in?
        const user = await dbService.findUser(result.user.uid);

        if (user) {
            if (user.isLoggedIn) {
                throw new Error("User is already logged in.");
            }

            await dbService.updateUser(result.user.uid, { isLoggedIn: true });
            return user;
        }

        // Create user in database
        const appUser: User = {
            uid: result.user.uid,
            name: result.user.displayName || 'Anonymous',
            email: result.user.email || '',
            isLoggedIn: true,
        };

        try {
            await dbService.createUser(appUser);
            return appUser;
        } catch (error) {
            throw new Error('Failed to create user in database');
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
        const appUser = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Anonymous',
            email: firebaseUser.email || '',
            isLoggedIn: true,
        };
        callback(appUser);
        } else {
        callback(null);
        }
    });
    }
};