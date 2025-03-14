"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Dumbbell, Coffee, Brain } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { challenges } from "../page";

type Challenge = {
  id: string;
  title: string;
  description: string;
  minutes: number;
  icon: React.ReactNode;
  image: string;
};

export default function ChallengePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const foundChallenge = challenges.find((c) => c.id === id);
    if (foundChallenge) {
      setChallenge(foundChallenge);
      setMinutes(foundChallenge.minutes);
    } else {
      router.push("/challenges");
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [id, router]);

  const startTimer = () => {
    setIsRunning(true);

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

        // Save completed challenge
        const completedChallenges = JSON.parse(
          localStorage.getItem("completedChallenges") || "[]"
        );
        if (!completedChallenges.includes(id)) {
          completedChallenges.push(id);
          localStorage.setItem(
            "completedChallenges",
            JSON.stringify(completedChallenges)
          );
        }

        return;
      }

      const newMinutes = Math.floor(remainingSeconds / 60);
      const newSeconds = remainingSeconds % 60;

      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }, 1000);
  };

  if (!challenge) {
    return null;
  }

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

      <main className="flex-1 flex flex-col p-6">
        <div className="relative h-40 rounded-xl overflow-hidden mb-6">
          <Image
            src={challenge?.image}
            alt={challenge.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-2xl font-bold">{challenge.title}</h1>
          </div>
        </div>

        <p className="text-gray-400 mb-8">{challenge.description}</p>

        {isCompleted ? (
          <div className="text-center mt-8">
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

            <h2 className="text-2xl font-bold mb-3">Challenge Completed!</h2>
            <p className="text-gray-400 mb-8">
              Great job! You've completed this challenge.
            </p>

            <button
              onClick={() => router.push("/challenges")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
            >
              Back to Challenges
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-12">
              <div className="text-5xl font-bold mb-2">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <p className="text-gray-400">
                {isRunning ? "Challenge in progress..." : "Ready to start?"}
              </p>
            </div>

            {!isRunning && (
              <button
                onClick={startTimer}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all"
              >
                Start Challenge
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
