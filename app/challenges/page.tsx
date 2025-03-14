"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Dumbbell, Coffee, Brain, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PieChart } from "react-minimal-pie-chart";

import BottomNavigation from "@/components/bottom-navigation";

type Challenge = {
  id: string;
  title: string;
  description: string;
  minutes: number;
  icon: React.ReactNode;
  image: string;
};

export const challenges: Challenge[] = [
  {
    id: "read",
    title: "Read a Book",
    description: "Take 10 minutes to read something interesting",
    minutes: 10,
    icon: <BookOpen size={20} />,
    image:
      "https://media.istockphoto.com/id/1957612313/photo/teenage-girl-sitting-on-windowsill-and-reading-a-book.jpg?s=612x612&w=0&k=20&c=5ffcOPYEmdP_r0yr0gPlb_nuVdipEdgG_SrtaeW_AIE=",
  },
  {
    id: "workout",
    title: "Quick Workout",
    description: "Do a 5-minute fitness routine",
    minutes: 5,
    icon: <Dumbbell size={20} />,
    image:
      "https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_403,c_limit/3ec2c4da-01c8-422f-9f2c-0d8584efb061/the-quick-ab-workout-trainers-love.jpg",
  },
  {
    id: "meditate",
    title: "Mindful Meditation",
    description: "Clear your mind with a short meditation",
    minutes: 3,
    icon: <Brain size={20} />,
    image:
      "https://www.verywellmind.com/thmb/lmjACRUlHuZcHijdfo5dYplWQro=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-539661087-58d2e5e65f9b5846830df9aa.jpg",
  },
  {
    id: "break",
    title: "Coffee Break",
    description: "Take a short break to recharge",
    minutes: 5,
    icon: <Coffee size={20} />,
    image:
      "https://cdn.intuition.us/wp-content/uploads/2021/06/16042434/Coffee-header.jpg",
  },
  {
    id: "focus",
    title: "Deep Focus",
    description: "Work on a task with complete focus",
    minutes: 15,
    icon: <Brain size={20} />,
    image:
      "https://media.istockphoto.com/id/635978124/photo/learning-the-ropes-of-his-industry-through-first-hand-experience.jpg?s=612x612&w=0&k=20&c=vWE7YTrg90YG5_kKRzJEt8nzUBwVtpl5_dw9uUSuAjs=",
  },
];

export default function ChallengesPage() {
  const router = useRouter();
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  useEffect(() => {
    // Load completed challenges from localStorage
    const saved = localStorage.getItem("completedChallenges");
    if (saved) {
      setCompletedChallenges(JSON.parse(saved));
    }
  }, []);

  const completedCount = completedChallenges.length;
  const totalCount = challenges.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white pb-16">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold">Challenges</h1>
      </header>

      <main className="flex-1 p-6 pt-0">
        <div className="bg-gray-900 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 mr-4">
              <PieChart
                data={[{ value: completionPercentage, color: "#9333ea" }]}
                totalValue={100}
                lineWidth={15}
                rounded
                background="#1f2937"
                animate
                label={({ dataEntry }) => `${dataEntry.value}%`}
                labelStyle={{
                  fontSize: "22px",
                  fontFamily: "sans-serif",
                  fill: "#fff",
                }}
                labelPosition={0}
              />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-1">Your Progress</h2>
              <p className="text-gray-400 text-sm">
                {completedCount} of {totalCount} challenges completed
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-gray-900 rounded-xl overflow-hidden"
            >
              <div className="relative h-32">
                <Image
                  src={challenge.image || "/placeholder.svg"}
                  alt={challenge.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center mr-2">
                    {challenge.icon}
                  </div>
                  <h3 className="text-lg font-medium">{challenge.title}</h3>
                  {completedChallenges.includes(challenge.id) && (
                    <div className="ml-auto w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
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
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-400">
                    {challenge.minutes} min
                  </span>
                  <button
                    onClick={() => router.push(`/challenges/${challenge.id}`)}
                    className="flex items-center text-sm text-white bg-purple-600 px-3 py-1 rounded-full"
                  >
                    Start <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNavigation activeTab="challenges" />
    </div>
  );
}
