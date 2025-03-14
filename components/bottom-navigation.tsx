"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Clock, Award, Settings, Home } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function BottomNavigation({ activeTab = "home" }: { activeTab?: string }) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 rounded-t-xl shadow-lg">
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        <NavItem
          icon={<Home size={24} />}
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => handleNavigation("/")}
        />
        <NavItem
          icon={<Clock size={24} />}
          label="Timers"
          isActive={activeTab === "timers"}
          onClick={() => handleNavigation("/timers")}
        />
        <NavItem
          icon={<Award size={24} />}
          label="Challenges"
          isActive={activeTab === "challenges"}
          onClick={() => handleNavigation("/challenges")}
        />
        <NavItem
          icon={<Settings size={24} />}
          label="Settings"
          isActive={activeTab === "settings"}
          onClick={() => handleNavigation("/settings")}
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

