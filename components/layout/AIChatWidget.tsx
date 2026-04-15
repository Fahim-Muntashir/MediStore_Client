"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  parts: { text: string }[];
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", parts: [{ text: "Hello! I'm MediBot. How can I help you today? I can find medicines, health products, or assist with your orders." }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage("");
    setMessages(prev => [...prev, { role: "user", parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: msg.parts
      }));

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${baseUrl}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: history.slice(-6) }),
      });

      if (!res.ok) throw new Error("Failed to connect to AI service");

      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: "bot", parts: [{ text: data.data }] }]);
      } else {
        throw new Error(data.message || "AI service returned an error");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "bot", parts: [{ text: "I'm having trouble connecting to my database. Please check your connection or try again in a moment." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl bg-card/95"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">MediBot AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] opacity-80">Always active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setIsMinimized(true)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                        : "bg-secondary/50 text-foreground rounded-tl-none border shadow-sm"
                    )}
                  >
                    {msg.parts[0].text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.role === "user" ? "You" : "MediBot"}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="bg-secondary/50 px-4 py-3 rounded-2xl rounded-tl-none border flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">MediBot is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t bg-secondary/10">
              <div className="relative">
                <Input
                  placeholder="Ask me anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="pr-12 rounded-xl border-none bg-background shadow-inner h-12"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-2 flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                Powered by MediStore • Always here to help
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className={cn(
            "h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
            isOpen && "rotate-0 transform",
            !isOpen ? "bg-primary scale-100" : "bg-primary/20 backdrop-blur-md border border-primary/20"
          )}
        >
          {isOpen ? (
            <Sparkles className="h-7 w-7 text-primary animate-pulse" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}

          {/* Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-background animate-bounce">
              1
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
