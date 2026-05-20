import React, { useState, useEffect } from 'react';
import { dbService, SUPER_ADMINS } from '../services/dbService';
import { auth } from '../firebaseConfig';

interface AdminEntry {
  email: string;
  addedBy?: string;
  addedAt?: string;
  isSuper?: boolean;
}

const AdminManagementPanel: React.FC = () => {
  const [admins, setAdmins] = useState<AdminEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const data = await dbService.getAdmins();
      // Combine Firestore admins with hardcoded super admins for a unified list
      const dbAdmins = data.map(item => ({
        email: item.email,
        addedBy: item.addedBy || 'System',
        addedAt: item.addedAt || new Date().toISOString(),
        isSuper: SUPER_ADMINS.includes(item.email.toLowerCase())
      }));

      // Find any super admins that are not in the Firestore list yet and add them as visual items
      const combinedList = [...dbAdmins];
      SUPER_ADMINS.forEach(superEmail => {
        if (!combinedList.some(item => item.email.toLowerCase() === superEmail.toLowerCase())) {
          combinedList.push({
            email: superEmail,
            addedBy: 'Bootstrap Config',
            addedAt: new Date(2026, 4, 1).toISOString(), // Pre-set system bootstrap date
            isSuper: true
          });
        }
      });

      setAdmins(combinedList);
    } catch (e) {
      console.error(e);
      showStatus("Failed to load administrators from database.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (text: string, type: 'success' | 'error') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const emailToAdd = newEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToAdd)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    if (admins.some(a => a.email.toLowerCase() === emailToAdd)) {
      showStatus("This email is already an administrator.", "error");
      return;
    }

    try {
      const currentUserEmail = auth.currentUser?.email || 'superadmin@greybrain.ai';
      await dbService.addAdmin(emailToAdd, currentUserEmail);
      showStatus(`Successfully promoted ${emailToAdd} to Administrator`, "success");
      setNewEmail('');
      loadAdmins();
    } catch (e) {
      console.error(e);
      showStatus("Failed to promote user to Administrator.", "error");
    }
  };

  const handleDeleteAdmin = async (email: string) => {
    const normalized = email.toLowerCase();
    if (SUPER_ADMINS.includes(normalized)) {
      showStatus("Cannot revoke Super Administrator credentials.", "error");
      return;
    }

    if (!confirm(`Are you sure you want to revoke administrator access for ${email}?`)) {
      return;
    }

    try {
      await dbService.removeAdmin(normalized);
      showStatus(`Successfully revoked administrator access for ${email}`, "success");
      loadAdmins();
    } catch (e) {
      console.error(e);
      showStatus("Failed to revoke administrator access.", "error");
    }
  };

  // Filter based on search
  const filteredAdmins = admins.filter(item => 
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.addedBy && item.addedBy.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Administrator Directory
            <span className="text-xs bg-purple-500/20 text-purple-400 font-mono px-2 py-0.5 rounded">Super-Admin View</span>
          </h2>
          <p className="text-slate-400">Promote other team members to administrators, enabling them to whitelist medical students.</p>
        </div>
      </div>

      {/* Status Alerts */}
      {statusMessage && (
        <div className={`p-4 rounded-lg border backdrop-blur-sm ${
          statusMessage.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {statusMessage.text}
        </div>
      )}

      {/* Inline Adding & Searching */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search administrators by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Inline Add Admin */}
        <form onSubmit={handleAddAdmin} className="flex gap-2">
          <input
            type="email"
            placeholder="Admin email..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-all flex-shrink-0"
          >
            + Add Admin
          </button>
        </form>
      </div>

      {/* Excel Sheet Table Grid */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-700 text-slate-300 font-mono text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Administrator Email</th>
                <th className="py-4 px-6 font-semibold">Role</th>
                <th className="py-4 px-6 font-semibold">Authorized By</th>
                <th className="py-4 px-6 font-semibold">Date Authorized</th>
                <th className="py-4 px-6 font-semibold text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40 text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                    <p className="text-slate-400 mt-2 text-sm font-mono">Synchronizing administrators list with Firestore...</p>
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <p className="font-semibold text-white">No administrators found.</p>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((item) => (
                  <tr key={item.email} className="hover:bg-slate-750/30 transition-colors group">
                    <td className="py-4 px-6 font-medium text-white select-all">
                      {item.email}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      {item.isSuper ? (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-400 border border-pink-500/20 rounded text-xs font-semibold">
                          Super Administrator
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/10 rounded text-xs">
                          Administrator
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-300 font-mono">
                      {item.addedBy}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400">
                      {new Date(item.addedAt || '').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {!item.isSuper ? (
                        <button
                          onClick={() => handleDeleteAdmin(item.email)}
                          title="Revoke Admin Access"
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-600 italic font-mono select-none">System Protected</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-800/40 p-4 border-t border-slate-700/40 text-xs text-slate-500 flex justify-between items-center font-mono">
          <span>Administrators: {filteredAdmins.length}</span>
          <span>Last synced: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminManagementPanel;
