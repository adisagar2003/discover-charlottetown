import axios, { AxiosError } from 'axios';
import api from '../utils/api';

// Types
interface Location {
  id: string;
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    name: string;
    category: string;
  };
}

interface UserData {
  id: string;
  locations: string[]; // Array of location IDs
}

// Service
export const mapService = {

  getLocations: async (): Promise<Location[]> => {
    try {
      const response = await axios.get(`${api}/api/locationMap/20`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw new Error('Failed to fetch locations');
    }
  },

  visitLocation: async (locationId: string): Promise<void> => {
    try {
      await axios.post(
        `${api}/api/visitLocation`,
        { id: locationId },
        { withCredentials: true }
      );
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 300) {
        throw new Error('Already visited location');
      }
      throw new Error('Failed to visit location');
    }
  },

  getUserData: async (userId: string): Promise<UserData> => {
    try {
      const response = await axios.get(`${api}/api/user/${userId}`);
      return response.data.response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }
}; 