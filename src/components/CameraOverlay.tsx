import React, { useRef, useState, useEffect } from 'react';
import { Edit2, Save } from 'lucide-react';
import CameraConfigModal from './CameraConfigModal';
import { useZoneStore } from '../stores/zoneStore';
import type { ZoneConfig } from '../types/zone';

export default function CameraOverlay() {
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
    <div className="relative w-full h-[calc(100vh-4rem)]" ref={containerRef}>
      <div className="absolute inset-0 bg-gray-900">
        {/* This div represents your Wise camera grid view */}
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

      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white`}
        >
          {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
        </button>
      </div>

      {showConfigModal && currentZone && (
        <CameraConfigModal
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