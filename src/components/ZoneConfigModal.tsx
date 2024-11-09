import React, { useState } from 'react';
import { X, AlertTriangle, Bell, Tag } from 'lucide-react';
import type { ZoneConfig, AlertRule } from '../types/zone';

interface ZoneConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ZoneConfig) => void;
  initialPosition: { x: number; y: number; width: number; height: number };
}

const ZONE_TYPES = [
  'Front Desk',
  'Pro Shop',
  'Driving Range',
  'Parking Area',
  'Equipment Storage',
  'Practice Area',
  'Customer Service Point',
  'Entry/Exit',
];

const MONITORING_TAGS = [
  'Customer Service',
  'Safety',
  'Cleanliness',
  'Equipment',
  'Traffic Flow',
  'Maintenance',
  'Staff Presence',
  'Queue Management',
];

const ALERT_CONDITIONS = [
  { value: 'unattended', label: 'Area Unattended' },
  { value: 'overcrowding', label: 'Overcrowding Detected' },
  { value: 'equipment_low', label: 'Equipment/Supplies Low' },
  { value: 'maintenance', label: 'Maintenance Required' },
  { value: 'safety_hazard', label: 'Safety Hazard Detected' },
  { value: 'long_wait', label: 'Long Wait Time' },
  { value: 'traffic_buildup', label: 'Traffic/Queue Buildup' },
  { value: 'cleanliness', label: 'Cleanliness Issue' },
];

const SLING_CHANNELS = [
  'Front Desk Staff',
  'Management',
  'Maintenance',
  'Pro Shop Staff',
  'Security',
  'All Staff',
];

export default function ZoneConfigModal({
  isOpen,
  onClose,
  onSave,
  initialPosition
}: ZoneConfigModalProps) {
  const [config, setConfig] = useState<Partial<ZoneConfig>>({
    ...initialPosition,
    id: Date.now().toString(),
    alerts: [],
    tags: [],
    monitoringPriority: 'medium'
  });

  const addAlertRule = () => {
    const newAlert: AlertRule = {
      id: Date.now().toString(),
      condition: '',
      message: '',
      notifyChannels: [],
      threshold: ''
    };
    
    setConfig({
      ...config,
      alerts: [...(config.alerts || []), newAlert]
    });
  };

  const updateAlertRule = (index: number, updates: Partial<AlertRule>) => {
    const newAlerts = [...(config.alerts || [])];
    newAlerts[index] = { ...newAlerts[index], ...updates };
    setConfig({ ...config, alerts: newAlerts });
  };

  const removeAlertRule = (index: number) => {
    const newAlerts = [...(config.alerts || [])];
    newAlerts.splice(index, 1);
    setConfig({ ...config, alerts: newAlerts });
  };

  const handleSave = () => {
    if (!config.name || !config.type) return;
    onSave(config as ZoneConfig);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Configure Camera Zone</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Zone Name
              </label>
              <input
                type="text"
                value={config.name || ''}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                placeholder="e.g., Front Desk Area"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zone Type
                </label>
                <select
                  value={config.type || ''}
                  onChange={(e) => setConfig({ ...config, type: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                >
                  <option value="">Select type...</option>
                  {ZONE_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monitoring Priority
                </label>
                <select
                  value={config.monitoringPriority || 'medium'}
                  onChange={(e) => setConfig({ ...config, monitoringPriority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={config.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                rows={3}
                placeholder="Describe what should be monitored in this zone..."
              />
            </div>
          </div>

          {/* Alert Rules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h3 className="text-lg font-medium text-white">Alert Rules</h3>
              </div>
              <button
                onClick={addAlertRule}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Add Rule
              </button>
            </div>

            <div className="space-y-4">
              {config.alerts?.map((alert, index) => (
                <div key={alert.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-white font-medium">Rule #{index + 1}</h4>
                    <button
                      onClick={() => removeAlertRule(index)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Condition
                      </label>
                      <select
                        value={alert.condition}
                        onChange={(e) => updateAlertRule(index, { condition: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                      >
                        <option value="">Select condition...</option>
                        {ALERT_CONDITIONS.map((condition) => (
                          <option key={condition.value} value={condition.value}>
                            {condition.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Threshold
                      </label>
                      <input
                        type="text"
                        value={alert.threshold || ''}
                        onChange={(e) => updateAlertRule(index, { threshold: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                        placeholder="e.g., 5 minutes, 30%, 10 people"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Alert Message
                    </label>
                    <input
                      type="text"
                      value={alert.message || ''}
                      onChange={(e) => updateAlertRule(index, { message: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
                      placeholder="Message to send when condition is met..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notify on Sling
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SLING_CHANNELS.map((channel) => (
                        <label
                          key={channel}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            alert.notifyChannels?.includes(channel)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={alert.notifyChannels?.includes(channel)}
                            onChange={(e) => {
                              const channels = new Set(alert.notifyChannels);
                              e.target.checked ? channels.add(channel) : channels.delete(channel);
                              updateAlertRule(index, { notifyChannels: Array.from(channels) });
                            }}
                          />
                          {channel}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {config.alerts?.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Bell size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No alert rules configured</p>
                  <p className="text-sm">Click "Add Rule" to create your first alert rule</p>
                </div>
              )}
            </div>
          </div>

          {/* Monitoring Tags */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="text-blue-400" size={20} />
              <h3 className="text-lg font-medium text-white">Monitoring Tags</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {MONITORING_TAGS.map((tag) => (
                <label
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                    config.tags?.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={config.tags?.includes(tag)}
                    onChange={(e) => {
                      const tags = new Set(config.tags);
                      e.target.checked ? tags.add(tag) : tags.delete(tag);
                      setConfig({ ...config, tags: Array.from(tags) });
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!config.name || !config.type}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}