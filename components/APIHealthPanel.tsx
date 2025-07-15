import React, { useState, useEffect } from 'react';
import { APIHealthStatus } from '../admin-types';
import { AdminService } from '../services/adminService';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  ClockIcon,
  ChartBarIcon
} from './Icons';

const StatusBadge = ({ status }: { status: 'healthy' | 'degraded' | 'down' }) => {
  const config = {
    healthy: { icon: CheckCircleIcon, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    degraded: { icon: ExclamationTriangleIcon, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    down: { icon: XCircleIcon, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
  };

  const { icon: Icon, color, bg, border } = config[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bg} ${border} border`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className={`text-sm font-medium ${color} capitalize`}>{status}</span>
    </div>
  );
};

const APIHealthPanel: React.FC = () => {
  const [healthData, setHealthData] = useState<APIHealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState<{ [key: string]: boolean }>({});
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const adminService = AdminService.getInstance();

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAPIHealth();
      setHealthData(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to fetch API health:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const testEndpoint = async (endpoint: 'gemini' | 'fallback') => {
    setTesting(prev => ({ ...prev, [endpoint]: true }));
    try {
      const result = await adminService.testAPIEndpoint(endpoint);
      console.log(`${endpoint} test result:`, result);
      // Refresh health data after test
      await fetchHealthData();
    } catch (error) {
      console.error(`Failed to test ${endpoint}:`, error);
    } finally {
      setTesting(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  if (loading && !healthData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!healthData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">API Health Monitor</h2>
          <p className="text-slate-400">Real-time status of all API endpoints</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-400">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
          <button
            onClick={fetchHealthData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* API Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gemini API */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Gemini API</h3>
            <StatusBadge status={healthData.geminiAPI.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Response Time</span>
              <span className="text-white">{healthData.geminiAPI.responseTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Error Rate</span>
              <span className="text-white">{healthData.geminiAPI.errorRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Quota Usage</span>
              <span className="text-white">
                {healthData.geminiAPI.quotaUsed.toLocaleString()} / {healthData.geminiAPI.quotaLimit.toLocaleString()}
              </span>
            </div>
            
            {/* Quota Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(healthData.geminiAPI.quotaUsed / healthData.geminiAPI.quotaLimit) * 100}%` }}
              />
            </div>
            
            <button
              onClick={() => testEndpoint('gemini')}
              disabled={testing.gemini}
              className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {testing.gemini ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Endpoint'
              )}
            </button>
          </div>
        </div>

        {/* Fallback API */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Fallback API</h3>
            <StatusBadge status={healthData.fallbackAPI.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Response Time</span>
              <span className="text-white">{healthData.fallbackAPI.responseTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Error Rate</span>
              <span className="text-white">{healthData.fallbackAPI.errorRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Check</span>
              <span className="text-white">{healthData.fallbackAPI.lastCheck.toLocaleTimeString()}</span>
            </div>
            
            <button
              onClick={() => testEndpoint('fallback')}
              disabled={testing.fallback}
              className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {testing.fallback ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Endpoint'
              )}
            </button>
          </div>
        </div>

        {/* Database */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Database</h3>
            <StatusBadge status={healthData.database.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Response Time</span>
              <span className="text-white">{healthData.database.responseTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Connections</span>
              <span className="text-white">{healthData.database.connections}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Check</span>
              <span className="text-white">{healthData.database.lastCheck.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-4">
          <Cog6ToothIcon className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">API Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Primary API Endpoint
            </label>
            <input
              type="text"
              defaultValue="https://generativelanguage.googleapis.com"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Fallback API Endpoint
            </label>
            <input
              type="text"
              defaultValue="https://api.openai.com"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Daily Quota Limit
            </label>
            <input
              type="number"
              defaultValue="100000"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Timeout (seconds)
            </label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIHealthPanel;
