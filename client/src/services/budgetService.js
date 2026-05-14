import api from '../lib/axios';

export const budgetService = {
    getBudgets: async () => {
        const response = await api.get('/budgets');
        return response.data;
    },
    createBudget: async (budgetData) => {
        const response = await api.post('/budgets', budgetData);
        return response.data;
    },
    updateBudget: async (id, updateData) => {
        const response = await api.put(`/budgets/${id}`, updateData);
        return response.data;
    },
    deleteBudget: async (id) => {
        const response = await api.delete(`/budgets/${id}`);
        return response.data;
    }
};
