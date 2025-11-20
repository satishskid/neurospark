import React, { useState, useEffect } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  CalendarIcon
} from './Icons';

interface Issue {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  issueType: 'bug' | 'feature' | 'content' | 'technical' | 'other';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  currentPage?: string;
  browserInfo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
  adminNotes?: string;
}

const SeverityBadge = ({ severity }: { severity: string }) => {
  const config = {
    low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
  };
  const { color, bg, border } = config[severity as keyof typeof config] || config.low;
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} ${bg} ${border} border capitalize`}>
      {severity}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    open: { icon: ExclamationTriangleIcon, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    'in-progress': { icon: ClockIcon, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    resolved: { icon: CheckCircleIcon, color: 'text-green-400', bg: 'bg-green-500/10' },
    closed: { icon: XCircleIcon, color: 'text-slate-400', bg: 'bg-slate-500/10' }
  };
  const { icon: Icon, color, bg } = config[status as keyof typeof config] || config.open;
  
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${bg}`}>
      <Icon className={`w-3 h-3 ${color}`} />
      <span className={`text-xs font-medium ${color} capitalize`}>{status.replace('-', ' ')}</span>
    </div>
  );
};

const IssuesPanel: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    setLoading(true);
    try {
      const { dbService } = await import('../services/dbService');
      const issuesData = await dbService.getAllIssues();
      setIssues(issuesData as Issue[]);
    } catch (error) {
      console.error('Failed to load issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (issueId: string, newStatus: 'open' | 'in-progress' | 'resolved' | 'closed') => {
    try {
      const { dbService } = await import('../services/dbService');
      await dbService.updateIssueStatus(issueId, newStatus);
      await loadIssues();
    } catch (error) {
      console.error('Failed to update issue status:', error);
    }
  };

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === filter);

  const stats = {
    total: issues.length,
    open: issues.filter(i => i.status === 'open').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length
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
      <div>
        <h2 className="text-2xl font-bold text-white">User Issues & Feedback</h2>
        <p className="text-slate-400">Track and resolve user-reported problems</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-slate-400 text-sm">Total Issues</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-400">{stats.open}</div>
          <div className="text-slate-400 text-sm">Open</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
          <div className="text-slate-400 text-sm">In Progress</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
          <div className="text-2xl font-bold text-green-400">{stats.resolved}</div>
          <div className="text-slate-400 text-sm">Resolved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'open', 'in-progress', 'resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              filter === f
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No issues found
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
                    <SeverityBadge severity={issue.severity} />
                    <StatusBadge status={issue.status} />
                  </div>
                  <p className="text-slate-300 mb-3">{issue.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      {issue.userName} ({issue.userEmail})
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                    <div className="px-2 py-1 bg-slate-700/50 rounded text-xs capitalize">
                      {issue.issueType}
                    </div>
                  </div>
                  {issue.currentPage && (
                    <div className="mt-2 text-xs text-slate-500">
                      Page: {issue.currentPage}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {issue.status !== 'resolved' && (
                    <>
                      {issue.status === 'open' && (
                        <button
                          onClick={() => handleStatusChange(issue.id, 'in-progress')}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                        >
                          Start
                        </button>
                      )}
                      {issue.status === 'in-progress' && (
                        <button
                          onClick={() => handleStatusChange(issue.id, 'resolved')}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </>
                  )}
                  {issue.status === 'resolved' && (
                    <button
                      onClick={() => handleStatusChange(issue.id, 'closed')}
                      className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded transition-colors"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssuesPanel;
