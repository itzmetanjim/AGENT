"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  MessageSquare,
  FileText,
  ShieldCheck,
  History,
  LayoutGrid,
  Bot,
  Cpu,
  User,
  LogOut,
} from "lucide-react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

const chatHistory = [
  { id: 1, title: "Future stock investment tips" },
  { id: 2, title: "London stock exchanges" },
  { id: 3, title: "Top 10 crypto coins" },
  { id: 4, title: "CoinDCX bounty program" },
  { id: 5, title: "Domain flipping Taxes" },
]

export function MainSidebar() {
  const [showGPTs, setShowGPTs] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    sessionStorage.clear()
    window.location.replace("/login") // force reload
  }

  useEffect(() => {
    // 🚨 Only block back button if user is not logged in
    if (!user) {
      const noCache = () => {
        if (!user) {
          window.location.replace("/login")
        }
      }

      window.history.pushState(null, "", window.location.href)
      const onPopState = () => {
        window.history.pushState(null, "", window.location.href)
        noCache()
      }
      window.addEventListener("popstate", onPopState)

      window.onpageshow = (event) => {
        if (event.persisted) noCache()
      }

      return () => window.removeEventListener("popstate", onPopState)
    }
  }, [user])

  return (
    <Sidebar className="border-r" variant="sidebar" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="p-2">
        <div className="flex flex-row items-center gap-1 w-full px-0 py-4 md:py-5">
          <img src="/brain.png" alt="Logo" className="w-10 h-10 rounded-md" />
          <h1
            onClick={() => window.location.reload()}
            className="cursor-pointer text-2xl md:text-2xl font-extrabold bg-gradient-to-r from-primary via-purple-500 to-red-500 text-transparent bg-clip-text transition hover:opacity-80 text-center whitespace-nowrap"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            WebSec GPT
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu className="mb-6">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              onClick={() => setShowGPTs(!showGPTs)}
              className="w-full justify-start font-medium text-white"
            >
              <LayoutGrid size={18} />
              <span>GPTs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {showGPTs && (
            <>
              <SidebarMenuItem className="ml-6">
                <SidebarMenuButton
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push("/stock-crypto")}
                  className="w-full justify-start font-medium text-white"
                >
                  <Cpu size={16} />
                  <span>Stock & Crypto GPT</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="ml-6">
                <SidebarMenuButton
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push("/ai-cyber")}
                  className="w-full justify-start font-medium text-white"
                >
                  <Bot size={16} />
                  <span>AI Cybersecurity GPT</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start text-muted-foreground font-normal"
            >
              <History size={16} />
              <span>Chats</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {chatHistory.map((chat) => (
            <SidebarMenuItem key={chat.id} className="mb-2">
              <SidebarMenuButton
                size="sm"
                variant="ghost"
                className="w-full justify-start font-medium text-[15px] leading-snug"
                tooltip={chat.title}
              >
                <MessageSquare size={18} className="text-muted-foreground" />
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem className="-mt-1">
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start font-normal"
              onClick={() => router.push("/privacy")}
            >
              <ShieldCheck size={16} />
              <span>Privacy Policy</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="-mt-1">
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start font-normal"
              onClick={() => router.push("/terms")}
            >
              <FileText size={16} />
              <span>Terms & Conditions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="flex flex-col items-start gap-2">
            <SidebarMenuButton
              size="sm"
              variant="ghost"
              className="w-full justify-start gap-1 font-normal bg-black px-1"
              onClick={() => setShowLogout(!showLogout)}
            >
              <Avatar className="h-7 w-7 rounded-full overflow-hidden">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url || ""}
                  alt="User profile"
                  className="rounded-full bg-gray-800 object-cover"
                />
                <AvatarFallback className="bg-gray-800">
                  <User className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>

              {user?.email && (
                <p className="text-xs text-white">{user.email}</p>
              )}
            </SidebarMenuButton>

            {showLogout && (
  <SidebarMenuButton
    size="sm"
    variant="ghost"
    className="w-full justify-start gap-1 font-normal 
               bg-gradient-to-r from-primary via-purple-500 to-red-500 
               text-white px-2 py-1 rounded-md 
               hover:opacity-90 transition"
    onClick={handleLogout}
  >
    <LogOut size={16} />
    <span>Logout</span>
  </SidebarMenuButton>
)}

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
