"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExpenseForm({ initialData = null, onClose }) {
  const [formData, setFormData] = useState({
    merchant: "",
    detail: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Merchant
        </label>
        <Input
          name="merchant"
          value={formData.merchant}
          onChange={handleChange}
          placeholder="e.g. AWS Cloud Services"
          required
          className="h-10 border-zinc-200 dark:border-zinc-800 rounded-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Detail
        </label>
        <Input
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          placeholder="e.g. Monthly infrastructure usage"
          className="h-10 border-zinc-200 dark:border-zinc-800 rounded-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Amount
          </label>
          <Input
            name="amount"
            type="text"
            value={formData.amount}
            onChange={handleChange}
            placeholder="$0.00"
            required
            className="h-10 border-zinc-200 dark:border-zinc-800 font-mono rounded-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Date
          </label>
          <Input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="h-10 border-zinc-200 dark:border-zinc-800 rounded-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Category
        </label>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Technology"
          className="h-10 border-zinc-200 dark:border-zinc-800 rounded-sm"
        />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-zinc-200 dark:border-zinc-800 rounded-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-black rounded-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-medium tracking-wide"
        >
          {initialData ? "Save Changes" : "Add Entry"}
        </Button>
      </div>
    </form>
  );
}
