import { useState, useEffect } from 'react';
import { testApiKey, setAIConfig, getCurrentProvider, AIProvider } from '../services/aiService';
import { XMarkIcon, EyeIcon, EyeSlashIcon, PencilIcon } from './Icons';

interface ApiKeyManagerProps {
  onKeySet: (key: string) => void;
  onKeyRemove: () => void;
  isRequired?: boolean;
}

interface ProviderKeyStatus {
  provider: AIProvider;
  name: string;
  description: string;
  hasKey: boolean;
  key?: string;
  isActive: boolean;
}

export default function ApiKeyManager({ onKeySet, onKeyRemove, isRequired = false }: ApiKeyManagerProps) {
  const [providers, setProviders] = useState<ProviderKeyStatus[]>([]);
  const [editingProvider, setEditingProvider] = useState<AIProvider | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState<Record<AIProvider, boolean>>({ gemini: false, groq: false });

  // Load all provider statuses
  useEffect(() => {
    loadProviderStatuses();
  }, []);

  const loadProviderStatuses = () => {
    const currentProvider = getCurrentProvider();
    
    const providerConfigs: Omit<ProviderKeyStatus, 'hasKey' | 'key' | 'isActive'>[] = [
      { provider: 'gemini', name: 'Google Gemini', description: 'Free tier: 15 RPM, excellent for education' },
      { provider: 'groq', name: 'Groq', description: 'Free tier: Very fast responses, great for real-time' }
    ];

    const updatedProviders = providerConfigs.map(config => {
      const savedKey = localStorage.getItem(`${config.provider}_api_key`);
      return {
        ...config,
        hasKey: !!savedKey,
        key: savedKey || undefined,
        isActive: config.provider === currentProvider
      };
    });

    setProviders(updatedProviders);
    
    // Notify parent about current key status
    const activeProviderData = updatedProviders.find(p => p.isActive);
    if (activeProviderData?.hasKey && activeProviderData.key) {
      onKeySet(activeProviderData.key);
    } else {
      onKeyRemove();
    }
  };

  const validateKeyFormat = (key: string, provider: AIProvider): boolean => {
    if (provider === 'gemini') {
      return key.startsWith('AIza');
    } else if (provider === 'groq') {
      return key.startsWith('gsk_');
    }
    return false;
  };

  const handleSaveKey = async (provider: AIProvider) => {
    if (!tempApiKey.trim()) {
      setValidationError('Please enter an API key');
      return;
    }

    if (!validateKeyFormat(tempApiKey.trim(), provider)) {
      const expectedPrefix = provider === 'gemini' ? 'AIza' : 'gsk_';
      setValidationError(`${provider === 'gemini' ? 'Gemini' : 'Groq'} API keys should start with "${expectedPrefix}"`);
      return;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      console.log(`Testing ${provider} API key...`);
      const isValid = await testApiKey(provider, tempApiKey.trim());
      if (isValid) {
        // Save the key
        localStorage.setItem(`${provider}_api_key`, tempApiKey.trim());
        
        // Set as active provider and update config
        setAIConfig(provider, tempApiKey.trim());
        
        // Reload provider statuses
        loadProviderStatuses();
        
        // Clear editing state
        setEditingProvider(null);
        setTempApiKey('');
        setValidationError(null);
        
        console.log(`${provider} API key validated and saved successfully`);
      } else {
        console.log(`${provider} API key validation failed`);
        setValidationError(`Invalid ${provider === 'gemini' ? 'Gemini' : 'Groq'} API key. Please check your key and try again.`);
      }
    } catch (error: any) {
      console.error(`Error validating ${provider} API key:`, error);
      let errorMessage = `Failed to validate ${provider === 'gemini' ? 'Gemini' : 'Groq'} API key. `;
      
      if (error?.message?.includes('fetch')) {
        errorMessage += 'Network connection error. Please check your internet connection.';
      } else if (error?.message?.includes('401') || error?.message?.includes('Unauthorized')) {
        errorMessage += 'The API key is invalid or unauthorized.';
      } else if (error?.message?.includes('403') || error?.message?.includes('Forbidden')) {
        errorMessage += 'The API key lacks necessary permissions.';
      } else if (error?.message?.includes('429')) {
        errorMessage += 'Too many requests. Please try again in a moment.';
      } else {
        errorMessage += 'Please try again.';
      }
      
      setValidationError(errorMessage);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSwitchProvider = (provider: AIProvider) => {
    setAIConfig(provider, localStorage.getItem(`${provider}_api_key`) || '');
    loadProviderStatuses();
  };

  const handleRemoveKey = (provider: AIProvider) => {
    localStorage.removeItem(`${provider}_api_key`);
    loadProviderStatuses();
  };

  const handleStartEditing = (provider: AIProvider) => {
    setEditingProvider(provider);
    setTempApiKey(localStorage.getItem(`${provider}_api_key`) || '');
    setValidationError(null);
  };

  const handleCancelEditing = () => {
    setEditingProvider(null);
    setTempApiKey('');
    setValidationError(null);
  };

  const toggleShowKey = (provider: AIProvider) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          {isRequired ? 'API Key Required' : 'AI Provider Management'}
        </h3>
        <p className="text-slate-300 text-sm mb-4">
          Manage your API keys for different AI providers. You can have keys for multiple providers and switch between them.
        </p>
      </div>

      {providers.map((providerData) => (
        <div
          key={providerData.provider}
          className={`bg-slate-800 border rounded-lg p-4 transition-all ${
            providerData.isActive ? 'border-cyan-500 bg-cyan-900/10' : 'border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                providerData.hasKey ? 'bg-green-500' : 'bg-amber-500'
              }`} />
              <div>
                <h4 className="text-white font-medium flex items-center gap-2">
                  {providerData.name}
                  {providerData.isActive && (
                    <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </h4>
                <p className="text-slate-400 text-xs">{providerData.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {providerData.hasKey && !providerData.isActive && (
                <button
                  onClick={() => handleSwitchProvider(providerData.provider)}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Switch to this
                </button>
              )}
              
              {providerData.hasKey && (
                <button
                  onClick={() => handleStartEditing(providerData.provider)}
                  className="p-1 rounded hover:bg-slate-700 transition-colors"
                  title="Edit key"
                >
                  <PencilIcon className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {providerData.hasKey && editingProvider !== providerData.provider && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">API Key:</span>
                <div className="flex items-center gap-2">
                  <code className="text-slate-300 font-mono">
                    {showKeys[providerData.provider] 
                      ? providerData.key 
                      : `${providerData.key?.substring(0, 8)}${'*'.repeat((providerData.key?.length || 8) - 8)}`
                    }
                  </code>
                  <button
                    onClick={() => toggleShowKey(providerData.provider)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showKeys[providerData.provider] ? 
                      <EyeSlashIcon className="w-4 h-4" /> : 
                      <EyeIcon className="w-4 h-4" />
                    }
                  </button>
                  <button
                    onClick={() => handleRemoveKey(providerData.provider)}
                    className="text-red-400 hover:text-red-300"
                    title="Remove key"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {(!providerData.hasKey || editingProvider === providerData.provider) && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  {providerData.name} API Key
                </label>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => {
                    setTempApiKey(e.target.value);
                    setValidationError(null);
                  }}
                  placeholder={providerData.provider === 'gemini' ? 'AIzaSy...' : 'gsk_...'}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  disabled={isValidating}
                />
                {validationError && editingProvider === providerData.provider && (
                  <p className="mt-2 text-sm text-red-400">{validationError}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveKey(providerData.provider)}
                  disabled={isValidating || !tempApiKey.trim()}
                  className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isValidating ? 'Validating...' : 'Save & Validate Key'}
                </button>
                
                {editingProvider === providerData.provider && (
                  <button
                    onClick={handleCancelEditing}
                    className="px-4 py-2 text-slate-400 hover:text-white border border-slate-600 hover:border-slate-500 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="bg-slate-700 rounded-md p-3">
                <h5 className="text-white font-medium text-sm mb-2">How to get your {providerData.name} API key:</h5>
                {providerData.provider === 'gemini' ? (
                  <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside">
                    <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Google AI Studio</a></li>
                    <li>Sign in with your Google account</li>
                    <li>Click "Create API Key"</li>
                    <li>Copy the key and paste it above</li>
                  </ol>
                ) : (
                  <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside">
                    <li>Visit <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Groq Console</a></li>
                    <li>Sign up or sign in to your account</li>
                    <li>Click "Create API Key"</li>
                    <li>Copy the key and paste it above</li>
                  </ol>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h4 className="text-white font-medium text-sm mb-2">💡 Tips:</h4>
        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
          <li>You can add keys for multiple providers and switch between them</li>
          <li>Your keys are stored locally and never sent to our servers</li>
          <li>The active provider is used for all AI features (chatbot, exercises)</li>
          <li>You can start with one provider and add others later</li>
        </ul>
      </div>
    </div>
  );
}
