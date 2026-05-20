import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { CURRICULUM } from '../constants';
import { User } from '../types';
import { 
  MagnifyingGlassIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  EyeIcon,
  ArrowPathIcon
} from './Icons';

// Calculate total lessons dynamically
const totalLessons = CURRICULUM.flatMap(m => m.lessons).length;

const UserCard = ({ user, onView }: { user: User; onView: (user: User) => void }) => {
  const completedCount = Object.keys(user.completedSteps || {}).length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const isCertified = completedCount >= totalLessons && totalLessons > 0;

  return (
    <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-bold truncate text-sm md:text-base" title={user.name || 'Anonymous User'}>
                {user.name || 'Anonymous User'}
              </h3>
              <p className="text-slate-500 text-xs truncate" title={user.email}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onView(user)}
              className="p-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
              title="View clinical progress report"
            >
              <EyeIcon className="w-4 h-4" />
            </button>
            <div className={`w-2.5 h-2.5 rounded-full ${user.isLoggedIn ? 'bg-green-500 animate-pulse' : 'bg-slate-700'}`} title={user.isLoggedIn ? 'Online' : 'Offline'} />
          </div>
        </div>
        
        {/* Wording about who they are */}
        {(user.userProfession || user.userPersona) && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {user.userProfession && (
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-700/50">
                {user.userProfession}
              </span>
            )}
            {user.userPersona && (
              <span className="text-[10px] bg-cyan-950/20 text-cyan-400 px-2 py-0.5 rounded font-medium border border-cyan-900/30">
                {user.userPersona}
              </span>
            )}
          </div>
        )}

        {/* Progress bar */}
        <div className="space-y-1.5 my-4">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400 font-mono">Curriculum Complete</span>
            <span className="text-cyan-400 font-mono">{completedCount} / {totalLessons} Steps</span>
          </div>
          <div className="w-full bg-slate-850 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-850 grid grid-cols-2 gap-4 text-xs font-mono text-slate-500">
        <div>
          <span>Last Active</span>
          <p className="text-slate-300 font-medium font-sans mt-0.5">
            {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        <div>
          <span>Certificate</span>
          <p className={`font-medium font-sans mt-0.5 ${isCertified ? 'text-green-400 font-semibold' : 'text-slate-500'}`}>
            {isCertified ? 'Claimed ✓' : 'In Progress'}
          </p>
        </div>
      </div>
    </div>
  );
};

const UserDetailModal = ({ user, onClose }: { user: User; onClose: () => void }) => {
  const completedSteps = user.completedSteps || {};
  const completedCount = Object.keys(completedSteps).length;
  
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-850 flex items-start justify-between gap-4 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/10">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                {user.name || 'Anonymous User'}
              </h2>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
          >
            ✕ Close
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <TrophyIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Completed</span>
              </div>
              <p className="text-2xl font-black text-white font-mono">{completedCount} / {totalLessons}</p>
              <p className="text-slate-400 text-xs mt-0.5">Syllabus Lessons</p>
            </div>
            
            <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <ClockIcon className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Last Sync</span>
              </div>
              <p className="text-base font-bold text-white truncate">
                {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-slate-450 text-xs mt-1.5 font-mono">
                {user.updatedAt ? new Date(user.updatedAt).toLocaleTimeString() : ''}
              </p>
            </div>

            <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <ChartBarIcon className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Profession</span>
              </div>
              <p className="text-base font-bold text-white truncate">
                {user.userProfession || 'Unspecified'}
              </p>
              <p className="text-slate-400 text-xs mt-1.5 font-mono">Clinical Practice</p>
            </div>

            <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11v-1.5M12 11c1.744 2.772 2.753 6.054 2.753 9.571m3.44-2.04l-.054-.09A13.916 13.916 0 0015 11v-1.5M9 4h6m-6 0a3 3 0 00-3 3v1.5m6-4.5a3 3 0 013 3V11m-6-7a3 3 0 013-3V1" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Focus Area</span>
              </div>
              <p className="text-base font-bold text-white truncate">
                {user.userPersona || 'Unspecified'}
              </p>
              <p className="text-slate-400 text-xs mt-1.5 font-mono">Interests Theme</p>
            </div>
          </div>

          {/* Module-by-Module Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-850 pb-2">Clinical Course Roadmap</h3>
            
            <div className="space-y-4">
              {CURRICULUM.map((module) => {
                const moduleLessons = module.lessons || [];
                const completedInModule = moduleLessons.filter(l => completedSteps[l.id]).length;
                const percent = moduleLessons.length > 0 ? (completedInModule / moduleLessons.length) * 100 : 0;
                
                return (
                  <div key={module.id} className="bg-slate-950/20 border border-slate-850 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="text-white font-extrabold text-sm md:text-base">{module.title}</h4>
                        <p className="text-slate-500 text-xs mt-0.5">{module.description}</p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-slate-850 text-cyan-400 px-3 py-1 rounded-full shrink-0">
                        {completedInModule} / {moduleLessons.length} Done ({Math.round(percent)}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                    </div>

                    {/* Lesson checklist */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {moduleLessons.map(lesson => {
                        const isDone = completedSteps[lesson.id];
                        return (
                          <div 
                            key={lesson.id} 
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                              isDone 
                                ? 'bg-green-500/5 border-green-500/20 text-green-400' 
                                : 'bg-slate-900/30 border-slate-850 text-slate-500'
                            }`}
                          >
                            <span className={`shrink-0 flex items-center justify-center w-4 h-4 rounded-full ${
                              isDone ? 'bg-green-500 text-slate-950' : 'bg-slate-800 text-slate-650'
                            }`}>
                              {isDone ? '✓' : '•'}
                            </span>
                            <span className="truncate" title={lesson.title}>{lesson.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagementPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await dbService.getAllUsersProgress();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const nameStr = (user.name || '').toLowerCase();
    const emailStr = (user.email || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return nameStr.includes(query) || emailStr.includes(query);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Student Course Roster
            <span className="text-xs bg-cyan-500/20 text-cyan-400 font-mono px-2 py-0.5 rounded">Roster Panel</span>
          </h2>
          <p className="text-slate-400">Monitor real clinical users, their module completions, active statuses, and certificate eligibilities.</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={loadUsers}
            className="p-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all flex items-center gap-2 text-sm font-semibold shrink-0"
            title="Refresh database records"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Reload
          </button>
          
          <div className="bg-slate-900 border border-slate-800 text-slate-400 px-4 py-3 rounded-xl text-sm font-mono shrink-0 flex items-center">
            Roster: {filteredUsers.length} Enrolled
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by student name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-slate-800/40 border border-slate-700/60 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-inner"
        />
      </div>

      {/* Users Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400 mb-3"></div>
          <p className="text-slate-400 text-sm font-mono tracking-wider animate-pulse">SYNCHRONIZING SECURE SHELL RECORDS...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl max-w-xl mx-auto mt-6">
          <svg className="w-16 h-16 text-slate-800 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="text-xl font-bold text-white mb-2">No Clinicians Found</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            There are no enrolled user records matching your current filter. Please try a different search or enroll them via the whitelist sheet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.uid}
              user={user}
              onView={setSelectedUser}
            />
          ))}
        </div>
      )}

      {/* Detailed Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagementPanel;
