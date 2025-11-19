import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import APIHealthPanel from './components/APIHealthPanel';
import PaymentPlansPanel from './components/PaymentPlansPanel';
import UserManagementPanel from './components/UserManagementPanel';
import CurriculumManagementPanel from './components/CurriculumManagementPanel';
import PromotionalContentPanel from './components/PromotionalContentPanel';
import { AdminService } from './services/adminService';
import { 
  ChartBarIcon, 
  UsersIcon, 
  CpuChipIcon, 
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  SparklesIcon
} from './components/Icons';

type AdminTab = 'overview' | 'users' | 'api' | 'payments' | 'curriculum' | 'promotional' | 'settings';

interface AdminAppProps {
  onBackToJourney?: () => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ onBackToJourney }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loading, setLoading] = useState(true);

  const adminService = AdminService.getInstance();

  useEffect(() => {
    // Check if admin is already logged in (in real app, check JWT token)
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const success = await adminService.authenticateAdmin(credentials.email, credentials.password);
      if (success) {
        localStorage.setItem('adminToken', 'mock-admin-token');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setActiveTab('overview');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="text-slate-400">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900">
        <AdminLogin onLogin={handleLogin} />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon, component: AdminDashboard },
    { id: 'users', label: 'Users', icon: UsersIcon, component: UserManagementPanel },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpenIcon, component: CurriculumManagementPanel },
    { id: 'promotional', label: 'Promotional', icon: SparklesIcon, component: PromotionalContentPanel },
    { id: 'api', label: 'API Health', icon: CpuChipIcon, component: APIHealthPanel },
    { id: 'payments', label: 'Payments', icon: CurrencyDollarIcon, component: PaymentPlansPanel },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdminDashboard;

  return (
    <div className="min-h-screen bg-slate-900 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/30 border-r border-slate-700/50 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-white font-bold">GW</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">GreyWaken</h1>
              <p className="text-slate-400 text-xs">Admin Portal</p>
            </div>
          </div>
          {onBackToJourney && (
            <button
              onClick={onBackToJourney}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <span>← Back to Learning</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
              activeTab === 'settings'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            Settings
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-800/20">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">
                {activeTab === 'overview' ? 'Dashboard' : activeTab}
              </h1>
              <p className="text-slate-400">
                {activeTab === 'overview' && 'System overview and key metrics'}
                {activeTab === 'users' && 'Manage user accounts and analytics'}
                {activeTab === 'curriculum' && 'View and manage course content'}
                {activeTab === 'api' && 'Monitor API health and configuration'}
                {activeTab === 'payments' && 'Manage subscription plans and billing'}
                {activeTab === 'settings' && 'System configuration and preferences'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && <AdminDashboard onLogout={handleLogout} />}
          {activeTab === 'users' && <UserManagementPanel />}
          {activeTab === 'curriculum' && <CurriculumManagementPanel />}
          {activeTab === 'api' && <APIHealthPanel />}
          {activeTab === 'payments' && <PaymentPlansPanel />}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Cog6ToothIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
              <p className="text-slate-400">System settings and configuration options coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
