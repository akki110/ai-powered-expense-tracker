"use client";

import { useState, useEffect, useCallback } from 'react';
import { budgetService } from '../services/budgetService';
import toast from 'react-hot-toast';

export const useBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBudgets = useCallback(async () => {
        setLoading(true);
        try {
            const data = await budgetService.getBudgets();
            setBudgets(data.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch budgets");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBudgets();
    }, [fetchBudgets]);

    const addBudget = async (budgetData) => {
        try {
            await budgetService.createBudget(budgetData);
            toast.success("Budget established successfully");
            fetchBudgets();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add budget");
            throw error;
        }
    };

    const editBudget = async (id, updateData) => {
        try {
            await budgetService.updateBudget(id, updateData);
            toast.success("Budget updated successfully");
            fetchBudgets();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update budget");
            throw error;
        }
    };

    const removeBudget = async (id) => {
        try {
            await budgetService.deleteBudget(id);
            toast.success("Budget deleted successfully");
            fetchBudgets();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete budget");
            throw error;
        }
    };

    return {
        budgets,
        loading,
        addBudget,
        editBudget,
        removeBudget,
        refresh: fetchBudgets
    };
};
