"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, Award, Settings, Home } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const router = useRouter()
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (onboardingCompleted) {
      setHasSeenOnboarding(true)
    } else {
      router.push("/onboarding")
    }
  }, [router])

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <main className="flex-1 flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-md flex flex-col items-center mt-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Welcome to TimeDrop
          </h1>
          <p className="text-gray-400 mt-2 mb-12">Track your time visually</p>

          <div className="relative w-full h-64 flex items-center justify-center mb-12">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 shadow-lg shadow-purple-900/30"
              animate={{
                y: [0, 0], // Initially static
              }}
            />
          </div>

          <button
            onClick={() => router.push("/timer-select")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all"
          >
            Start Timer
          </button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

function BottomNavigation() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")

  const handleNavigation = (path: string, tab: string) => {
    setActiveTab(tab)
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 rounded-t-xl shadow-lg">
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        <NavItem
          icon={<Home size={24} />}
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => handleNavigation("/", "home")}
        />
        <NavItem
          icon={<Clock size={24} />}
          label="Timers"
          isActive={activeTab === "timers"}
          onClick={() => handleNavigation("/timers", "timers")}
        />
        <NavItem
          icon={<Award size={24} />}
          label="Challenges"
          isActive={activeTab === "challenges"}
          onClick={() => handleNavigation("/challenges", "challenges")}
        />
        <NavItem
          icon={<Settings size={24} />}
          label="Settings"
          isActive={activeTab === "settings"}
          onClick={() => handleNavigation("/settings", "settings")}
        />
      </div>
    </div>
  )
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-16 relative">
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all",
          isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "text-gray-500",
        )}
      >
        {icon}
      </div>
      <span className={cn("text-xs mt-1", isActive ? "text-white" : "text-gray-500")}>{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-purple-500"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
}

