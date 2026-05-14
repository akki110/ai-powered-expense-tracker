"use client";

import { useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIExpenseInput({ onProcess }) {
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !onProcess) return;
    setProcessing(true);
    try {
      await onProcess(text);
      setText("");
    } catch (error) {
      // handled by hook
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="border border-purple-100 bg-purple-50/30 dark:bg-purple-900/10 dark:border-purple-900/30 rounded-sm p-6 relative overflow-hidden mb-6 mt-2">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-indigo-500" />
        <h2 className="font-bold tracking-widest text-sm uppercase">
          AI Intelligent Processor
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 w-full">
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            Paste your digital receipts, SMS transaction alerts, or bill text
            here. Our AI extracts merchant, amount, category, and date
            automatically.
          </p>

          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={processing}
              placeholder="Example: H&M payment of $45.90 on 12/04/23 confirmed..."
              className="w-full pl-4 pr-36 py-4 border border-zinc-200 dark:border-zinc-800 rounded-sm text-sm bg-white dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <Button type="submit" disabled={processing || !text.trim()} className="absolute right-1.5 top-1.5 bottom-1.5 h-auto bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-md px-4 text-xs font-medium flex items-center gap-2">
              {processing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="hidden sm:block">Extracting...</span>
                </>
              ) : (
                <>
                  <Send className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
                  <span className="hidden sm:block">Process with AI</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
