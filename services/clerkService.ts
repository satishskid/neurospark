/**
 * Clerk Authentication Service for GreyWaken
 * 
 * This service provides integration points for Clerk authentication.
 * Replace mock implementations with actual Clerk SDK calls.
 * 
 * Setup Instructions:
 * 1. Install Clerk: npm install @clerk/nextjs @clerk/themes
 * 2. Add environment variables to .env.local:
 *    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
 *    - CLERK_SECRET_KEY=sk_test_...
 *    - NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 *    - NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 * 3. Replace mock functions with actual Clerk hooks and API calls
 */

import { AdminUser, DetailedUser } from '../admin-types';

// TODO: Replace with actual Clerk types
export interface ClerkUser {
  id: string;
  emailAddresses: Array<{ emailAddress: string; id: string }>;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt: number;
  lastSignInAt?: number;
  publicMetadata: {
    role?: 'admin' | 'user';
    subscription?: {
      planId: string;
      status: string;
      customerId?: string;
    };
  };
  privateMetadata: {
    totalTimeSpent?: number;
    completedLessons?: string[];
    currentModule?: string;
    streakDays?: number;
  };
}

export class ClerkService {
  private static instance: ClerkService;

  static getInstance(): ClerkService {
    if (!ClerkService.instance) {
      ClerkService.instance = new ClerkService();
    }
    return ClerkService.instance;
  }

  /**
   * TODO: Replace with actual Clerk authentication
   * Use: import { useAuth } from '@clerk/nextjs'
   */
  async authenticateAdmin(email: string, password: string): Promise<boolean> {
    // MOCK IMPLEMENTATION - Replace with Clerk
    console.warn('🚧 MOCK: Replace with Clerk authentication');
    
    // TODO: Implement actual Clerk sign-in
    // const { signIn } = useSignIn();
    // const result = await signIn.create({
    //   identifier: email,
    //   password: password,
    // });
    // return result.status === 'complete';
    
    return email === 'admin@greywaken.ai' && password === 'admin123';
  }

  /**
   * TODO: Replace with Clerk user management
   * Use: import { clerkClient } from '@clerk/nextjs'
   */
  async getUsers(page: number = 1, limit: number = 20): Promise<{ users: DetailedUser[], total: number }> {
    console.warn('🚧 MOCK: Replace with Clerk user fetching');
    
    // TODO: Implement actual Clerk user fetching
    // const users = await clerkClient.users.getUserList({
    //   limit: limit,
    //   offset: (page - 1) * limit,
    // });
    // 
    // return {
    //   users: users.map(this.mapClerkUserToDetailedUser),
    //   total: users.totalCount
    // };

    // Mock implementation
    return this.getMockUsers(page, limit);
  }

  /**
   * TODO: Replace with Clerk user search
   */
  async searchUsers(query: string): Promise<DetailedUser[]> {
    console.warn('🚧 MOCK: Replace with Clerk user search');
    
    // TODO: Implement actual Clerk user search
    // const users = await clerkClient.users.getUserList({
    //   query: query,
    // });
    // return users.map(this.mapClerkUserToDetailedUser);

    // Mock implementation
    const { users } = await this.getMockUsers(1, 100);
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email?.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * TODO: Replace with Clerk user update
   */
  async updateUserMetadata(userId: string, metadata: any): Promise<boolean> {
    console.warn('🚧 MOCK: Replace with Clerk user metadata update');
    
    // TODO: Implement actual Clerk user update
    // await clerkClient.users.updateUserMetadata(userId, {
    //   privateMetadata: metadata
    // });
    // return true;

    console.log('Mock: Updating user metadata for', userId, metadata);
    return true;
  }

  /**
   * TODO: Replace with Clerk admin check
   */
  async isUserAdmin(userId: string): Promise<boolean> {
    console.warn('🚧 MOCK: Replace with Clerk admin role check');
    
    // TODO: Implement actual Clerk admin check
    // const user = await clerkClient.users.getUser(userId);
    // return user.publicMetadata.role === 'admin';

    return userId === 'admin-user-id';
  }

  /**
   * TODO: Replace with Clerk webhook handling
   */
  async handleClerkWebhook(event: any): Promise<void> {
    console.warn('🚧 TODO: Implement Clerk webhook handling');
    
    // TODO: Handle Clerk webhooks for user events
    // switch (event.type) {
    //   case 'user.created':
    //     await this.handleUserCreated(event.data);
    //     break;
    //   case 'user.updated':
    //     await this.handleUserUpdated(event.data);
    //     break;
    //   case 'user.deleted':
    //     await this.handleUserDeleted(event.data);
    //     break;
    // }
  }

  /**
   * Helper function to map Clerk user to our DetailedUser type
   * TODO: Implement actual mapping
   */
  private mapClerkUserToDetailedUser(clerkUser: ClerkUser): DetailedUser {
    return {
      id: clerkUser.id,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Anonymous User',
      email: clerkUser.emailAddresses[0]?.emailAddress,
      joinDate: new Date(clerkUser.createdAt),
      lastActive: new Date(clerkUser.lastSignInAt || clerkUser.createdAt),
      progress: {
        completedLessons: clerkUser.privateMetadata.completedLessons || [],
        currentModule: clerkUser.privateMetadata.currentModule || 'module-1',
        totalTimeSpent: clerkUser.privateMetadata.totalTimeSpent || 0,
        streakDays: clerkUser.privateMetadata.streakDays || 0
      },
      subscription: clerkUser.publicMetadata.subscription ? {
        userId: clerkUser.id,
        planId: clerkUser.publicMetadata.subscription.planId,
        status: clerkUser.publicMetadata.subscription.status as any,
        startDate: new Date(),
        endDate: new Date(),
        usage: {
          aiQueries: 0,
          modulesCompleted: 0
        }
      } : null,
      analytics: {
        sessionsCount: 0,
        averageSessionTime: 0,
        quizzesCompleted: 0,
        exercisesCompleted: 0,
        aiQueriesUsed: 0
      }
    };
  }

  /**
   * Mock data generator - Remove when implementing real Clerk integration
   */
  private async getMockUsers(page: number, limit: number): Promise<{ users: DetailedUser[], total: number }> {
    const mockUsers: DetailedUser[] = Array.from({ length: 100 }, (_, i) => ({
      id: `clerk-user-${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      joinDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      progress: {
        completedLessons: Array.from({ length: Math.floor(Math.random() * 20) }, (_, j) => `lesson-${j + 1}`),
        currentModule: `module-${Math.floor(Math.random() * 5) + 1}`,
        totalTimeSpent: Math.floor(Math.random() * 1000) + 100,
        streakDays: Math.floor(Math.random() * 30)
      },
      subscription: Math.random() > 0.3 ? {
        userId: `clerk-user-${i + 1}`,
        planId: Math.random() > 0.5 ? 'pro' : 'basic',
        status: 'active',
        startDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
        usage: {
          aiQueries: Math.floor(Math.random() * 500),
          modulesCompleted: Math.floor(Math.random() * 10)
        }
      } : null,
      analytics: {
        sessionsCount: Math.floor(Math.random() * 50) + 1,
        averageSessionTime: Math.floor(Math.random() * 60) + 10,
        quizzesCompleted: Math.floor(Math.random() * 30),
        exercisesCompleted: Math.floor(Math.random() * 20),
        aiQueriesUsed: Math.floor(Math.random() * 200)
      }
    }));

    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      users: mockUsers.slice(start, end),
      total: mockUsers.length
    };
  }
}
