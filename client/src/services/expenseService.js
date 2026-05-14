import api from '../lib/axios';

export const expenseService = {
    getExpenses: async (params) => {
        const response = await api.get('/expenses', { params });
        return response.data;
    },
    createExpense: async (expenseData) => {
        const response = await api.post('/expenses', expenseData);
        return response.data;
    },
    updateExpense: async (id, updateData) => {
        const response = await api.put(`/expenses/${id}`, updateData);
        return response.data;
    },
    deleteExpense: async (id) => {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    }
};
