import type { Device, HealthSummary, Health } from '~/types';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://smartwatch-ioh-monitoring-backend-4nyu9cuww-dawamrs-projects.vercel.app/api' // URL Production
    : 'http://localhost:3001/api'; // URL Local

export const apiService = {
  async getDevices(): Promise<Device[]> {
    const { data } = await useFetch(`${API_BASE_URL}/devices`);
    return data.value as Device[];
  },
  async getHealthSummary(deviceId: string, startDate: string, endDate: string): Promise<HealthSummary> {
    const { data } = await useFetch(`${API_BASE_URL}/health/device/${deviceId}/summary`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return data.value as HealthSummary;
  },
  async getHealthByDevice(deviceId: string, startDate: string, endDate: string): Promise<Health[]> {
    const { data } = await useFetch(`${API_BASE_URL}/health/device/${deviceId}`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return data.value as Health[];
  },
  // ... other methods
};
