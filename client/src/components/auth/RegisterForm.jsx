"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-0 shadow-none lg:shadow-sm lg:border bg-transparent lg:bg-card">
      <CardHeader className="space-y-2 px-0 lg:px-6 pt-0 lg:pt-6 p-4">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="text-base">
          Enter your email and password to sign up for an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 lg:px-6 p-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm tracking-widest font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Alex Carey"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className="pl-9 h-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm tracking-widest font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                className="pl-9 h-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-sm tracking-widest font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                className="pl-9 h-10"
                required
              />
            </div>
          </div>
          <Button
            className="w-full h-10 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="w-full flex justify-center items-center p-4">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
