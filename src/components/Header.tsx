import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="text-blue-400" size={32} />
            <div>
              <h1 className="text-xl font-bold text-white">WSC Security Monitor</h1>
              <p className="text-gray-400 text-sm">Woodinville Sports Club</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              System Active
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}