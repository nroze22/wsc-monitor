import React from 'react';
import { useState } from 'react';
import { Layout, Settings as SettingsIcon, Sliders } from 'lucide-react';
import Header from './components/Header';
import CameraGrid from './components/CameraGrid';
import CameraSettings from './components/CameraSettings';
import Settings from './components/Settings';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings' | 'config'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-3 flex items-center space-x-2 border-b-2 transition-colors ${
                currentView === 'dashboard'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Layout size={18} />
              <span>Monitoring Dashboard</span>
            </button>
            
            <button
              onClick={() => setCurrentView('config')}
              className={`px-4 py-3 flex items-center space-x-2 border-b-2 transition-colors ${
                currentView === 'config'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <SettingsIcon size={18} />
              <span>Camera Settings</span>
            </button>

            <button
              onClick={() => setCurrentView('settings')}
              className={`px-4 py-3 flex items-center space-x-2 border-b-2 transition-colors ${
                currentView === 'settings'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Sliders size={18} />
              <span>System Settings</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {currentView === 'dashboard' ? (
          <div className="container mx-auto px-6 py-8">
            <CameraGrid />
          </div>
        ) : currentView === 'config' ? (
          <CameraSettings />
        ) : (
          <Settings />
        )}
      </main>
    </div>
  );
}

export default App;