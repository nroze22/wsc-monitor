import React from 'react';
import CameraFeed from './CameraFeed';
import { useZoneStore } from '../stores/zoneStore';
import AlertPanel from './AlertPanel';
import AnalyticsPanel from './AnalyticsPanel';

export default function CameraGrid() {
  const { zones } = useZoneStore();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <div className="grid grid-cols-2 gap-4">
          {zones.map((zone) => (
            <CameraFeed
              key={zone.id}
              zone={zone}
            />
          ))}
          
          {zones.length === 0 && (
            <div className="col-span-2 bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400">No cameras configured</p>
              <p className="text-sm text-gray-500 mt-2">
                Go to Camera Settings to configure your cameras
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-3 space-y-6">
        <AlertPanel />
        <AnalyticsPanel />
      </div>
    </div>
  );
}