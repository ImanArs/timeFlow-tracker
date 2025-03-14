"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { BottomSheet } from "react-spring-bottom-sheet";

import { cn } from "@/lib/utils";
import BottomNavigation from "@/components/bottom-navigation";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

export default function TimersPage() {
  const router = useRouter();
  const [customTimers, setCustomTimers] = useState<number[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Load custom timers from localStorage
    const savedTimers = localStorage.getItem("customTimers");
    if (savedTimers) {
      setCustomTimers(JSON.parse(savedTimers));
    }
  }, []);

  const handleDeleteTimer = (index: number) => {
    const newTimers = [...customTimers];
    newTimers.splice(index, 1);
    setCustomTimers(newTimers);
    localStorage.setItem("customTimers", JSON.stringify(newTimers));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white pb-16">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold">Your Timers</h1>
      </header>

      <main className="flex-1 p-6 pt-0">
        {customTimers.length > 0 ? (
          <div className="grid gap-3">
            {customTimers.map((minutes, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-800"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                    <Clock className="text-purple-400" size={20} />
                  </div>
                  <span className="text-lg font-medium">{minutes} minutes</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem("selectedTimer", minutes.toString());
                      router.push("/timer");
                    }}
                    className="px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => handleDeleteTimer(index)}
                    className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Clock className="text-gray-600 mb-4" size={48} />
            <p className="text-gray-500 mb-2">
              You don't have any custom timers yet
            </p>
            <p className="text-gray-600 text-sm">
              Create your first timer by clicking the + button
            </p>
          </div>
        )}
      </main>

      <motion.button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed right-6 bottom-20 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-900/30"
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} />
      </motion.button>

      <BottomNavigation activeTab="timers" />

      {isCreateModalOpen && (
        <CreateTimerModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(minutes) => {
            const newTimers = [...customTimers, minutes];
            setCustomTimers(newTimers);
            localStorage.setItem("customTimers", JSON.stringify(newTimers));
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

function CreateTimerModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (minutes: number) => void;
}) {
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-md mx-auto bg-gray-900">
        <h2 className="text-xl font-bold mb-6 text-center">
          Create Custom Timer
        </h2>

        <div className="relative h-48 overflow-hidden mb-8">
          <div className="absolute inset-0 pointer-events-none z-10" />

          <div className="h-full overflow-auto snap-y snap-mandatory scrollbar-hide">
            <div className="h-[calc(50%-24px)]" />
            {minuteOptions.map((minutes) => (
              <div
                key={minutes}
                className={cn(
                  "h-12 flex items-center justify-center snap-center cursor-pointer",
                  selectedMinutes === minutes
                    ? "text-xl font-bold text-white"
                    : "text-gray-500"
                )}
                onClick={() => setSelectedMinutes(minutes)}
              >
                {minutes} min
              </div>
            ))}
            <div className="h-[calc(50%-24px)]" />
          </div>
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-12 border-t border-b border-purple-800/30 pointer-events-none" />
        </div>

        <button
          onClick={() => {
            onSave(selectedMinutes);
            onClose();
          }}
          className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
        >
          Save Timer
        </button>
      </DialogContent>
    </Dialog>
  );
}
