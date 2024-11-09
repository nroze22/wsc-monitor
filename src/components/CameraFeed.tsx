import React from 'react';
import type { ZoneConfig } from '../types/zone';

interface CameraFeedProps {
  zone: ZoneConfig;
}

export default function CameraFeed({ zone }: CameraFeedProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="aspect-video bg-gray-900 relative">
        {/* Placeholder for camera feed */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {zone.name}
        </div>
        
        {/* Status overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
          <div className="p-4 text-white">
            <h3 className="font-bold">{zone.name}</h3>
            <p className="text-sm text-gray-300">{zone.description}</p>
            {zone.alerts.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-yellow-400">
                  {zone.alerts.length} Alert Rules Active
                </p>
              </div>
            )}
            {zone.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {zone.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">{zone.name}</h3>
            <p className="text-sm text-gray-400">{zone.type}</p>
          </div>
          <span 
            className={`px-2 py-1 rounded-full text-xs ${
              zone.monitoringPriority === 'high' 
                ? 'bg-red-500/10 text-red-400'
                : zone.monitoringPriority === 'medium'
                ? 'bg-yellow-500/10 text-yellow-400'
                : 'bg-green-500/10 text-green-400'
            }`}
          >
            {zone.monitoringPriority.charAt(0).toUpperCase() + zone.monitoringPriority.slice(1)} Priority
          </span>
        </div>
      </div>
    </div>
  );
}