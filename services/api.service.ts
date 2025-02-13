import axios from 'axios';
import type { Device, HealthSummary, Health } from '~/types';

const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  async getDevices(): Promise<Device[]> {
    const { data } = await useFetch('http://localhost:3001/api/devices');
    return data.value as Device[];
  },
  async getHealthSummary(deviceId: string, startDate: string, endDate: string): Promise<HealthSummary> {
    const { data } = await useFetch(`http://localhost:3001/api/health/device/${deviceId}/summary`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return data.value as HealthSummary;
  },
  async getHealthByDevice(deviceId: string, startDate: string, endDate: string): Promise<Health[]> {
    const { data } = await useFetch(`http://localhost:3001/api/health/device/${deviceId}`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return data.value as Health[];
  },
  // ... other methods
};
