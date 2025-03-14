"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function TimerPage() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const ballControls = useAnimation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Get selected timer from localStorage
    const selectedTimer = localStorage.getItem("selectedTimer");
    if (selectedTimer) {
      setMinutes(Number.parseInt(selectedTimer));
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setIsRunning(true);

    // Start ball animation
    ballControls.start({
      y: [0, 100],
      transition: {
        y: {
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    });

    // Start countdown
    const totalSeconds = minutes * 60 + seconds;
    let remainingSeconds = totalSeconds;

    intervalRef.current = setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds < 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setIsCompleted(true);
        ballControls.stop();
        return;
      }

      const newMinutes = Math.floor(remainingSeconds / 60);
      const newSeconds = remainingSeconds % 60;

      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="p-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {isCompleted ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-8"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <h1 className="text-2xl font-bold mb-3">Time's Up!</h1>
            <p className="text-gray-400 mb-8">You've completed your timer.</p>

            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="relative w-full h-64 flex items-center justify-center mb-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-800 opacity-50" />

              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 shadow-lg shadow-purple-900/30"
                animate={ballControls}
              />
            </div>

            <div className="text-center mb-12">
              <div className="text-5xl font-bold mb-2">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <p className="text-gray-400">
                {isRunning ? "Timer running..." : "Ready to start?"}
              </p>
            </div>

            {!isRunning && (
              <button
                onClick={startTimer}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all"
              >
                Start Timer
              </button>
            )}
          </>
        )}
      </main>
    </div>
  );
}
