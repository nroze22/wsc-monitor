import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { ZoneConfig } from '../types/zone';

interface CameraConfigModalProps {
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
];

const SLING_CHANNELS = [
  'Front Desk Staff',
  'Management',
  'Maintenance',
  'Pro Shop Staff',
  'Security',
  'All Staff',
];

export default function CameraConfigModal({
  isOpen,
  onClose,
  onSave,
  initialPosition
}: CameraConfigModalProps) {
  const [config, setConfig] = useState<Partial<ZoneConfig>>({
    ...initialPosition,
    id: Date.now().toString(),
    alerts: []
  });

  const handleSave = () => {
    if (!config.name || !config.type) return;
    onSave(config as ZoneConfig);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Configure Camera Zone</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
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

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h3 className="font-medium text-white">Alert Channels</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SLING_CHANNELS.map((channel) => (
                  <label
                    key={channel}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-700 bg-gray-800 text-blue-500"
                      checked={config.alerts?.some(a => a.notifyChannels.includes(channel))}
                      onChange={(e) => {
                        const alerts = config.alerts || [];
                        if (e.target.checked) {
                          setConfig({
                            ...config,
                            alerts: [
                              ...alerts,
                              { condition: 'default', notifyChannels: [channel] }
                            ]
                          });
                        } else {
                          setConfig({
                            ...config,
                            alerts: alerts.filter(a => !a.notifyChannels.includes(channel))
                          });
                        }
                      }}
                    />
                    <span className="text-sm text-gray-300">{channel}</span>
                  </label>
                ))}
              </div>
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
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}