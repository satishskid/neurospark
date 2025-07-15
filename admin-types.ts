// Admin-specific types for greybrain.ai

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'support';
  name: string;
  lastLogin: Date;
  permissions: AdminPermission[];
}

export interface AdminPermission {
  resource: 'users' | 'analytics' | 'api' | 'payments' | 'content';
  actions: ('read' | 'write' | 'delete')[];
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  completionRate: number;
  averageSessionTime: number;
  topModules: ModuleStats[];
  userGrowth: GrowthData[];
  engagementMetrics: EngagementData;
}

export interface ModuleStats {
  moduleId: string;
  moduleName: string;
  completions: number;
  averageTime: number;
  dropoffRate: number;
}

export interface GrowthData {
  date: string;
  newUsers: number;
  activeUsers: number;
  completions: number;
}

export interface EngagementData {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionsPerUser: number;
  bounceRate: number;
}

export interface APIHealthStatus {
  geminiAPI: {
    status: 'healthy' | 'degraded' | 'down';
    responseTime: number;
    errorRate: number;
    lastCheck: Date;
    quotaUsed: number;
    quotaLimit: number;
  };
  fallbackAPI: {
    status: 'healthy' | 'degraded' | 'down';
    responseTime: number;
    errorRate: number;
    lastCheck: Date;
  };
  database: {
    status: 'healthy' | 'degraded' | 'down';
    responseTime: number;
    connections: number;
    lastCheck: Date;
  };
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    aiQueries: number;
    modules: number;
    support: 'basic' | 'priority' | 'dedicated';
  };
  isActive: boolean;
}

export interface UserSubscription {
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date;
  usage: {
    aiQueries: number;
    modulesCompleted: number;
  };
  paymentMethod?: {
    type: 'card' | 'paypal';
    last4?: string;
  };
}

export interface DetailedUser {
  id: string;
  name: string;
  email?: string;
  joinDate: Date;
  lastActive: Date;
  progress: {
    completedLessons: string[];
    currentModule: string;
    totalTimeSpent: number;
    streakDays: number;
  };
  subscription: UserSubscription | null;
  analytics: {
    sessionsCount: number;
    averageSessionTime: number;
    quizzesCompleted: number;
    exercisesCompleted: number;
    aiQueriesUsed: number;
  };
}

export interface AdminDashboardData {
  userAnalytics: UserAnalytics;
  apiHealth: APIHealthStatus;
  recentUsers: DetailedUser[];
  systemAlerts: SystemAlert[];
  revenueMetrics: RevenueMetrics;
}

export interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
  source: 'api' | 'payment' | 'user' | 'system';
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  averageRevenuePerUser: number;
  conversionRate: number;
  trialToPayingConversion: number;
}
