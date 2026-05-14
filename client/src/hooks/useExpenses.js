"use client";

import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/expenseService';
import toast from 'react-hot-toast';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [filters, setFilters] = useState({
        period: 'current_month',
        category: 'all',
        page: 1,
        limit: 10
    });

    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        try {
            const data = await expenseService.getExpenses(filters);
            setExpenses(data.data.expenses);
            setPagination(data.data.pagination);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const updateFilter = (key, value) => {
        setFilters(prev => {
            if (key !== 'page') {
                return { ...prev, [key]: value, page: 1 };
            }
            return { ...prev, [key]: value };
        });
    };

    const addExpense = async (expenseData) => {
        try {
            await expenseService.createExpense(expenseData);
            toast.success("Expense added successfully");
            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense");
            throw error;
        }
    };

    const processAIExpense = async (text) => {
        try {
            await expenseService.createExpenseFromAI(text);
            toast.success("AI extracted and logged expense successfully! ✨");
            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || "AI processing failed");
            throw error;
        }
    };

    const editExpense = async (id, updateData) => {
        try {
            await expenseService.updateExpense(id, updateData);
            toast.success("Expense updated successfully");
            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update expense");
            throw error;
        }
    };

    const removeExpense = async (id) => {
        try {
            await expenseService.deleteExpense(id);
            toast.success("Expense deleted successfully");
            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense");
            throw error;
        }
    };

    return {
        expenses,
        loading,
        filters,
        pagination,
        updateFilter,
        addExpense,
        processAIExpense,
        editExpense,
        removeExpense,
        refresh: fetchExpenses
    };
};
