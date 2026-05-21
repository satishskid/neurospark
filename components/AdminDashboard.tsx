import React, { useState, useEffect } from 'react';
import { dbService, SUPER_ADMINS } from '../services/dbService';
import { CURRICULUM } from '../constants';
import { User } from '../types';
import { 
  UsersIcon, 
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ShieldCheckIcon
} from './Icons';

interface AdminDashboardProps {
  onLogout?: () => void;
}

const StatCard = ({ title, value, description, icon, colorClass, borderClass }: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  borderClass: string;
}) => (
  <div className={`bg-slate-900/40 rounded-2xl p-6 border ${borderClass} shadow-xl hover:scale-[1.01] transition-all duration-305 flex items-center justify-between`}>
    <div className="space-y-2">
      <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-black text-white">{value}</h3>
      <p className="text-slate-500 text-xs font-semibold">{description}</p>
    </div>
    <div className={`p-4 rounded-2xl ${colorClass} shadow-inner`}>
      {icon}
    </div>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [whitelist, setWhitelist] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const totalLessons = CURRICULUM.flatMap(m => m.lessons).length;

  const loadData = async () => {
    setLoading(true);
    try {
      const [allUsers, whitelistData, adminsData] = await Promise.all([
        dbService.getAllUsersProgress(),
        dbService.getWhitelist(),
        dbService.getAdmins()
      ]);
      setUsers(allUsers);
      setWhitelist(whitelistData);
      setAdmins(adminsData);
    } catch (e) {
      console.error("Failed to load admin overview statistics:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400 mb-3"></div>
        <p className="text-slate-400 text-sm font-mono tracking-wider animate-pulse">COMPUTING REAL-TIME SYSTEM METRICS...</p>
      </div>
    );
  }

  // Calculate dynamic stats
  const totalRegistered = users.length;
  const totalWhitelisted = whitelist.length;
  
  // Certified: completed all steps
  const totalCertified = users.filter(u => u.completedSteps && Object.keys(u.completedSteps).length >= totalLessons).length;
  
  // Active: completed at least 1 step
  const totalActive = users.filter(u => u.completedSteps && Object.keys(u.completedSteps).length > 0).length;

  // Engagement percentage: active users / registered users
  const engagementRate = totalRegistered > 0 ? Math.round((totalActive / totalRegistered) * 100) : 0;

  // Recent 5 registered users
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 5);

  // Deduplicate admins by merging SUPER_ADMINS and Firestore admins
  const uniqueAdmins = new Set([
    ...admins.map(a => a.email?.toLowerCase() || a.id?.toLowerCase()).filter(Boolean),
    ...SUPER_ADMINS.map(email => email.toLowerCase())
  ]);
  const activeAdminsCount = uniqueAdmins.size;

  // Module completions tracker
  const moduleStats = CURRICULUM.map(module => {
    const moduleLessons = module.lessons || [];
    let completedLessonsCount = 0;
    
    users.forEach(user => {
      if (user.completedSteps) {
        moduleLessons.forEach(lesson => {
          if (user.completedSteps?.[lesson.id]) {
            completedLessonsCount++;
          }
        });
      }
    });

    return {
      id: module.id,
      title: module.title,
      totalCompletions: completedLessonsCount,
      lessonsCount: moduleLessons.length
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Action panel header */}
      <div className="flex items-center justify-between border-b border-slate-850 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            System Operations
            <span className="text-xs bg-green-500/20 text-green-400 font-mono px-2.5 py-0.5 rounded-full border border-green-500/10">Live Stats</span>
          </h2>
          <p className="text-slate-400 text-sm">Real-time statistics fetched directly from the database.</p>
        </div>
        <button
          onClick={loadData}
          className="p-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-450 hover:text-white rounded-xl transition-all flex items-center gap-2 text-sm font-semibold shrink-0"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Sync metrics
        </button>
      </div>

      {/* Grid statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Registered Doctors"
          value={totalRegistered}
          description="Doctors signed up on platform"
          borderClass="border-slate-800/80 hover:border-cyan-500/30"
          colorClass="bg-cyan-500/10 text-cyan-400"
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Whitelisted Slots"
          value={totalWhitelisted}
          description="Emails cleared for enrollment"
          borderClass="border-slate-800/80 hover:border-purple-500/30"
          colorClass="bg-purple-500/10 text-purple-400"
          icon={<ShieldCheckIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Active Students"
          value={totalActive}
          description={`${engagementRate}% overall participation`}
          borderClass="border-slate-800/80 hover:border-green-500/30"
          colorClass="bg-green-500/10 text-green-400"
          icon={<CheckCircleIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Certified Alumni"
          value={totalCertified}
          description="Completed the entire curriculum"
          borderClass="border-slate-800/80 hover:border-amber-500/30"
          colorClass="bg-amber-500/10 text-amber-400"
          icon={<TrophyIcon className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module completions heat roster */}
        <div className="lg:col-span-2 bg-slate-900/20 border border-slate-850 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5 text-cyan-400" />
              Curriculum Activity Heatmap
            </h3>
            <p className="text-slate-400 text-xs mt-1">Total completed lessons across all students sorted by module.</p>
          </div>
          
          <div className="space-y-4">
            {moduleStats.map(stat => {
              const maxPossibleCompletions = totalRegistered * stat.lessonsCount;
              const percent = maxPossibleCompletions > 0 
                ? Math.round((stat.totalCompletions / maxPossibleCompletions) * 100)
                : 0;

              return (
                <div key={stat.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-300 truncate max-w-[70%]" title={stat.title}>
                      {stat.title}
                    </span>
                    <span className="text-cyan-400 shrink-0">
                      {stat.totalCompletions} completions ({percent}% engagement)
                    </span>
                  </div>
                  <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(percent, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System integrity health */}
        <div className="bg-slate-900/20 border border-slate-850 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AcademicCapIcon className="w-5 h-5 text-purple-400" />
              Integrity Monitor
            </h3>
            <p className="text-slate-400 text-xs mt-1">Operational health of core platform systems.</p>
          </div>

          <div className="space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-xl border border-slate-850">
              <span className="text-slate-450 font-semibold uppercase tracking-wider font-mono">Firestore Database</span>
              <span className="text-green-400 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-xl border border-slate-850">
              <span className="text-slate-450 font-semibold uppercase tracking-wider font-mono">Authentication</span>
              <span className="text-green-400 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Google Auth
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-xl border border-slate-850">
              <span className="text-slate-450 font-semibold uppercase tracking-wider font-mono">Platform Admins</span>
              <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/10 font-mono">
                {activeAdminsCount} Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-xl border border-slate-850">
              <span className="text-slate-450 font-semibold uppercase tracking-wider font-mono">Course Syllabus</span>
              <span className="text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/10 font-mono">
                5 Modules ({totalLessons} Steps)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent doctor signups */}
      <div className="bg-slate-900/20 border border-slate-850 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-amber-400" />
            Recent Roster Enrollees
          </h3>
          <p className="text-slate-400 text-xs mt-1">The 5 most recently registered clinician accounts on the platform.</p>
        </div>

        {recentUsers.length === 0 ? (
          <p className="text-slate-500 text-sm font-medium py-4 text-center">No clinician registrations captured yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-xs font-mono font-bold uppercase">
                  <th className="pb-3 pr-4 font-semibold">Clinician Name</th>
                  <th className="pb-3 px-4 font-semibold">Email</th>
                  <th className="pb-3 px-4 font-semibold">Specialty / Focus</th>
                  <th className="pb-3 px-4 font-semibold">Syllabus completions</th>
                  <th className="pb-3 pl-4 font-semibold text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50 text-xs md:text-sm text-slate-300">
                {recentUsers.map(user => {
                  const completed = Object.keys(user.completedSteps || {}).length;
                  return (
                    <tr key={user.uid} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-3.5 pr-4 font-bold text-white">{user.name || 'Anonymous Doctor'}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{user.email}</td>
                      <td className="py-3.5 px-4">
                        {user.userProfession && (
                          <span className="bg-slate-850 text-slate-300 px-2 py-0.5 rounded border border-slate-800 text-[10px] font-semibold mr-1.5">
                            {user.userProfession}
                          </span>
                        )}
                        {user.userPersona && (
                          <span className="bg-cyan-950/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-900/20 text-[10px] font-semibold">
                            {user.userPersona}
                          </span>
                        )}
                        {!user.userProfession && !user.userPersona && '—'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-cyan-400">
                        {completed} / {totalLessons} ({Math.round((completed / totalLessons) * 100)}%)
                      </td>
                      <td className="py-3.5 pl-4 text-right text-slate-450 font-mono">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
