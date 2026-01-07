"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface Message {
  id: string
  sender: 'user' | 'ai'
  content: string
}

export function ChatMessage({
  sender,
  content,
  isAiTyping
}: Message & { isAiTyping?: boolean }) {
  const isUser = sender === 'user';

  return (
    <div
      className={cn(
        "flex items-start gap-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* AI Avatar */}
      {!isUser && (
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="p-1 rounded-full bg-gray-300 dark:bg-secondary">
            <img
              src="/brain.svg"
              alt="AI"
              className={cn(
                "w-6 h-6 transition-all",
                isAiTyping && "animate-pulse-zoom"
              )}
            />
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "rounded-2xl px-4 py-2 break-words whitespace-pre-wrap w-fit max-w-[85vw] sm:max-w-[75%]",
          isUser
            ? "text-white bg-blue-500 dark:bg-secondary dark:text-secondary-foreground rounded-br-none ml-auto"
            : "bg-blue-100 text-black dark:bg-secondary dark:text-secondary-foreground rounded-bl-none mr-auto"
        )}
      >
        {isAiTyping ? (
          <div className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-[0ms]" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-[150ms]" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-[300ms]" />
          </div>
        ) : (
          <ReactMarkdown
            className="prose dark:prose-invert prose-p:m-0 prose-headings:m-0"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="!bg-black"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={cn(
                      "bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded",
                      className
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback>
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
