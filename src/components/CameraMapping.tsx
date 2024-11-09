import React, { useRef, useState, useEffect } from 'react';
import { Edit2, Save, HelpCircle } from 'lucide-react';
import { useZoneStore } from '../stores/zoneStore';
import ZoneConfigModal from './ZoneConfigModal';
import type { ZoneConfig } from '../types/zone';

export default function CameraMapping() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentZone, setCurrentZone] = useState<Partial<ZoneConfig> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showConfigModal, setShowConfigModal] = useState(false);

  const { zones, addZone } = useZoneStore();

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        drawZones();
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [zones]);

  const drawZones = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    zones.forEach((zone) => {
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
      
      // Draw zone label
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(zone.x, zone.y - 24, ctx.measureText(zone.name).width + 20, 20);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText(zone.name, zone.x + 10, zone.y - 10);
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditing) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentZone({
      x,
      y,
      width: 0,
      height: 0
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !currentZone || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentZone({
      ...currentZone,
      width: x - startPos.x,
      height: y - startPos.y
    });
    
    drawZones();
    
    // Draw current zone
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentZone) return;
    setIsDrawing(false);
    setShowConfigModal(true);
  };

  const handleSaveZone = (config: ZoneConfig) => {
    addZone(config);
    setCurrentZone(null);
    setShowConfigModal(false);
    drawZones();
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <div className="absolute inset-0 bg-gray-900" ref={containerRef}>
        {/* Camera Grid View */}
        <div className="w-full h-full bg-black/50 flex items-center justify-center text-gray-500">
          Camera Grid View
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: isEditing ? 'auto' : 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-4 text-gray-300">
            <HelpCircle size={16} />
            <span className="text-sm">Draw boxes to map camera zones</span>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              isEditing
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {isEditing ? (
              <>
                <Save size={18} />
                <span>Finish Mapping</span>
              </>
            ) : (
              <>
                <Edit2 size={18} />
                <span>Start Mapping</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Zone Configuration Modal */}
      {showConfigModal && currentZone && (
        <ZoneConfigModal
          isOpen={showConfigModal}
          onClose={() => {
            setShowConfigModal(false);
            setCurrentZone(null);
          }}
          onSave={handleSaveZone}
          initialPosition={currentZone}
        />
      )}
    </div>
  );
}