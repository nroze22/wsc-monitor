import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlingChannel {
  name: string;
  id: string;
}

interface Settings {
  geminiApiKey: string;
  wiseGridUrl: string;
  slingApiToken: string;
  slingOrgId: string;
  slingChannels: SlingChannel[];
  geminiAnalysisInterval: number;
  alertAggregationWindow: number;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (newSettings: Settings) => Promise<void>;
}

const DEFAULT_SETTINGS: Settings = {
  geminiApiKey: '',
  wiseGridUrl: '',
  slingApiToken: '',
  slingOrgId: '',
  slingChannels: [],
  geminiAnalysisInterval: 60,
  alertAggregationWindow: 5
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: async (newSettings) => {
        // Here you could add validation, API calls, etc.
        set({ settings: newSettings });
      }
    }),
    {
      name: 'wsc-security-settings'
    }
  )
);