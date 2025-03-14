"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="p-4 border-b border-gray-800 flex items-center">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Privacy Policy</h1>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              This Privacy Policy describes how your personal information is collected, used, and shared when you use
              our TimeDrop application.
            </p>

            <h3 className="text-lg font-medium text-white">Information We Collect</h3>
            <p>
              TimeDrop is designed to work locally on your device. We collect minimal information necessary for the app
              to function:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Timer preferences and settings</li>
              <li>Challenge completion status</li>
              <li>Custom timer configurations</li>
            </ul>

            <h3 className="text-lg font-medium text-white">How We Use Your Information</h3>
            <p>
              All data is stored locally on your device using localStorage. We do not transmit your data to external
              servers.
            </p>

            <h3 className="text-lg font-medium text-white">Changes</h3>
            <p>
              We may update this privacy policy from time to time to reflect changes to our practices or for other
              operational, legal, or regulatory reasons.
            </p>

            <h3 className="text-lg font-medium text-white">Contact Us</h3>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a
              complaint, please contact us by e-mail at support@timedrop-app.example.com.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

