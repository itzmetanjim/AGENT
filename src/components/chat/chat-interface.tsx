"use client";

import React, { useState, useRef, useEffect } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { ChatWelcome } from "./chat-welcome";
import { ChatInput } from "./chat-input";
import { ChatMessage, type Message } from "./chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type User } from "@supabase/supabase-js";

type ChatInterfaceProps = {
  user?: User | null; // ✅ Now it can receive user prop from page.tsx
};

const initialMessages: Message[] = [];

export function ChatInterface({ user }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(messages.length === 0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    if (showWelcome) setShowWelcome(false);

    const userMessage: Message = {
      id: String(Date.now()),
      sender: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsAiTyping(true);

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.tagName === "INPUT") {
          activeElement.blur();
        }
      }, 100);
    }

    setTimeout(() => {
      const aiResponse: Message = {
        id: String(Date.now() + 1),
        sender: "ai",
        content: `**WebSec GPT is typing...**`,
      };
      setMessages((prev) => [...prev, aiResponse]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.content.includes("WebSec GPT is typing...")
              ? { ...msg, content: "This is just testing" }
              : msg
          )
        );
        setIsAiTyping(false);
      }, 2000);
    }, 200);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "div[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  return (
    <SidebarInset className="flex flex-col h-full">
      {/* ✅ Show user email (optional) */}
      

      <main className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea
          className="flex-1 overflow-y-auto overscroll-none"
          ref={scrollAreaRef}
        >
          <div className="p-2 md:p-6 lg:p-8 space-y-2 max-w-4xl mx-auto pb-32">
            {showWelcome ? (
              <ChatWelcome />
            ) : (
              messages.map((message, index) => {
                const isLast = index === messages.length - 1;
                const isLatestAiMessage = isLast && message.sender === "ai";

                return (
                  <ChatMessage
                    key={message.id}
                    {...message}
                    isAiTyping={isLatestAiMessage && isAiTyping}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </main>

      <div className="fixed bottom-0 left-0 md:left-[127px] w-full z-20 p-1 md:p-1">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
        <p className="text-xs text-center text-white mt-1 hidden md:block">
          WebSec GPT can make mistakes. Check important info.
        </p>
      </div>
    </SidebarInset>
  );
}
