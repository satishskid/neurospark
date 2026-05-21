import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { auth } from '../firebaseConfig';

interface WhitelistEntry {
  email: string;
  addedBy: string;
  addedAt: string;
}

const formatDate = (dateVal: any) => {
  if (!dateVal) return 'N/A';
  const parsed = new Date(dateVal);
  if (isNaN(parsed.getTime())) return 'N/A';
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const WhitelistPanel: React.FC = () => {
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadWhitelist();
  }, []);

  const loadWhitelist = async () => {
    setLoading(true);
    try {
      const data = await dbService.getWhitelist();
      setWhitelist(data as WhitelistEntry[]);
    } catch (e) {
      console.error(e);
      showStatus("Failed to load whitelist from database.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (text: string, type: 'success' | 'error') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const emailToAdd = newEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToAdd)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    try {
      const currentUserEmail = auth.currentUser?.email || 'admin@greybrain.ai';
      await dbService.addToWhitelist(emailToAdd, currentUserEmail);
      showStatus(`Successfully whitelisted ${emailToAdd}`, "success");
      setNewEmail('');
      loadWhitelist();
    } catch (e) {
      console.error(e);
      showStatus("Failed to add email to whitelist.", "error");
    }
  };

  const handleAddBulk = async () => {
    if (!bulkEmails.trim()) return;

    // Split by commas, semicolons, spaces, or newlines
    const rawEmails = bulkEmails.split(/[\s,;\n]+/);
    const validEmails: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    rawEmails.forEach(raw => {
      const cleaned = raw.trim().toLowerCase();
      if (cleaned && emailRegex.test(cleaned)) {
        validEmails.push(cleaned);
      }
    });

    if (validEmails.length === 0) {
      showStatus("No valid email addresses found in input.", "error");
      return;
    }

    try {
      const currentUserEmail = auth.currentUser?.email || 'admin@greybrain.ai';
      setLoading(true);
      
      // Perform batch adding
      for (const email of validEmails) {
        await dbService.addToWhitelist(email, currentUserEmail);
      }

      showStatus(`Successfully batch whitelisted ${validEmails.length} emails!`, "success");
      setBulkEmails('');
      setShowBulkInput(false);
      loadWhitelist();
    } catch (e) {
      console.error(e);
      showStatus("An error occurred during batch whitelisting.", "error");
      loadWhitelist();
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm(`Are you sure you want to revoke access for ${email}?`)) {
      return;
    }

    try {
      await dbService.removeFromWhitelist(email);
      showStatus(`Successfully revoked access for ${email}`, "success");
      loadWhitelist();
    } catch (e) {
      console.error(e);
      showStatus("Failed to remove email from whitelist.", "error");
    }
  };

  const handleExportCSV = () => {
    if (whitelist.length === 0) {
      showStatus("No data to export.", "error");
      return;
    }

    const headers = ['Email', 'Whitelisted By', 'Whitelisted Date'];
    const csvRows = [headers.join(',')];

    whitelist.forEach(item => {
      const dateStr = formatDate(item.addedAt);
      csvRows.push(`"${item.email}","${item.addedBy}","${dateStr}"`);
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `greywaken_whitelist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter whitelist based on search
  const filteredWhitelist = whitelist.filter(item => {
    const emailStr = item.email || '';
    const addedByStr = item.addedBy || '';
    const query = searchQuery.toLowerCase();
    return emailStr.toLowerCase().includes(query) || addedByStr.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Whitelist Grid
            <span className="text-xs bg-cyan-500/20 text-cyan-400 font-mono px-2 py-0.5 rounded">Excel View</span>
          </h2>
          <p className="text-slate-400">Add, edit, bulk-import, and instantly revoke clinician access.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkInput(!showBulkInput)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-sm transition-all"
          >
            {showBulkInput ? "Cancel Bulk" : "Bulk CSV Import"}
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg text-sm transition-all shadow-lg shadow-cyan-500/10 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export Sheet (.csv)
          </button>
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

      {/* Bulk CSV Paste Area */}
      {showBulkInput && (
        <div className="p-6 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-4">
          <h3 className="text-lg font-bold text-white">Bulk Add Clinicians</h3>
          <p className="text-slate-400 text-sm">
            Paste a list of email addresses below. You can separate them by commas, semicolons, spaces, or newlines.
          </p>
          <textarea
            value={bulkEmails}
            onChange={(e) => setBulkEmails(e.target.value)}
            rows={5}
            placeholder="doctor1@clinic.com, doctor2@hospital.org&#10;doctor3@medschool.edu"
            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowBulkInput(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBulk}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-sm shadow-md transition-all"
            >
              Parse & Import
            </button>
          </div>
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
            placeholder="Search whitelist sheet by email or admin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Inline Add Single */}
        <form onSubmit={handleAddSingle} className="flex gap-2">
          <input
            type="email"
            placeholder="Add doctor's email..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-sm transition-all flex-shrink-0"
          >
            + Add Row
          </button>
        </form>
      </div>

      {/* Excel Sheet Table Grid */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-700 text-slate-300 font-mono text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Clinician Email</th>
                <th className="py-4 px-6 font-semibold">Whitelisted By</th>
                <th className="py-4 px-6 font-semibold">Date Added</th>
                <th className="py-4 px-6 font-semibold text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40 text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                    <p className="text-slate-400 mt-2 text-sm font-mono">Synchronizing spreadsheet with Firestore...</p>
                  </td>
                </tr>
              ) : filteredWhitelist.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p className="font-semibold text-white">No whitelisted clinician records found.</p>
                    <p className="text-xs text-slate-400 mt-1">Use "+ Add Row" or bulk import above to enroll doctors.</p>
                  </td>
                </tr>
              ) : (
                filteredWhitelist.map((item) => (
                  <tr key={item.email} className="hover:bg-slate-750/30 transition-colors group">
                    <td className="py-4 px-6 font-medium text-white select-all">
                      {item.email}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-300">
                      {item.addedBy}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400">
                      {formatDate(item.addedAt)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDelete(item.email)}
                        title="Revoke access"
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-800/40 p-4 border-t border-slate-700/40 text-xs text-slate-500 flex justify-between items-center font-mono">
          <span>Row count: {filteredWhitelist.length} clinicians</span>
          <span>Last synced: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WhitelistPanel;
