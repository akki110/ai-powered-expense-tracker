"use client";

import LoginForm from "@/components/auth/LoginForm";
import { TrendingUp, PieChart, ShieldCheck } from "lucide-react";

export default function page() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding/Hero (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FinAI Tracker</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Manage your finances with AI precision.
          </h1>
          <p className="text-zinc-400 text-lg mb-8">
            Track expenses, analyze spending patterns, and achieve your financial goals faster with our intelligent insights.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-300">
              <div className="bg-white/10 p-2 rounded-full">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </div>
              <span>Automated expense categorization</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <div className="bg-white/10 p-2 rounded-full">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <span>Bank-level security & encryption</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} FinAI Tracker. All rights reserved.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
             <div className="bg-indigo-600 p-1.5 rounded-lg">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">FinAI</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
