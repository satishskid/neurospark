import { AdminDashboardData, APIHealthStatus, DetailedUser, UserAnalytics } from '../admin-types';
import { ClerkService } from './clerkService';
import { PaymentService } from './paymentService';

/**
 * Admin Service for GreyWaken
 *
 * This service orchestrates data from various sources (Clerk, Stripe, Database)
 * to provide a unified admin interface.
 *
 * TODO: Replace mock implementations with actual service integrations
 */
export class AdminService {
  private static instance: AdminService;
  private mockUsers: DetailedUser[] = [];

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  private clerkService = ClerkService.getInstance();
  private paymentService = PaymentService.getInstance();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Generate mock users
    this.mockUsers = Array.from({ length: 100 }, (_, i) => ({
      id: `user-${i + 1}`,
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
        userId: `user-${i + 1}`,
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
  }

  async authenticateAdmin(email: string, password: string): Promise<boolean> {
    // TODO: Replace with actual admin authentication via Clerk
    console.warn('🚧 TODO: Implement admin authentication via Clerk');

    // Use Clerk service for authentication
    return await this.clerkService.authenticateAdmin(email, password);
  }

  async getDashboardData(): Promise<AdminDashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const activeUsers = this.mockUsers.filter(user => 
      new Date(user.lastActive).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    );

    const userAnalytics: UserAnalytics = {
      totalUsers: this.mockUsers.length,
      activeUsers: activeUsers.length,
      newUsersToday: this.mockUsers.filter(user => 
        new Date(user.joinDate).toDateString() === new Date().toDateString()
      ).length,
      completionRate: 68.5,
      averageSessionTime: 24.3,
      topModules: [
        { moduleId: 'module-1', moduleName: 'AI Fundamentals', completions: 8934, averageTime: 18.5, dropoffRate: 12.3 },
        { moduleId: 'module-2', moduleName: 'Machine Learning', completions: 6721, averageTime: 32.1, dropoffRate: 18.7 },
        { moduleId: 'module-3', moduleName: 'Neural Networks', completions: 4532, averageTime: 45.2, dropoffRate: 25.4 }
      ],
      userGrowth: [],
      engagementMetrics: {
        dailyActiveUsers: activeUsers.length,
        weeklyActiveUsers: activeUsers.length,
        monthlyActiveUsers: this.mockUsers.length,
        averageSessionsPerUser: 4.2,
        bounceRate: 23.1
      }
    };

    return {
      userAnalytics,
      apiHealth: await this.getAPIHealth(),
      recentUsers: this.mockUsers.slice(0, 10),
      systemAlerts: [
        {
          id: '1',
          type: 'warning',
          message: 'Gemini API quota at 75% usage',
          timestamp: new Date(),
          resolved: false,
          source: 'api'
        }
      ],
      revenueMetrics: {
        totalRevenue: 45678.90,
        monthlyRecurringRevenue: 12345.67,
        churnRate: 3.2,
        averageRevenuePerUser: 23.45,
        conversionRate: 12.8,
        trialToPayingConversion: 18.5
      }
    };
  }

  async getAPIHealth(): Promise<APIHealthStatus> {
    // Mock API health checks
    return {
      geminiAPI: {
        status: 'healthy',
        responseTime: Math.floor(Math.random() * 300) + 100,
        errorRate: Math.random() * 2,
        lastCheck: new Date(),
        quotaUsed: 75432,
        quotaLimit: 100000
      },
      fallbackAPI: {
        status: 'healthy',
        responseTime: Math.floor(Math.random() * 200) + 50,
        errorRate: Math.random() * 1,
        lastCheck: new Date()
      },
      database: {
        status: 'healthy',
        responseTime: Math.floor(Math.random() * 20) + 5,
        connections: Math.floor(Math.random() * 50) + 20,
        lastCheck: new Date()
      }
    };
  }

  async getUsers(page: number = 1, limit: number = 20): Promise<{ users: DetailedUser[], total: number }> {
    // TODO: Replace with actual Clerk user fetching
    console.warn('🚧 TODO: Fetch users from Clerk');

    // Use Clerk service for user management
    return await this.clerkService.getUsers(page, limit);
  }

  async searchUsers(query: string): Promise<DetailedUser[]> {
    // TODO: Replace with actual Clerk user search
    console.warn('🚧 TODO: Search users via Clerk');

    // Use Clerk service for user search
    return await this.clerkService.searchUsers(query);
  }

  async updateAPIConfig(config: {
    primaryAPI: string;
    fallbackAPI: string;
    quotaLimit: number;
  }): Promise<boolean> {
    // Mock API config update
    console.log('Updating API config:', config);
    return true;
  }

  async testAPIEndpoint(endpoint: 'gemini' | 'fallback'): Promise<{
    success: boolean;
    responseTime: number;
    error?: string;
  }> {
    // Mock API test
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    const success = Math.random() > 0.1; // 90% success rate
    
    return {
      success,
      responseTime: Math.floor(Math.random() * 500) + 100,
      error: success ? undefined : 'Connection timeout'
    };
  }

  async getPaymentPlans() {
    // TODO: Replace with actual Stripe plans fetching
    console.warn('🚧 TODO: Fetch payment plans from Stripe');

    // Use Payment service for plan management
    return await this.paymentService.getPaymentPlans();
  }
}
