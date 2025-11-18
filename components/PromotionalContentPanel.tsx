import React, { useState, useEffect } from 'react';
import { db } from '../services/firebaseService';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface PromotionalContent {
  message: string;
  type: 'info' | 'success' | 'warning';
  visible: boolean;
  lastUpdated: string;
}

const PromotionalContentPanel: React.FC = () => {
  const [content, setContent] = useState<PromotionalContent>({
    message: '',
    type: 'info',
    visible: false,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'promotional');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setContent(docSnap.data() as PromotionalContent);
      }
    } catch (error) {
      console.error('Error loading promotional content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const docRef = doc(db, 'settings', 'promotional');
      const updatedContent = {
        ...content,
        lastUpdated: new Date().toISOString()
      };
      
      await setDoc(docRef, updatedContent);
      setContent(updatedContent);
      setMessage('Promotional content saved successfully!');
    } catch (error) {
      console.error('Error saving promotional content:', error);
      setMessage('Error saving content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Promotional Banner Management</h2>
      
      <div className="space-y-6">
        {/* Message Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Banner Message
          </label>
          <textarea
            value={content.message}
            onChange={(e) => setContent({ ...content, message: e.target.value })}
            placeholder="e.g., 🎉 Next batch starts January 15, 2025! Limited seats available."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            rows={3}
          />
          <p className="text-xs text-slate-500 mt-1">
            Use emojis and clear calls-to-action for better engagement
          </p>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Banner Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="info"
                checked={content.type === 'info'}
                onChange={(e) => setContent({ ...content, type: e.target.value as any })}
                className="text-cyan-500"
              />
              <span className="text-slate-300">Info (Cyan)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="success"
                checked={content.type === 'success'}
                onChange={(e) => setContent({ ...content, type: e.target.value as any })}
                className="text-green-500"
              />
              <span className="text-slate-300">Success (Green)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="warning"
                checked={content.type === 'warning'}
                onChange={(e) => setContent({ ...content, type: e.target.value as any })}
                className="text-yellow-500"
              />
              <span className="text-slate-300">Warning (Yellow)</span>
            </label>
          </div>
        </div>

        {/* Visibility Toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={content.visible}
              onChange={(e) => setContent({ ...content, visible: e.target.checked })}
              className="w-5 h-5 text-cyan-500"
            />
            <span className="text-slate-300 font-medium">
              Show banner on landing page
            </span>
          </label>
        </div>

        {/* Preview */}
        {content.message && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Preview
            </label>
            <div className={`
              ${content.type === 'info' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : ''}
              ${content.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''}
              ${content.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' : ''}
              border-2 rounded-lg p-4 text-center
            `}>
              <p className="font-semibold">{content.message}</p>
            </div>
          </div>
        )}

        {/* Quick Templates */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Quick Templates
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button
              onClick={() => setContent({ ...content, message: '🎉 Next batch starts January 15, 2025! Limited seats available.' })}
              className="text-left px-3 py-2 bg-slate-900 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700"
            >
              Next Batch Announcement
            </button>
            <button
              onClick={() => setContent({ ...content, message: '🔥 Early bird discount: 30% off until December 31st!' })}
              className="text-left px-3 py-2 bg-slate-900 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700"
            >
              Discount Offer
            </button>
            <button
              onClick={() => setContent({ ...content, message: '👥 Cohort 3 in progress - Join Cohort 4 starting Feb 2025' })}
              className="text-left px-3 py-2 bg-slate-900 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700"
            >
              Ongoing Cohort
            </button>
            <button
              onClick={() => setContent({ ...content, message: '⚡ Last 5 seats remaining for January batch!' })}
              className="text-left px-3 py-2 bg-slate-900 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700"
            >
              Urgency Message
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={saveContent}
            disabled={saving}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          {message && (
            <p className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Last Updated */}
        {content.lastUpdated && (
          <p className="text-xs text-slate-500">
            Last updated: {new Date(content.lastUpdated).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default PromotionalContentPanel;
