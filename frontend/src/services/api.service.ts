import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.config';

export const apiService = {
  // Device endpoints
  async getDevices() {
    const response = await axios.get(API_ENDPOINTS.devices);
    return response.data;
  },

  async getDeviceById(id: string) {
    const response = await axios.get(`${API_ENDPOINTS.devices}/${id}`);
    return response.data;
  },

  // Health endpoints
  async getHealthByDeviceId(deviceId: string, params?: { type?: string; startDate?: string; endDate?: string }) {
    const response = await axios.get(`${API_ENDPOINTS.health}/device/${deviceId}`, { params });
    return response.data;
  },

  // Sleep endpoints
  async getSleepByDeviceId(deviceId: string, params?: { startDate?: string; endDate?: string }) {
    const response = await axios.get(`${API_ENDPOINTS.sleep}/device/${deviceId}`, { params });
    return response.data;
  },

  async getSleepStats(deviceId: string) {
    const response = await axios.get(`${API_ENDPOINTS.sleep}/stats/${deviceId}`);
    return response.data;
  },

  // User Device endpoints
  async getUserDevices() {
    const response = await axios.get(API_ENDPOINTS.userDevices);
    return response.data;
  },
};
