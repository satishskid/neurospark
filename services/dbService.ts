import { doc, getDoc, setDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from '@/types';

const USERS_COLLECTION = 'users';
const WHITELIST_COLLECTION = 'whitelist';

export const dbService = {

    isUserWhitelisted: async (email: string): Promise<boolean> => {
        if (!email) return false;
        
        const whitelistRef = collection(db, WHITELIST_COLLECTION);
        const q = query(whitelistRef, where("email", "==", email.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        return !querySnapshot.empty;
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
    }
};