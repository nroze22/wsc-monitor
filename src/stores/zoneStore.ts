import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ZoneConfig } from '../types/zone';

interface ZoneState {
  zones: ZoneConfig[];
  addZone: (zone: ZoneConfig) => void;
  removeZone: (id: string) => void;
  updateZone: (id: string, updates: Partial<ZoneConfig>) => void;
}

export const useZoneStore = create<ZoneState>()(
  persist(
    (set) => ({
      zones: [],
      addZone: (zone) => set((state) => ({ zones: [...state.zones, zone] })),
      removeZone: (id) => set((state) => ({ 
        zones: state.zones.filter((zone) => zone.id !== id) 
      })),
      updateZone: (id, updates) => set((state) => ({
        zones: state.zones.map((zone) => 
          zone.id === id ? { ...zone, ...updates } : zone
        )
      }))
    }),
    {
      name: 'camera-zones'
    }
  )
);