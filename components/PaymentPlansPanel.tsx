import React, { useState, useEffect } from 'react';
import { PaymentPlan } from '../admin-types';
import { AdminService } from '../services/adminService';
import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  UsersIcon,
  ChartBarIcon,
  CreditCardIcon
} from './Icons';

const PlanCard = ({ plan, onEdit, onToggle }: {
  plan: PaymentPlan;
  onEdit: (plan: PaymentPlan) => void;
  onToggle: (planId: string) => void;
}) => (
  <div className={`bg-slate-800/50 rounded-xl p-6 border ${
    plan.isActive ? 'border-slate-700/50' : 'border-slate-600/30 opacity-60'
  } relative`}>
    {plan.name === 'Pro' && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <StarIcon className="w-3 h-3" />
          Most Popular
        </div>
      </div>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(plan)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onToggle(plan.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            plan.isActive 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-slate-600/20 text-slate-400 border border-slate-600/30'
          }`}
        >
          {plan.isActive ? 'Active' : 'Inactive'}
        </button>
      </div>
    </div>
    
    <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
    
    <div className="mb-6">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-white">
          ${plan.price}
        </span>
        <span className="text-slate-400">/{plan.interval}</span>
      </div>
    </div>
    
    <div className="space-y-3 mb-6">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="text-slate-300 text-sm">{feature}</span>
        </div>
      ))}
    </div>
    
    <div className="border-t border-slate-700 pt-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-slate-400">AI Queries</span>
          <p className="text-white font-medium">
            {plan.limits.aiQueries === -1 ? 'Unlimited' : plan.limits.aiQueries.toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Modules</span>
          <p className="text-white font-medium">
            {plan.limits.modules === -1 ? 'All' : plan.limits.modules}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PaymentPlansPanel: React.FC = () => {
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PaymentPlan | null>(null);

  const adminService = AdminService.getInstance();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const plansData = await adminService.getPaymentPlans();
      setPlans(plansData);
    } catch (error) {
      console.error('Failed to load payment plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlan = (planId: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
    ));
  };

  const handleEditPlan = (plan: PaymentPlan) => {
    setEditingPlan(plan);
    setShowCreateModal(true);
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
          <h2 className="text-2xl font-bold text-white">Payment Plans</h2>
          <p className="text-slate-400">Manage subscription tiers and pricing</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Create Plan
        </button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <CurrencyDollarIcon className="w-6 h-6 text-green-400" />
            <span className="text-slate-400">Monthly Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">$12,345</p>
          <p className="text-green-400 text-sm">+15.7% from last month</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <UsersIcon className="w-6 h-6 text-blue-400" />
            <span className="text-slate-400">Active Subscribers</span>
          </div>
          <p className="text-2xl font-bold text-white">1,234</p>
          <p className="text-blue-400 text-sm">+8.3% from last month</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <ChartBarIcon className="w-6 h-6 text-purple-400" />
            <span className="text-slate-400">Conversion Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">12.8%</p>
          <p className="text-purple-400 text-sm">+2.1% from last month</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <CreditCardIcon className="w-6 h-6 text-yellow-400" />
            <span className="text-slate-400">Churn Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">3.2%</p>
          <p className="text-red-400 text-sm">-0.5% from last month</p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleEditPlan}
            onToggle={handleTogglePlan}
          />
        ))}
      </div>

      {/* Subscription Analytics */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Subscription Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">67%</div>
            <div className="text-slate-400">Free Users</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div className="bg-slate-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">28%</div>
            <div className="text-slate-400">Pro Users</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '28%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5%</div>
            <div className="text-slate-400">Enterprise</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '5%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { user: 'John Doe', plan: 'Pro Monthly', amount: '$19.99', date: '2 hours ago', status: 'completed' },
            { user: 'Jane Smith', plan: 'Enterprise Monthly', amount: '$99.99', date: '5 hours ago', status: 'completed' },
            { user: 'Bob Johnson', plan: 'Pro Monthly', amount: '$19.99', date: '1 day ago', status: 'failed' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">{transaction.user}</p>
                <p className="text-slate-400 text-sm">{transaction.plan}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{transaction.amount}</p>
                <p className="text-slate-400 text-sm">{transaction.date}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                transaction.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {transaction.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlansPanel;
