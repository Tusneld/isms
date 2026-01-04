/**
 * IZitoChatbot.jsx
 * 
 * Multilingual school assistant chatbot for iSMS (Namibia School Management System)
 * 
 * Features:
 * - Floating chat bubble to open/close the chatbot
 * - Supports English, Oshiwambo, and Afrikaans
 * - Greeting message in selected language
 * - Quick reply buttons for common queries
 * - Simulated bot responses with typing indicator
 * - Auto-scroll to latest message
 * - Responsive and accessible design
 * 
 * Built with React, shadcn/ui, lucide-react, and Tailwind CSS.
 */

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Supported languages with localized greetings
const languages = [
  {
    code: "en",
    label: "English",
    greeting: "Hello! I'm iZITO, your school assistant. How can I help you today?",
  },
  {
    code: "os",
    label: "Oshiwambo",
    greeting: "Wa lalapo! Ame oiZITO, omukwateli gwoye gwoskola. Onda hala okukwafela ngahelipi nena?",
  },
  {
    code: "af",
    label: "Afrikaans",
    greeting: "Hallo! Ek is iZITO, jou skoolassistent. Hoe kan ek jou vandag help?",
  },
];

// Predefined quick reply options for common queries
const quickReplies = [
  "Check attendance",
  "View grades",
  "School calendar",
  "Contact teacher",
  "Fee balance",
];

export function IZitoChatbot() {
  // State management
  const [isOpen, setIsOpen] = useState(false); // Controls chat window visibility
  const [language, setLanguage] = useState("en"); // Selected language
  const [messages, setMessages] = useState([]); // Array of chat messages
  const [input, setInput] = useState(""); // Current input field value
  const [isTyping, setIsTyping] = useState(false); // Bot typing indicator
  const scrollRef = useRef(null); // For auto-scrolling to bottom

  // Get current language config
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // Show greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage = {
        id: "greeting",
        content: currentLang.greeting,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen, currentLang.greeting]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending user message
  const handleSend = () => {
    if (!input.trim()) return;

    // Generate timestamp and ID safely inside handler (not during render)
    const timestamp = new Date();
    const id = timestamp.getTime().toString();

    const userMessage = {
      id,
      content: input.trim(),
      sender: "user",
      timestamp,
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botTimestamp = new Date();
      const botMessage = {
        id: (parseInt(id) + 1).toString(),
        content: getBotResponse(input.trim(), language),
        sender: "bot",
        timestamp: botTimestamp,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    // eslint-disable-next-line react-hooks/purity
    }, 1000 + Math.random() * 1000);
  };

  // Generate appropriate bot response based on query and language
  const getBotResponse = (query, lang) => {
    const responses = {
      attendance: {
        en: "Your child's attendance this month is 95%. He/She were absent on March 5th due to illness.",
        os: "Okanona koye ohakeya kosiskola nawa lela omwedhi nguka o95%. Okwa li afaula momasiku 5 gaMalitsa omoluwehame.",
        af: "Jou kind se bywoning hierdie maand is 95%. Hulle was afwesig op 5 Maart weens siekte.",
      },
      grades: {
        en: "Your child's latest grades: Mathematics - 78%, English - 85%, Science - 72%.",
        os: "Okapita nawa kena : Mathematics - 78%, English - 85%, Science - 72%.",
        af: "Jou kind se jongste punte: Wiskunde - 78%, Engels - 85%, Wetenskap - 72%.",
      },
      default: {
        en: "I understand you're asking about '" + query + "'. Let me connect you with the right department for more detailed assistance.",
        os: "Ondu uviteko oto pula kombinga yo '" + query + "'. Ndi ku kwafele nokapangelo ka li nawa.",
        af: "Ek verstaan jy vra oor '" + query + "'. Laat my jou met die regte departement verbind vir meer gedetailleerde hulp.",
      },
    };

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("attendance") || lowerQuery.includes("present")) {
      return responses.attendance[lang] || responses.attendance.en;
    }
    if (lowerQuery.includes("grade") || lowerQuery.includes("mark") || lowerQuery.includes("result")) {
      return responses.grades[lang] || responses.grades.en;
    }

    return responses.default[lang] || responses.default.en;
  };

  // Handle quick reply button click
  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "chatbot-bubble fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open iZITO chat assistant"
      >
        <MessageSquare className="w-6 h-6 text-secondary-foreground" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[360px] h-[520px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden z-50 transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">iZITO Assistant</h3>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto h-8 bg-primary-foreground/10 border-0 text-primary-foreground">
                <Globe className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "chat-message animate-fade-in max-w-[85%]",
                  message.sender === "user" ? "chat-message-user ml-auto" : "chat-message-bot mr-auto"
                )}
              >
                {message.content}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message chat-message-bot flex items-center gap-2 max-w-[85%]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="shrink-0 px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              autoFocus={isOpen}
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}