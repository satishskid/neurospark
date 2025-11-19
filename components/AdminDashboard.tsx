import React, { useState, useEffect } from 'react';
import { AdminDashboardData, DetailedUser } from '../admin-types';
import { 
  UsersIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from './Icons';

interface AdminDashboardProps {
  onLogout: () => void;
}

const StatCard = ({ title, value, change, icon, trend }: {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}) => (
  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-cyan-500/10 rounded-lg">
        {icon}
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'
        }`}>
          {trend === 'up' && <TrendingUpIcon className="w-4 h-4" />}
          {trend === 'down' && <TrendingDownIcon className="w-4 h-4" />}
          {change}
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-slate-400 text-sm">{title}</p>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'api' | 'payments'>('overview');

  // Fetch real data from Firebase
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Import dbService dynamically to avoid circular dependencies
        const { dbService } = await import('../services/dbService');
        const analytics = await dbService.getUserAnalytics();
        
        const mockData: AdminDashboardData = {
          userAnalytics: {
            totalUsers: analytics.totalUsers,
            activeUsers: analytics.activeUsers,
            newUsersToday: analytics.newUsersToday,
            completionRate: analytics.completionRate,
            averageSessionTime: 24.3, // TODO: Calculate from actual session data
            topModules: [
              { moduleId: 'module-1', moduleName: 'AI in Practice', completions: 0, averageTime: 18.5, dropoffRate: 12.3 },
              { moduleId: 'module-2', moduleName: 'How AI Thinks', completions: 0, averageTime: 32.1, dropoffRate: 18.7 },
              { moduleId: 'module-3', moduleName: 'Privacy & Ethics', completions: 0, averageTime: 45.2, dropoffRate: 25.4 }
            ],
            userGrowth: [],
            engagementMetrics: {
              dailyActiveUsers: analytics.dailyActiveUsers,
              weeklyActiveUsers: analytics.weeklyActiveUsers,
              monthlyActiveUsers: analytics.monthlyActiveUsers,
              averageSessionsPerUser: 4.2, // TODO: Calculate from actual data
              bounceRate: 23.1 // TODO: Calculate from actual data
            }
          },
      apiHealth: {
        geminiAPI: {
          status: 'healthy',
          responseTime: 245,
          errorRate: 0.8,
          lastCheck: new Date(),
          quotaUsed: 75432,
          quotaLimit: 100000
        },
        fallbackAPI: {
          status: 'healthy',
          responseTime: 189,
          errorRate: 0.3,
          lastCheck: new Date()
        },
        database: {
          status: 'healthy',
          responseTime: 12,
          connections: 45,
          lastCheck: new Date()
        }
      },
      recentUsers: [],
      systemAlerts: [
        {
          id: '1',
          type: 'warning',
          message: 'Gemini API quota at 75% usage',
          timestamp: new Date(),
          resolved: false,
          source: 'api'
        },
        {
          id: '2',
          type: 'info',
          message: 'New payment plan activated: Pro Monthly',
          timestamp: new Date(),
          resolved: true,
          source: 'payment'
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

        setDashboardData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { userAnalytics, apiHealth, systemAlerts, revenueMetrics } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">GreyWaken Admin</h1>
            <p className="text-slate-400">AI Learning Platform Management</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-800/30 border-b border-slate-700/50 px-6">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <ChartBarIcon className="w-5 h-5" /> },
            { id: 'users', label: 'Users', icon: <UsersIcon className="w-5 h-5" /> },
            { id: 'api', label: 'API Health', icon: <CpuChipIcon className="w-5 h-5" /> },
            { id: 'payments', label: 'Payments', icon: <CurrencyDollarIcon className="w-5 h-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={userAnalytics.totalUsers.toLocaleString()}
                change="+12.5%"
                trend="up"
                icon={<UsersIcon className="w-6 h-6 text-cyan-400" />}
              />
              <StatCard
                title="Active Users"
                value={userAnalytics.activeUsers.toLocaleString()}
                change="+8.3%"
                trend="up"
                icon={<CheckCircleIcon className="w-6 h-6 text-green-400" />}
              />
              <StatCard
                title="Completion Rate"
                value={`${userAnalytics.completionRate}%`}
                change="+2.1%"
                trend="up"
                icon={<TrendingUpIcon className="w-6 h-6 text-blue-400" />}
              />
              <StatCard
                title="Monthly Revenue"
                value={`$${revenueMetrics.monthlyRecurringRevenue.toLocaleString()}`}
                change="+15.7%"
                trend="up"
                icon={<CurrencyDollarIcon className="w-6 h-6 text-yellow-400" />}
              />
            </div>

            {/* System Alerts */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4">System Alerts</h2>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      alert.type === 'error' ? 'bg-red-500/10 border border-red-500/20' :
                      alert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                      'bg-blue-500/10 border border-blue-500/20'
                    }`}
                  >
                    <ExclamationTriangleIcon className={`w-5 h-5 ${
                      alert.type === 'error' ? 'text-red-400' :
                      alert.type === 'warning' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white text-sm">{alert.message}</p>
                      <p className="text-slate-400 text-xs">
                        {alert.timestamp.toLocaleString()} • {alert.source}
                      </p>
                    </div>
                    {!alert.resolved && (
                      <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors">
                        Resolve
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content will be added in subsequent components */}
        {activeTab !== 'overview' && (
          <div className="text-center py-12">
            <p className="text-slate-400">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
