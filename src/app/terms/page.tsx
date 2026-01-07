'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { TopBar } from '@/components/topbar/top-bar'
import { MainSidebar } from '@/components/sidebar/main-sidebar'

export default function TermsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
        <MainSidebar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="p-6 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
              <p className="mb-4">
                Welcome to WebSec GPT, an AI-powered chatbot and code generation platform by WebSec AI. By using our services, you agree to the following terms:
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Platform</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Use the service for personal, academic, or professional purposes only.</li>
                <li>Do not generate or distribute harmful, illegal, or offensive content.</li>
                <li>Do not abuse the system or attempt to overload servers (e.g., via DDoS or spam).</li>
                <li>Do not share credentials or access unauthorized areas.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>You retain rights to any content you input or generate via WebSec GPT.</li>
                <li>WebSec GPT’s backend, UI, and system architecture belong to WebSec AI and may not be copied or redistributed.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">3. AI Limitations</h2>
              <p className="mb-4">
                WebSec GPT is powered by machine learning. Responses are for informational and educational purposes only — not legal, financial, or medical advice.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>We may suspend/terminate accounts for violating terms.</li>
                <li>Abuse, unauthorized access, or misuse will result in action.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>WebSec GPT is provided "as is".</li>
                <li>No liability for misuse, user-generated content, or downtime/data loss.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to Terms</h2>
              <p>
                We may update these Terms & Conditions at any time. Notifications will be sent via email or on-platform notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
