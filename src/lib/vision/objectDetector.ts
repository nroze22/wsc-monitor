import { ObjectDetector, FilesetResolver } from '@mediapipe/tasks-vision';

let objectDetector: ObjectDetector | null = null;

export async function initObjectDetector() {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
  );
  
  objectDetector = await ObjectDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite',
      delegate: 'GPU'
    },
    scoreThreshold: 0.5,
    maxResults: 5
  });
}

export async function detectObjects(imageElement: HTMLImageElement | HTMLVideoElement) {
  if (!objectDetector) {
    await initObjectDetector();
  }
  
  const detections = await objectDetector!.detect(imageElement);
  return detections;
}