import { create } from 'zustand';
import { Detection } from '@mediapipe/tasks-vision';

interface VisionState {
  detections: Map<number, Detection[]>;
  setDetections: (cameraId: number, detections: Detection[]) => void;
  clearDetections: (cameraId: number) => void;
}

export const useVisionStore = create<VisionState>((set) => ({
  detections: new Map(),
  setDetections: (cameraId, detections) =>
    set((state) => ({
      detections: new Map(state.detections).set(cameraId, detections),
    })),
  clearDetections: (cameraId) =>
    set((state) => {
      const newDetections = new Map(state.detections);
      newDetections.delete(cameraId);
      return { detections: newDetections };
    }),
}));