import React, { useState } from 'react';
import { Save, Key, MessageSquare, Camera, Bell, RefreshCw } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';

export default function Settings() {
  const { settings, updateSettings } = useSettingsStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await updateSettings(localSettings);
    setIsSaving(false);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">System Settings</h2>

        <div className="space-y-8">
          {/* API Keys Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Key className="text-blue-400" size={20} />
              <h3 className="text-lg font-medium text-white">API Credentials</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={localSettings.geminiApiKey}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    geminiApiKey: e.target.value
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Wise Camera Integration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Camera className="text-blue-400" size={20} />
              <h3 className="text-lg font-medium text-white">Wise Camera Integration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grid View URL
                </label>
                <input
                  type="url"
                  value={localSettings.wiseGridUrl}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    wiseGridUrl: e.target.value
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                  placeholder="https://wise.example.com/grid-view"
                />
              </div>
            </div>
          </div>

          {/* Sling Integration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare className="text-blue-400" size={20} />
              <h3 className="text-lg font-medium text-white">Sling Integration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sling API Token
                </label>
                <input
                  type="password"
                  value={localSettings.slingApiToken}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    slingApiToken: e.target.value
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sling Organization ID
                </label>
                <input
                  type="text"
                  value={localSettings.slingOrgId}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    slingOrgId: e.target.value
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Notification Channels
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {localSettings.slingChannels.map((channel, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <input
                          type="text"
                          value={channel.name}
                          onChange={(e) => {
                            const newChannels = [...localSettings.slingChannels];
                            newChannels[index].name = e.target.value;
                            setLocalSettings({
                              ...localSettings,
                              slingChannels: newChannels
                            });
                          }}
                          className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm"
                          placeholder="Channel name"
                        />
                        <button
                          onClick={() => {
                            const newChannels = localSettings.slingChannels.filter((_, i) => i !== index);
                            setLocalSettings({
                              ...localSettings,
                              slingChannels: newChannels
                            });
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                      <input
                        type="text"
                        value={channel.id}
                        onChange={(e) => {
                          const newChannels = [...localSettings.slingChannels];
                          newChannels[index].id = e.target.value;
                          setLocalSettings({
                            ...localSettings,
                            slingChannels: newChannels
                          });
                        }}
                        className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm"
                        placeholder="Channel ID"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setLocalSettings({
                    ...localSettings,
                    slingChannels: [...localSettings.slingChannels, { name: '', id: '' }]
                  })}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Add Channel
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <RefreshCw className="text-blue-400" size={20} />
              <h3 className="text-lg font-medium text-white">Analysis Settings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gemini Analysis Interval (seconds)
                </label>
                <input
                  type="number"
                  min="30"
                  value={localSettings.geminiAnalysisInterval}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    geminiAnalysisInterval: parseInt(e.target.value)
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Minimum 30 seconds recommended to avoid API rate limits
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alert Aggregation Window (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={localSettings.alertAggregationWindow}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    alertAggregationWindow: parseInt(e.target.value)
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
          >
            <Save size={18} />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}