"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // When user refreshes page, check if token/user exists
        const storedUser = localStorage.getItem('user');
        
        // Note: The actual cookie is handled by the browser, 
        // we just rely on localStorage for the user state data here.
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLogin(true);
        } else {
            setUser(null);
            setIsLogin(false);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await authService.login({ email, password });
            const userData = res.data.user;
            setUser(userData);
            setIsLogin(true);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success(res.message || "Login successful!");
            router.push('/dashboard');
        } catch (error) {
            const errMsg = error.response?.data?.message || "Login failed";
            toast.error(errMsg);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await authService.register({ name, email, password });
            const userData = res.data.user;
            setUser(userData);
            setIsLogin(true);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success(res.message || "Registration successful!");
            router.push('/dashboard');
        } catch (error) {
            const errMsg = error.response?.data?.message || "Registration failed";
            toast.error(errMsg);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            
            setUser(null);
            setIsLogin(false);
            localStorage.removeItem('user');
            
            toast.success("Logged out successfully");
            router.push('/login');
        } catch (error) {
            console.error("Logout error", error);
            // Fallback: clear local state anyway
            setUser(null);
            setIsLogin(false);
            localStorage.removeItem('user');
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLogin, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
