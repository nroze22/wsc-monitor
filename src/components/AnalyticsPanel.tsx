import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';

export default function AnalyticsPanel() {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Analytics</h2>
        <p className="text-gray-400 text-sm">Performance metrics and trends</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="text-blue-400" size={20} />
            <h3 className="font-medium text-white">Average Wait Time</h3>
          </div>
          <p className="text-2xl font-bold text-white">2.5 min</p>
          <p className="text-sm text-green-400">↓ 12% from last week</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="text-yellow-400" size={20} />
            <h3 className="font-medium text-white">Active Alerts</h3>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-sm text-red-400">↑ 8% from last week</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium text-white mb-4">Common Issues</h3>
          <div className="space-y-3">
            {[
              { name: 'Front Desk', value: 35 },
              { name: 'Ball Supply', value: 28 },
              { name: 'Parking', value: 20 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-gray-400">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}