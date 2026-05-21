import { doc, getDoc, setDoc, collection, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from '@/types';

const USERS_COLLECTION = 'users';
const WHITELIST_COLLECTION = 'whitelist';
const ADMINS_COLLECTION = 'admins';

export const SUPER_ADMINS = ['pranitskid@gmail.com', 'satishskid@gmail.com', 'satish@skids.health', 'pranit@skids.health'];

export const dbService = {

    isSuperAdmin: (email: string): boolean => {
        if (!email) return false;
        return SUPER_ADMINS.includes(email.toLowerCase());
    },

    isUserAdmin: async (email: string): Promise<boolean> => {
        if (!email) return false;
        if (dbService.isSuperAdmin(email)) return true;
        
        try {
            const adminDocRef = doc(db, ADMINS_COLLECTION, email.toLowerCase());
            const docSnap = await getDoc(adminDocRef);
            return docSnap.exists();
        } catch (e) {
            console.error("Error checking admin status:", e);
            return false;
        }
    },

    getAdmins: async (): Promise<any[]> => {
        try {
            const adminsRef = collection(db, ADMINS_COLLECTION);
            const snapshot = await getDocs(adminsRef);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Error fetching admins:", e);
            return [];
        }
    },

    addAdmin: async (email: string, addedBy: string): Promise<void> => {
        if (!email) return;
        const normalized = email.toLowerCase();
        const adminDocRef = doc(db, ADMINS_COLLECTION, normalized);
        await setDoc(adminDocRef, {
            email: normalized,
            addedBy,
            addedAt: new Date().toISOString()
        });
    },

    removeAdmin: async (email: string): Promise<void> => {
        if (!email) return;
        const normalized = email.toLowerCase();
        const adminDocRef = doc(db, ADMINS_COLLECTION, normalized);
        await deleteDoc(adminDocRef);
    },

    isUserWhitelisted: async (email: string): Promise<boolean> => {
        if (!email) return false;
        if (dbService.isSuperAdmin(email)) return true;
        
        try {
            // Also check if they are in the admins collection since admins are implicitly whitelisted
            const isAdmin = await dbService.isUserAdmin(email);
            if (isAdmin) return true;

            const whitelistDocRef = doc(db, WHITELIST_COLLECTION, email.toLowerCase());
            const docSnap = await getDoc(whitelistDocRef);
            return docSnap.exists();
        } catch (e) {
            console.error("Error checking whitelist status:", e);
            return false;
        }
    },

    getWhitelist: async (): Promise<any[]> => {
        try {
            const whitelistRef = collection(db, WHITELIST_COLLECTION);
            const snapshot = await getDocs(whitelistRef);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Error fetching whitelist:", e);
            return [];
        }
    },

    addToWhitelist: async (email: string, addedBy: string): Promise<void> => {
        if (!email) return;
        const normalized = email.toLowerCase();
        const whitelistDocRef = doc(db, WHITELIST_COLLECTION, normalized);
        await setDoc(whitelistDocRef, {
            email: normalized,
            addedBy,
            addedAt: new Date().toISOString()
        });
    },

    removeFromWhitelist: async (email: string): Promise<void> => {
        if (!email) return;
        const normalized = email.toLowerCase();
        const whitelistDocRef = doc(db, WHITELIST_COLLECTION, normalized);
        await deleteDoc(whitelistDocRef);
    },

    getAllUsersProgress: async (): Promise<User[]> => {
        try {
            const usersRef = collection(db, USERS_COLLECTION);
            const snapshot = await getDocs(usersRef);
            return snapshot.docs.map(doc => doc.data() as User);
        } catch (e) {
            console.error("Error fetching users progress:", e);
            return [];
        }
    },

    createUser: async (user: User): Promise<void> => {
        const docRef = doc(db, USERS_COLLECTION, user.uid);

        const userData: User = {
            uid: user.uid,
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString(),
            isLoggedIn: user.isLoggedIn,
            updatedAt: new Date().toISOString(),
            userPersona: null,
            courseMode: null,
            userProfession: null,
            currentLevelIndex: 0,
            totalPoints: 0,
            achievedBadgeIds: [],
            completedSteps: {},
            theme: 'playful',
            analogyTheme: null,
            isAdmin: false,
        };
    
        await setDoc(docRef, userData);
    },

    findUser: async (uid: string): Promise<User | null> => {
        const docRef = doc(db, USERS_COLLECTION, uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as User : null;
    },

    updateUser: async (uid: string, user: any): Promise<void> => {
        const docRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(docRef, user);
    },

    deleteUser: async (uid: string): Promise<void> => {
        const docRef = doc(db, USERS_COLLECTION, uid);
        await deleteDoc(docRef);
    }
};