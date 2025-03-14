"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, Plus } from "lucide-react"
import { BottomSheet } from "react-spring-bottom-sheet"
import "react-spring-bottom-sheet/dist/style.css"

import { cn } from "@/lib/utils"
import BottomNavigation from "@/components/bottom-navigation"

export default function TimerSelectPage() {
  const router = useRouter()
  const [customTimers, setCustomTimers] = useState<number[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    // Load custom timers from localStorage
    const savedTimers = localStorage.getItem("customTimers")
    if (savedTimers) {
      setCustomTimers(JSON.parse(savedTimers))
    }
  }, [])

  const handleTimerSelect = (minutes: number) => {
    // Save selected time and navigate to timer page
    localStorage.setItem("selectedTimer", minutes.toString())
    router.push("/timer")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white pb-16">
      <main className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-8">Select Timer</h1>

        <div className="w-full max-w-md grid grid-cols-3 gap-3 mb-8">
          <TimerOption minutes={2} onClick={() => handleTimerSelect(2)} />
          <TimerOption minutes={5} onClick={() => handleTimerSelect(5)} />
          <TimerOption minutes={10} onClick={() => handleTimerSelect(10)} />
        </div>

        {customTimers.length > 0 ? (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-medium text-gray-300 mb-3">Your Custom Timers</h2>
            <div className="grid grid-cols-3 gap-3">
              {customTimers.map((minutes, index) => (
                <TimerOption key={index} minutes={minutes} onClick={() => handleTimerSelect(minutes)} isCustom />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-4">
            <p>You don't have any custom timers yet</p>
          </div>
        )}

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 px-6 py-2 rounded-full bg-gray-800 text-white font-medium flex items-center gap-2 hover:bg-gray-700 transition-colors"
        >
          <Plus size={18} />
          Create Custom Timer
        </button>
      </main>

      <BottomNavigation activeTab="home" />

      {isCreateModalOpen && (
        <CreateTimerModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(minutes) => {
            const newTimers = [...customTimers, minutes]
            setCustomTimers(newTimers)
            localStorage.setItem("customTimers", JSON.stringify(newTimers))
            setIsCreateModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

function TimerOption({
  minutes,
  onClick,
  isCustom = false,
}: {
  minutes: number
  onClick: () => void
  isCustom?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors",
        isCustom && "border border-purple-800",
      )}
    >
      <Clock className="text-purple-400 mb-2" size={24} />
      <span className="text-lg font-medium">{minutes} min</span>
    </button>
  )
}

function CreateTimerModal({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (minutes: number) => void
}) {
  const [selectedMinutes, setSelectedMinutes] = useState(5)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i + 1)

  return (
    <BottomSheet
      open={true}
      onDismiss={onClose}
      snapPoints={({ maxHeight }) => [maxHeight * 0.6]}
      className="bg-gray-900 text-white"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-center">Create Custom Timer</h2>

        <div className="relative h-48 overflow-hidden mb-8">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gray-900 via-transparent to-gray-900 z-10" />

          <div className="h-full overflow-auto snap-y snap-mandatory scrollbar-hide">
            <div className="h-[calc(50%-24px)]" />
            {minuteOptions.map((minutes) => (
              <div
                key={minutes}
                className={cn(
                  "h-12 flex items-center justify-center snap-center",
                  selectedMinutes === minutes ? "text-xl font-bold text-white" : "text-gray-500",
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
          onClick={() => onSave(selectedMinutes)}
          className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
        >
          Save Timer
        </button>
      </div>
    </BottomSheet>
  )
}

