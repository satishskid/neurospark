import React from 'react';
import { ExclamationTriangleIcon, Cog6ToothIcon } from './Icons';

interface ApiKeyWarningProps {
  onOpenSettings: () => void;
}

export default function ApiKeyWarning({ onOpenSettings }: ApiKeyWarningProps) {
  return (
    <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-amber-200 font-medium mb-1">
            AI Features Disabled
          </h3>
          <p className="text-amber-100/80 text-sm mb-3">
            To use the AI-powered features like exercise feedback and the chatbot, 
            you need to provide your own Gemini API key.
          </p>
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            <Cog6ToothIcon className="w-4 h-4" />
            Add API Key
          </button>
        </div>
      </div>
    </div>
  );
}
