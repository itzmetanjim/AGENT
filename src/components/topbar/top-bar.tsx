"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export function TopBar() {
  return (
    <header className="flex items-center justify-between p-2 md:p-4 border-b shrink-0 sticky top-0  h-14">
      <SidebarTrigger className="md:hidden" />
      <div className="ml-auto pr-0">
        <ThemeToggle />
      </div>
    </header>
  )
}
