import React, { useState, useEffect } from 'react';
import { DetailedUser } from '../admin-types';
import { AdminService } from '../services/adminService';
import { 
  MagnifyingGlassIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  EnvelopeIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from './Icons';

const UserCard = ({ user, onView }: { user: DetailedUser; onView: (user: DetailedUser) => void }) => (
  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{user.name}</h3>
          <p className="text-slate-400 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(user)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <EyeIcon className="w-4 h-4" />
        </button>
        <div className={`px-2 py-1 rounded-full text-xs ${
          user.subscription?.status === 'active' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-slate-500/20 text-slate-400'
        }`}>
          {user.subscription?.status || 'Free'}
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-slate-400">Progress</span>
        <p className="text-white font-medium">{user.progress.completedLessons.length} lessons</p>
      </div>
      <div>
        <span className="text-slate-400">Time Spent</span>
        <p className="text-white font-medium">{Math.floor(user.progress.totalTimeSpent / 60)}h</p>
      </div>
      <div>
        <span className="text-slate-400">Last Active</span>
        <p className="text-white font-medium">{new Date(user.lastActive).toLocaleDateString()}</p>
      </div>
      <div>
        <span className="text-slate-400">Streak</span>
        <p className="text-white font-medium">{user.progress.streakDays} days</p>
      </div>
    </div>
  </div>
);

const UserDetailModal = ({ user, onClose }: { user: DetailedUser; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
    <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-slate-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrophyIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400">Completed</span>
            </div>
            <p className="text-2xl font-bold text-white">{user.progress.completedLessons.length}</p>
            <p className="text-slate-400 text-sm">Lessons</p>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="w-5 h-5 text-blue-400" />
              <span className="text-slate-400">Time Spent</span>
            </div>
            <p className="text-2xl font-bold text-white">{Math.floor(user.progress.totalTimeSpent / 60)}</p>
            <p className="text-slate-400 text-sm">Hours</p>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ChartBarIcon className="w-5 h-5 text-green-400" />
              <span className="text-slate-400">Sessions</span>
            </div>
            <p className="text-2xl font-bold text-white">{user.analytics.sessionsCount}</p>
            <p className="text-slate-400 text-sm">Total</p>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400">Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{user.progress.streakDays}</p>
            <p className="text-slate-400 text-sm">Days</p>
          </div>
        </div>
        
        {/* Subscription Info */}
        {user.subscription && (
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Subscription</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-slate-400">Plan</span>
                <p className="text-white font-medium capitalize">{user.subscription.planId}</p>
              </div>
              <div>
                <span className="text-slate-400">Status</span>
                <p className="text-white font-medium capitalize">{user.subscription.status}</p>
              </div>
              <div>
                <span className="text-slate-400">End Date</span>
                <p className="text-white font-medium">{new Date(user.subscription.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Learning Progress */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Learning Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Current Module</span>
                <span className="text-white">{user.progress.currentModule}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Quizzes Completed</span>
                <span className="text-white">{user.analytics.quizzesCompleted}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Exercises Completed</span>
                <span className="text-white">{user.analytics.exercisesCompleted}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">AI Queries Used</span>
                <span className="text-white">{user.analytics.aiQueriesUsed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserManagementPanel: React.FC = () => {
  const [users, setUsers] = useState<DetailedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<DetailedUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const adminService = AdminService.getInstance();
  const usersPerPage = 12;

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { users: userData, total } = await adminService.getUsers(currentPage, usersPerPage);
      setUsers(userData);
      setTotalUsers(total);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadUsers();
      return;
    }
    
    setLoading(true);
    try {
      const searchResults = await adminService.searchUsers(searchQuery);
      setUsers(searchResults);
    } catch (error) {
      console.error('Failed to search users:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-slate-400">View and manage user accounts</p>
        </div>
        <div className="text-slate-400">
          Total Users: {totalUsers.toLocaleString()}
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
        >
          Search
        </button>
      </div>

      {/* Users Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={setSelectedUser}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* User Detail Modal */}
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
