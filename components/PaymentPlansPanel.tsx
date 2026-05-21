import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { CURRICULUM } from '../constants';
import { User } from '../types';
import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  StarIcon,
  UsersIcon,
  ChartBarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from './Icons';

interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  isActive: boolean;
}

const PlanCard = ({ plan }: { plan: PaymentPlan }) => (
  <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/20 transition-all duration-300 relative">
    {plan.name === 'Pro' && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
          <StarIcon className="w-3 h-3" />
          Active Roster Tier
        </div>
      </div>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-black text-white">{plan.name}</h3>
      <span className="bg-green-500/10 text-green-400 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border border-green-500/20">
        Complimentary
      </span>
    </div>
    
    <p className="text-slate-400 text-xs mb-4 leading-relaxed">{plan.description}</p>
    
    <div className="mb-4">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">
          $0
        </span>
        <span className="text-slate-500 text-xs">/ {plan.interval} (Sandbox Mode)</span>
      </div>
      <p className="text-[10px] text-slate-500 italic mt-0.5">Commercial value: ${plan.price}/{plan.interval}</p>
    </div>
    
    <div className="space-y-2 border-t border-slate-850 pt-4">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <CheckCircleIcon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="text-slate-300 text-xs font-medium">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const PaymentPlansPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [whitelist, setWhitelist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const totalLessons = CURRICULUM.flatMap(m => m.lessons).length;

  const loadData = async () => {
    setLoading(true);
    try {
      const [allUsers, whitelistData] = await Promise.all([
        dbService.getAllUsersProgress(),
        dbService.getWhitelist()
      ]);
      setUsers(allUsers);
      setWhitelist(whitelistData);
    } catch (e) {
      console.error('Failed to load system licensing details:', e);
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
        <p className="text-slate-400 text-sm font-mono tracking-wider animate-pulse">COMPUTING LICENSING METRICS...</p>
      </div>
    );
  }

  // Calculate real metrics
  const totalWhitelisted = whitelist.length;
  const totalRegistered = users.length;
  
  // Active: completed at least 1 step
  const totalActive = users.filter(u => u.completedSteps && Object.keys(u.completedSteps).length > 0).length;
  
  // Certified course completions
  const totalCertified = users.filter(u => u.completedSteps && Object.keys(u.completedSteps).length >= totalLessons).length;

  // Active Whitelist list
  const whitelistEmails = whitelist.map(w => w.email?.toLowerCase()).filter(Boolean);
  
  // Users registered that are in the whitelist
  const claimedLicenses = users.filter(u => u.email && whitelistEmails.includes(u.email.toLowerCase())).length;

  const referencePlans: PaymentPlan[] = [
    {
      id: 'free',
      name: 'Basic Roster',
      description: 'Standard access for guest clinicians and introductory training.',
      price: 0,
      currency: 'USD',
      interval: 'month',
      features: ['Limited AI queries/day', 'Anatomy of Medical App Module', 'Standard certificate'],
      isActive: true
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Full advanced access unlocked for all whitelisted clinicians.',
      price: 19.99,
      currency: 'USD',
      interval: 'month',
      features: ['Unlimited AI analogy engines', 'All 5 modules & quizzes', 'Downloadable clinical certificate', 'Priority supervisor assistance'],
      isActive: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise / Hospital',
      description: 'Dedicated institutional deployment for health systems and residency centers.',
      price: 99.99,
      currency: 'USD',
      interval: 'month',
      features: ['Dedicated hospital workspaces', 'Syllabus customizations', 'Comprehensive learning dashboards', 'Multi-clinician roster reporting'],
      isActive: true
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-850 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Billing & Roster Licenses
            <span className="text-xs bg-slate-800 text-slate-400 font-mono px-2.5 py-0.5 rounded-full border border-slate-700">Sandbox Mode</span>
          </h2>
          <p className="text-slate-400 text-sm">Overview of platform license allocations, active enrollments, and tier configurations.</p>
        </div>
        <button
          onClick={loadData}
          className="p-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-450 hover:text-white rounded-xl transition-all flex items-center gap-2 text-sm font-semibold shrink-0"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Sync billing status
        </button>
      </div>

      {/* Dynamic Licensing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">Whitelisted Slots</p>
            <h3 className="text-2xl font-black text-white">{totalWhitelisted}</h3>
            <p className="text-[10px] text-slate-500 font-semibold">Total clearing entries in grid</p>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400">
            <ShieldCheckIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">Claimed Licenses</p>
            <h3 className="text-2xl font-black text-white">{claimedLicenses}</h3>
            <p className="text-[10px] text-slate-500 font-semibold">Whitelisted accounts registered</p>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <UsersIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">Course completions</p>
            <h3 className="text-2xl font-black text-white">{totalCertified}</h3>
            <p className="text-[10px] text-slate-500 font-semibold">Clinicians certified so far</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400">
            <CheckCircleIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">Revenue Allocation</p>
            <h3 className="text-2xl font-black text-white">$0.00</h3>
            <p className="text-[10px] text-green-400 font-semibold">100% Free Sandbox Mode</p>
          </div>
          <div className="p-3.5 rounded-xl bg-green-500/10 text-green-400">
            <CurrencyDollarIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sandbox Notice Banner */}
      <div className="p-6 bg-slate-900/20 border border-slate-850 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <CreditCardIcon className="w-4 h-4 text-cyan-400" />
            Active Platform License: Complete Roster Sandbox (Whitelisted Access Only)
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            GreyWaken's commercial pricing plans are simulated at this stage. All clinicians successfully whitelisted through the platform admin roster are instantly granted complimentary full **Pro Tier** licenses, with complete access to advanced biological LLM analogies, interactive medical coding exercises, and print-to-PDF course certificates.
          </p>
        </div>
        <div className="shrink-0 flex items-center">
          <span className="text-xs bg-cyan-500/10 text-cyan-400 font-bold px-3 py-1.5 rounded-xl border border-cyan-500/20">
            Commercial Gateway Offline
          </span>
        </div>
      </div>

      {/* Pricing Tiers Reference Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">Reference Pricing Tiers</h3>
          <p className="text-slate-500 text-xs mt-0.5">Commercial list prices if platform deployment moves to public monetization.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {referencePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Authorized Roster Log */}
      <div className="bg-slate-900/20 border border-slate-850 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-purple-400" />
            Authorized Roster Audit Log
          </h3>
          <p className="text-slate-400 text-xs mt-1">Real-time whitelist database tracking clinicians cleared for platform enrollment.</p>
        </div>

        {whitelist.length === 0 ? (
          <p className="text-slate-500 text-sm font-medium py-4 text-center">No authorized clinicians have been whitelisted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-xs font-mono font-bold uppercase">
                  <th className="pb-3 pr-4 font-semibold">Whitelisted Email Address</th>
                  <th className="pb-3 px-4 font-semibold">Authorized By</th>
                  <th className="pb-3 px-4 font-semibold">Registry Status</th>
                  <th className="pb-3 pl-4 font-semibold text-right">Cleared Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50 text-xs md:text-sm text-slate-300">
                {[...whitelist]
                  .sort((a, b) => new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime())
                  .map((entry) => {
                    const profile = users.find(u => u.email?.toLowerCase() === entry.email?.toLowerCase());
                    const isRegistered = !!profile;
                    const completed = profile && profile.completedSteps ? Object.keys(profile.completedSteps).length : 0;
                    
                    return (
                      <tr key={entry.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-3.5 pr-4 font-mono font-bold text-white truncate max-w-[240px]" title={entry.email}>
                          {entry.email}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                          {entry.addedBy || 'System Bootstrap'}
                        </td>
                        <td className="py-3.5 px-4">
                          {isRegistered ? (
                            <span className="inline-flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/20">
                              Registered ({completed}/{totalLessons} lessons)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-700">
                              Pending Registration
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pl-4 text-right text-slate-450 font-mono text-xs">
                          {entry.addedAt ? new Date(entry.addedAt).toLocaleDateString() : 'N/A'}
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

export default PaymentPlansPanel;
