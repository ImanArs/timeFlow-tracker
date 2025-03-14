"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Award, Zap } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Track Your Time Visually",
      description: "Watch the ball drop as your time counts down, making time management fun and engaging.",
      icon: <Clock size={48} />,
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Complete Challenges",
      description: "Boost your productivity with timed challenges that help you build better habits.",
      icon: <Award size={48} />,
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Customize Your Timers",
      description: "Create and save your own custom timers for different activities and tasks.",
      icon: <Zap size={48} />,
      color: "from-blue-500 to-pink-500",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem("onboardingCompleted", "true")
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md flex flex-col items-center"
          >
            <div className="relative mb-12">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${steps[currentStep].color} flex items-center justify-center`}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {steps[currentStep].icon}
                </motion.div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br opacity-30 blur-xl -z-10 scale-150" />
            </div>

            <h1 className="text-2xl font-bold text-center mb-3">{steps[currentStep].title}</h1>
            <p className="text-gray-400 text-center mb-12">{steps[currentStep].description}</p>

            <div className="flex gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-purple-500" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all"
        >
          {currentStep < steps.length - 1 ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  )
}

