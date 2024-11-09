import React from 'react';
import { AlertTriangle, Bell } from 'lucide-react';

export default function AlertPanel() {
  const alerts = [
    {
      id: 1,
      camera: 'Front Desk',
      message: 'Unattended for 5+ minutes',
      severity: 'high',
      time: '2 min ago'
    },
    {
      id: 2,
      camera: 'Driving Range',
      message: 'Low ball supply detected',
      severity: 'medium',
      time: '5 min ago'
    }
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="text-red-400" size={20} />
          <h2 className="text-xl font-bold text-white">Active Alerts</h2>
        </div>
        <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-sm">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-white mb-1">{alert.camera}</h3>
                <p className="text-gray-400 text-sm">{alert.message}</p>
              </div>
              <span className="text-gray-500 text-xs">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}