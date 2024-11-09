export interface AlertRule {
  id: string;
  condition: string;
  threshold?: string;
  message: string;
  slingChannel: string[];
}

export interface CameraConfig {
  id: number;
  name: string;
  description: string;
  primaryFunction: string;
  keyMetrics: string[];
  alertRules: AlertRule[];
}