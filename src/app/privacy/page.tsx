'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { TopBar } from '@/components/topbar/top-bar'
import { MainSidebar } from '@/components/sidebar/main-sidebar'

export default function PrivacyPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
        <MainSidebar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="p-6 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
              <p className="mb-4">
                At WebSec GPT, your privacy is our priority. This Privacy Policy describes how we collect, use, and protect your information when you use our AI-driven platform.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Authentication Data:</strong> Your email address and login credentials via Supabase.</li>
                <li><strong>Chat Content:</strong> Messages you send and receive from the AI assistant. Stored temporarily up to 24 hours.</li>
                <li><strong>Uploaded Files:</strong> Files are processed only for the intended purpose, not stored long-term.</li>
                <li><strong>Technical Data:</strong> Device info, IP address (for security/DDoS prevention), and browser type.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Authenticate users and secure access to the platform</li>
                <li>Provide AI chat functionality and coding assistance</li>
                <li>Improve platform performance and user experience</li>
                <li>Detect and prevent abuse or misuse of the service</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">3. Chat Storage and Auto-Deletion</h2>
              <p className="mb-4">
                WebSec GPT stores chats only for 24 hours, after which they are auto-deleted via a scheduled task.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Protection</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Data is securely stored using Supabase and encrypted during transmission.</li>
                <li>We do not sell, rent, or share your data with advertisers or third parties.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">5. User Rights</h2>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Request deletion of your account or data anytime.</li>
                <li>Opt out of email notifications (if enabled).</li>
                <li>Contact us at <a href="mailto:websecai@protonmail.com" className="text-blue-600 underline">websecai@protonmail.com</a></li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">6. Legal Compliance</h2>
              <p>
                WebSec GPT complies with the Information Technology Act (India) and adheres to GDPR principles where applicable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
