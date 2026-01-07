"use client"

import * as React from "react"
import { Moon, Sun, Laptop, Check } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const getTextClass = (mode: string) =>
    theme === mode
      ? "bg-gradient-to-r from-primary via-purple-500 to-red-500 text-transparent bg-clip-text font-bold"
      : "text-foreground"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent shadow-none outline-none border-none"
>
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="focus:bg-transparent active:bg-transparent"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span className={getTextClass("light")}>Light</span>
          {theme === "light" && <Check className="ml-auto h-4 w-4 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="focus:bg-transparent active:bg-transparent"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span className={getTextClass("dark")}>Dark</span>
          {theme === "dark" && <Check className="ml-auto h-4 w-4 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="focus:bg-transparent active:bg-transparent"
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span className={getTextClass("system")}>System</span>
          {theme === "system" && <Check className="ml-auto h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
