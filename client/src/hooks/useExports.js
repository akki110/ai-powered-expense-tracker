"use client";

import { useState, useEffect, useCallback } from 'react';
import { exportService } from '../services/exportService';
import toast from 'react-hot-toast';

export const useExports = () => {
    const [recentExports, setRecentExports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

    const fetchRecentExports = useCallback(async () => {
        setLoading(true);
        try {
            const data = await exportService.getRecentExports();
            setRecentExports(data.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch recent exports");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecentExports();
    }, [fetchRecentExports]);

    const handleGenerateExport = async (exportParams) => {
        setExporting(true);
        try {
            await exportService.generateExport(exportParams);
            toast.success("Export generated successfully!");
            fetchRecentExports(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to generate export");
        } finally {
            setExporting(false);
        }
    };

    return {
        recentExports,
        loading,
        exporting,
        handleGenerateExport,
        refresh: fetchRecentExports
    };
};
