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

const languages = [
  { code: "en", label: "English", greeting: "Hello! I'm iZITO, your school assistant. How can I help you today?" },
  { code: "os", label: "Oshiwambo", greeting: "Wa lalapo! Ame oiZITO, omukwateli gwoye gwoskola. Onda hala okukwafela ngahelipi nena?" },
  { code: "af", label: "Afrikaans", greeting: "Hallo! Ek is iZITO, jou skoolassistent. Hoe kan ek jou vandag help?" },
  { code: "hz", label: "Herero", greeting: "Tjike! Ami iZITO, omuvatere woye woskora. Matu kupa vi nambano?" },
  { code: "de", label: "German", greeting: "Hallo! Ich bin iZITO, dein Schulassistent. Wie kann ich dir heute helfen?" },
];

const quickReplies = [
  "Check attendance",
  "View grades",
  "School calendar",
  "Contact teacher",
  "Fee balance",
];

export function IZitoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // Effect to handle initial greeting 
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timestamp = new Date();
      setMessages([
        {
          id: "greeting",
          content: currentLang.greeting,
          sender: "bot",
          timestamp: timestamp,
        },
      ]);
    }
  }, [isOpen, currentLang.greeting, messages.length]);

  // Effect to handle auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Main Send Handler 
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userQuery = input; // Capture input before clearing
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: crypto.randomUUID(),
        content: getBotResponse(userQuery, language),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getBotResponse = (query, lang) => {
    const responses = {
      attendance: {
        en: "Your child's attendance this month is 95%. They were absent on March 5th due to illness.",
        os: "Okwaatelwa kwomwana woye omwedhi nguka o 95%. Okwa li inaanda po melilongo 5 omolwombulwe.",
        af: "Jou kind se bywoning hierdie maand is 95%. Hulle was afwesig op 5 Maart weens siekte.",
        hz: "Onduungiro yomuatje woye omueze mbui i ri po 95%. Eye ka ri po ngetji ya ri 5 ya Maart mena rounane.",
        de: "Die Anwesenheit Ihres Kindes in diesem Monat beträgt 95%. Am 5. März fehlte es krankheitsbedingt.",
      },
      grades: {
        en: "Your child's latest grades: Mathematics - 78%, English - 85%, Science - 72%.",
        os: "Omanumero gomwana woye: Mathematics - 78%, English - 85%, Science - 72%.",
        af: "Jou kind se jongste punte: Wiskunde - 78%, Engels - 85%, Wetenskap - 72%.",
        hz: "Omanomora yomuatje woye: Mathematics - 78%, English - 85%, Science - 72%.",
        de: "Die neuesten Noten Ihres Kindes: Mathematik - 78%, Englisch - 85%, Naturwissenschaften - 72%.",
      },
      default: {
        en: `I understand you're asking about ${query}. Let me connect you with the right department.`,
        os: `Onda uvite oto pula kombinga ya ${query}. Ndi ku kwafele nokapangelo ka li nawa.`,
        af: `Ek verstaan jy vra oor ${query}. Laat my jou met die regte departement verbind.`,
        hz: `Mbe munu kutja mo pura ohunga na ${query}. Ndi ku hake neshinyo ndi matu ku vatere nawa.`,
        de: `Ich verstehe, dass Sie nach ${query} fragen. Ich verbinde Sie mit der richtigen Abteilung.`,
      },
    };

    const queryLower = query.toLowerCase();
    if (queryLower.includes("attendance")) return responses.attendance[lang] || responses.attendance.en;
    if (queryLower.includes("grade")) return responses.grades[lang] || responses.grades.en;
    return responses.default[lang] || responses.default.en;
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    // Use a small timeout to allow state to update or call send directly
    setTimeout(() => handleSend(), 10);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all z-50",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50 transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-blue-700 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">iZITO Assistant</h3>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] opacity-80">Always Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto h-7 bg-white/20 border-0 text-white text-[10px] focus:ring-0">
                <Globe className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-xs">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Message Area */}
        <ScrollArea className="flex-1 p-4 bg-gray-50" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] p-3 rounded-2xl text-sm shadow-sm",
                  m.sender === "user" 
                    ? "bg-blue-700 text-white ml-auto rounded-tr-none" 
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                )}
              >
                {m.content}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 text-xs italic ml-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>iZITO is typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-none">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="shrink-0 px-3 py-1.5 text-[10px] rounded-full bg-white border border-gray-200 hover:border-blue-700 hover:text-blue-700 transition-all shadow-sm"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about grades or attendance..."
              className="flex-1 text-sm bg-gray-50 focus-visible:ring-blue-700"
            />
            <Button type="submit" size="icon" className="bg-blue-700 hover:bg-blue-800 shrink-0 shadow-md">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}