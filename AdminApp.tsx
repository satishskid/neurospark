import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { dbService } from './services/dbService';
import { authService } from './services/firebaseService';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import APIHealthPanel from './components/APIHealthPanel';
import PaymentPlansPanel from './components/PaymentPlansPanel';
import UserManagementPanel from './components/UserManagementPanel';
import WhitelistPanel from './components/WhitelistPanel';
import AdminManagementPanel from './components/AdminManagementPanel';

import { 
  ChartBarIcon, 
  UsersIcon, 
  CpuChipIcon, 
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from './components/Icons';

type AdminTab = 'overview' | 'users' | 'whitelist' | 'admins' | 'api' | 'payments' | 'settings';

const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Monitor real Firebase Auth changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setAuthError(null);

      if (firebaseUser && firebaseUser.email) {
        const email = firebaseUser.email.toLowerCase();
        try {
          const isAdmin = await dbService.isUserAdmin(email);
          if (isAdmin) {
            setAdminEmail(email);
            setIsSuperAdmin(dbService.isSuperAdmin(email));
            setIsAuthenticated(true);
          } else {
            // Logged in user is not an administrator, deny entry!
            await authService.signOut();
            setAdminEmail(null);
            setIsSuperAdmin(false);
            setIsAuthenticated(false);
            setAuthError("Access Denied: You do not have administrator permissions.");
          }
        } catch (err) {
          console.error("Error authenticating admin:", err);
          setAuthError("Failed to verify administrator credentials.");
        }
      } else {
        setAdminEmail(null);
        setIsSuperAdmin(false);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setIsAuthenticated(false);
      setAdminEmail(null);
      setIsSuperAdmin(false);
      setActiveTab('overview');
    } catch (e) {
      console.error("Failed to sign out:", e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-slate-400 text-sm font-mono tracking-wider animate-pulse">SYNCHRONIZING SECURE SHELL...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin error={authError} setError={setAuthError} />;
  }

  // Dynamically configure tabs based on Super Admin privileges
  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'users', label: 'Student Progress', icon: UsersIcon },
    { id: 'whitelist', label: 'Whitelist Grid', icon: CheckCircleIcon },
    ...(isSuperAdmin ? [{ id: 'admins', label: 'Manage Admins', icon: ShieldCheckIcon }] : []),
    { id: 'api', label: 'API Health', icon: CpuChipIcon },
    { id: 'payments', label: 'Payments', icon: CurrencyDollarIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/50 border-r border-slate-800/50 flex flex-col z-10 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <span className="text-white font-bold text-sm">GW</span>
            </div>
            <div>
              <h1 className="text-white font-extrabold tracking-tight text-sm">GreyWaken</h1>
              <p className="text-slate-500 text-xs font-medium">Platform Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
        <div className="p-4 border-t border-slate-800/50 space-y-1">
          <div className="px-4 py-2 mb-2 bg-slate-950/40 rounded-xl border border-slate-900 text-center">
            <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold">Active Session</p>
            <p className="text-xs text-slate-300 font-mono truncate max-w-full mt-0.5" title={adminEmail || ''}>
              {adminEmail}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-205 text-sm font-semibold ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            System Settings
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 font-semibold text-sm transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/80">
        {/* Header */}
        <header className="bg-slate-900/20 border-b border-slate-800/50 px-8 py-5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white capitalize">
                {activeTab === 'overview' ? 'Dashboard Metrics' : tabs.find(t => t.id === activeTab)?.label || 'System Settings'}
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                {activeTab === 'overview' && 'Overview of core system performance, medical student activity, and operational statistics.'}
                {activeTab === 'users' && 'Real-time progress overview of clinical students enrolled on the platform.'}
                {activeTab === 'whitelist' && 'Spreadsheet editor for fast whitelisting, bulk enrolling, and instant runtime access revocation.'}
                {activeTab === 'admins' && 'Management panel to delegate platform administration privileges to other clinical coordinators.'}
                {activeTab === 'api' && 'Real-time monitoring of integrated API providers, prompt usage endpoints, and token counts.'}
                {activeTab === 'payments' && 'Configuration panel for student plans, group discount keys, and Stripe integrations.'}
                {activeTab === 'settings' && 'Configure custom biological analogy engines, prompt guardrails, and general settings.'}
              </p>
            </div>
            
            <div className="text-sm font-semibold text-slate-500 shrink-0 hidden sm:block bg-slate-900/60 border border-slate-850 px-4 py-2 rounded-xl">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'overview' && <AdminDashboard onLogout={handleLogout} />}
          {activeTab === 'users' && <UserManagementPanel />}
          {activeTab === 'whitelist' && <WhitelistPanel />}
          {activeTab === 'admins' && isSuperAdmin && <AdminManagementPanel />}
          {activeTab === 'api' && <APIHealthPanel />}
          {activeTab === 'payments' && <PaymentPlansPanel />}
          {activeTab === 'settings' && (
            <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl max-w-xl mx-auto mt-10">
              <Cog6ToothIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Platform Preferences</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                System configuration preferences, theme definitions, and database backup configurations will be available in the next release.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
