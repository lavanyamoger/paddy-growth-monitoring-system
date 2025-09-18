// src/types.ts
export interface CropData {
  id: string;
  date: string;
  height: number;
  leafArea: number;
  growthStage: string;
  healthStatus: 'healthy' | 'slow' | 'stunted' | 'unknown';
  imageUrl: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall?: number;
}
