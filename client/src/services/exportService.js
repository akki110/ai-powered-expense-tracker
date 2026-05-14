import api from '../lib/axios';

export const exportService = {
    generateExport: async (exportParams) => {
        const response = await api.post('/exports', exportParams);
        return response.data;
    },
    getRecentExports: async () => {
        const response = await api.get('/exports');
        return response.data;
    }
};
