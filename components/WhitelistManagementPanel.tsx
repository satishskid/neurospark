import React, { useState, useEffect } from 'react';
import {
  UserPlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon
} from './Icons';

interface WhitelistEntry {
  id: string;
  email: string;
  name?: string;
  role?: string;
  institution?: string;
  addedDate: string;
  addedBy: string;
  status: 'active' | 'inactive';
}

const WhitelistManagementPanel: React.FC = () => {
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  useEffect(() => {
    loadWhitelist();
  }, []);

  const loadWhitelist = async () => {
    setLoading(true);
    try {
      const { dbService } = await import('../services/dbService');
      const data = await dbService.getWhitelistedUsers();
      setEntries(data as WhitelistEntry[]);
    } catch (error) {
      console.error('Failed to load whitelist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from whitelist?`)) return;
    
    try {
      const { dbService } = await import('../services/dbService');
      await dbService.removeFromWhitelist(id);
      await loadWhitelist();
    } catch (error) {
      console.error('Failed to remove from whitelist:', error);
      alert('Failed to remove user. Please try again.');
    }
  };

  const filteredEntries = entries.filter(entry =>
    entry.status === 'active' && (
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.name && entry.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.institution && entry.institution.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const stats = {
    total: entries.filter(e => e.status === 'active').length,
    inactive: entries.filter(e => e.status === 'inactive').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Whitelist Management</h2>
          <p className="text-slate-400">Manage user access to the platform</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <UserPlusIcon className="w-5 h-5" />
            Bulk Add
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            <UserPlusIcon className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-slate-400 text-sm">Active Users</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <XCircleIcon className="w-8 h-8 text-slate-400" />
            <div>
              <div className="text-2xl font-bold text-white">{stats.inactive}</div>
              <div className="text-slate-400 text-sm">Removed Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by email, name, or institution..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Whitelist Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Added Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Added By
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No whitelisted users found
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {entry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {entry.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {entry.institution || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {new Date(entry.addedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {entry.addedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleRemove(entry.id, entry.email)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Remove from whitelist"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            loadWhitelist();
          }}
        />
      )}

      {/* Bulk Add Modal */}
      {showBulkModal && (
        <BulkAddModal
          onClose={() => setShowBulkModal(false)}
          onSuccess={() => {
            setShowBulkModal(false);
            loadWhitelist();
          }}
        />
      )}
    </div>
  );
};

// Add User Modal Component
const AddUserModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [institution, setInstitution] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { dbService } = await import('../services/dbService');
      const { authService } = await import('../services/firebaseService');
      
      // Get current admin email
      const adminEmail = 'admin@greywaken.ai'; // TODO: Get from auth context
      
      await dbService.addToWhitelist({
        email,
        name,
        role,
        institution,
        addedBy: adminEmail
      });
      
      onSuccess();
    } catch (error) {
      console.error('Failed to add to whitelist:', error);
      alert('Failed to add user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Add User to Whitelist</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Physician, Engineer, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Institution
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Hospital, Company, etc."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Bulk Add Modal Component
const BulkAddModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [emails, setEmails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { dbService } = await import('../services/dbService');
      
      // Parse emails (one per line or comma-separated)
      const emailList = emails
        .split(/[\n,]/)
        .map(e => e.trim())
        .filter(e => e && e.includes('@'));
      
      if (emailList.length === 0) {
        alert('No valid emails found');
        setSubmitting(false);
        return;
      }

      const adminEmail = 'admin@greywaken.ai'; // TODO: Get from auth context
      await dbService.bulkAddToWhitelist(emailList, adminEmail);
      
      alert(`Successfully added ${emailList.length} users to whitelist`);
      onSuccess();
    } catch (error) {
      console.error('Failed to bulk add:', error);
      alert('Failed to add users. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Bulk Add Users</h3>
          <p className="text-slate-400 text-sm mt-1">Add multiple users at once (one email per line or comma-separated)</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Addresses
            </label>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 font-mono text-sm resize-none"
              placeholder="user1@example.com&#10;user2@example.com&#10;user3@example.com"
            />
            <p className="text-xs text-slate-500 mt-2">
              Tip: Paste from Excel/CSV or enter one email per line
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add All Users'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhitelistManagementPanel;
