import axios from 'axios';
import api from '../utils/api';

export const locationService = {
    searchLocations: async (searchValue: string) => {
        try {
            const response = await axios.get(`${api}/api/locationMapSearch/${searchValue}`);
            return response.data.response;
        } catch (error) {
            console.error('Error searching locations:', error);
            throw error;
        }
    },

    getDefaultLocations: async () => {
        try {
            const response = await axios.get(`${api}/api/locationMapSearch/a`);
            return response.data.response;
        } catch (error) {
            console.error('Error fetching default locations:', error);
            throw error;
        }
    }
}; 