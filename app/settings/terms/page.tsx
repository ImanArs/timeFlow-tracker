"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
        <h1 className="text-xl font-bold">Terms of Use</h1>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Terms of Use</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              By downloading or using the TimeDrop app, these terms will automatically apply to you – you should make
              sure therefore that you read them carefully before using the app.
            </p>

            <h3 className="text-lg font-medium text-white">App Usage</h3>
            <p>
              TimeDrop is designed to help you manage your time through visual timers and challenges. You're not allowed
              to copy or modify the app, any part of the app, or our trademarks in any way.
            </p>

            <h3 className="text-lg font-medium text-white">Changes to This App</h3>
            <p>
              We may update our app from time to time. We may also wish to stop providing the app, and may terminate use
              of it at any time without giving notice of termination to you.
            </p>

            <h3 className="text-lg font-medium text-white">Changes to These Terms</h3>
            <p>
              We may update our Terms of Use from time to time. Thus, you are advised to review this page periodically
              for any changes.
            </p>

            <h3 className="text-lg font-medium text-white">Contact Us</h3>
            <p>
              If you have any questions or suggestions about our Terms of Use, do not hesitate to contact us at
              terms@timedrop-app.example.com.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

