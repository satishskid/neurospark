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
    },

    // Admin functions
    getAllUsers: async (): Promise<User[]> => {
        const usersRef = collection(db, USERS_COLLECTION);
        const querySnapshot = await getDocs(usersRef);
        return querySnapshot.docs.map(doc => doc.data() as User);
    },

    getUserAnalytics: async () => {
        const users = await dbService.getAllUsers();
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.isLoggedIn).length;
        const newUsersToday = users.filter(u => {
            const createdAt = new Date(u.createdAt || '');
            return createdAt >= today;
        }).length;

        const usersWithProgress = users.filter(u => u.courseProgress && Object.keys(u.courseProgress).length > 0);
        const completionRate = totalUsers > 0 
            ? (usersWithProgress.filter(u => {
                const progress = Object.values(u.courseProgress || {});
                return progress.some(p => p.certificateEarned);
            }).length / totalUsers) * 100 
            : 0;

        return {
            totalUsers,
            activeUsers,
            newUsersToday,
            completionRate: Math.round(completionRate * 10) / 10,
            dailyActiveUsers: users.filter(u => {
                const lastAccess = u.courseProgress ? 
                    Math.max(...Object.values(u.courseProgress).map(p => new Date(p.lastAccessed).getTime())) : 0;
                return lastAccess >= today.getTime();
            }).length,
            weeklyActiveUsers: users.filter(u => {
                const lastAccess = u.courseProgress ? 
                    Math.max(...Object.values(u.courseProgress).map(p => new Date(p.lastAccessed).getTime())) : 0;
                return lastAccess >= weekAgo.getTime();
            }).length,
            monthlyActiveUsers: users.filter(u => {
                const lastAccess = u.courseProgress ? 
                    Math.max(...Object.values(u.courseProgress).map(p => new Date(p.lastAccessed).getTime())) : 0;
                return lastAccess >= monthAgo.getTime();
            }).length,
        };
    },

    getWhitelistedUsers: async () => {
        const whitelistRef = collection(db, WHITELIST_COLLECTION);
        const querySnapshot = await getDocs(whitelistRef);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Issue reporting
    reportIssue: async (issue: {
        userId: string;
        userEmail: string;
        userName: string;
        issueType: 'bug' | 'feature' | 'content' | 'technical' | 'other';
        title: string;
        description: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        currentPage?: string;
        browserInfo?: string;
    }) => {
        const issuesRef = collection(db, 'issues');
        const newIssueRef = doc(issuesRef); // Auto-generate ID
        await setDoc(newIssueRef, {
            ...issue,
            status: 'open',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            resolvedAt: null,
            adminNotes: ''
        });
    },

    getAllIssues: async () => {
        const issuesRef = collection(db, 'issues');
        const querySnapshot = await getDocs(issuesRef);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    updateIssueStatus: async (issueId: string, status: 'open' | 'in-progress' | 'resolved' | 'closed', adminNotes?: string) => {
        const issueRef = doc(db, 'issues', issueId);
        const updateData: any = {
            status,
            updatedAt: new Date().toISOString()
        };
        if (status === 'resolved' || status === 'closed') {
            updateData.resolvedAt = new Date().toISOString();
        }
        if (adminNotes) {
            updateData.adminNotes = adminNotes;
        }
        await updateDoc(issueRef, updateData);
    }
};