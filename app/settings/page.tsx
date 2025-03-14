"use client"

import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

import BottomNavigation from "@/components/bottom-navigation"

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white pb-16">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>

      <main className="flex-1 p-6 pt-0">
        <div className="grid gap-4">
          <button
            onClick={() => router.push("/settings/privacy-policy")}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-900"
          >
            <span className="font-medium">Privacy Policy</span>
            <ChevronRight size={20} className="text-gray-500" />
          </button>

          <button
            onClick={() => router.push("/settings/terms")}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-900"
          >
            <span className="font-medium">Terms of Use</span>
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        </div>
      </main>

      <BottomNavigation activeTab="settings" />
    </div>
  )
}

