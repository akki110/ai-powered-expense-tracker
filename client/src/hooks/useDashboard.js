"use client";

import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import toast from 'react-hot-toast';

export const useDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const res = await dashboardService.getDashboardData();
            setData(res.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return { data, loading, refresh: fetchDashboard };
};
