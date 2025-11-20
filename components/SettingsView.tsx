import { XMarkIcon } from './Icons';
import ApiKeyManager from './ApiKeyManager';

interface SettingsViewProps {
  onClose: () => void;
  onApiKeyChange: (keyExists: boolean) => void;
}

export default function SettingsView({ onClose, onApiKeyChange }: SettingsViewProps) {
  const handleKeySet = (_key: string) => {
    onApiKeyChange(true);
  };

  const handleKeyRemove = () => {
    onApiKeyChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in-fast">
      <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700 animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <p className="text-slate-400 text-sm mt-1">Configure your AI provider and API keys</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors"
            aria-label="Close settings"
          >
            <XMarkIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">AI Provider Configuration</h3>
              <p className="text-slate-300 text-sm mb-4">
                To use AI features like the chatbot and exercise evaluation, you need to provide your own API key. 
                This ensures you have full control over your usage and costs.
              </p>
              <ApiKeyManager
                onKeySet={handleKeySet}
                onKeyRemove={handleKeyRemove}
              />
            </div>

            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Report an Issue</h3>
              <p className="text-slate-300 text-sm mb-4">
                Experiencing a problem or have feedback? Let us know and we'll help resolve it.
              </p>
              <button
                onClick={() => {
                  // Open report issue modal
                  const event = new CustomEvent('openReportIssue');
                  window.dispatchEvent(event);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors border border-slate-600"
              >
                Report a Problem
              </button>
            </div>

            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-3">About API Keys</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Why do I need an API key?</h4>
                  <p>
                    Instead of using a shared API key that could be rate-limited or expensive, you provide your own key. 
                    This gives you direct access to AI providers and better control over costs and usage.
                  </p>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Which provider should I choose?</h4>
                  <ul className="space-y-1 text-slate-300">
                    <li><strong>Google Gemini:</strong> Excellent for educational content, good free tier (15 requests/minute)</li>
                    <li><strong>Groq:</strong> Very fast responses, good for real-time interactions</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Is my API key secure?</h4>
                  <p>
                    Your API key is stored locally in your browser and is never sent to our servers. 
                    It's only used to make direct requests to your chosen AI provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
