export interface AlertRule {
  id: string;
  condition: string;
  threshold?: string;
  message: string;
  notifyChannels: string[];
  escalation?: string[];
}

export interface ZoneConfig {
  id: string;
  name: string;
  description: string;
  type: string;
  monitoringPriority: 'low' | 'medium' | 'high';
  x: number;
  y: number;
  width: number;
  height: number;
  alerts: AlertRule[];
  tags: string[];
}