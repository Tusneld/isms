import { AppSidebar } from "./AppSidebar";
import { IZitoChatbot } from "@/components/chatbot/IZitoChatbot";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * AppLayout Component
 * @param {ReactNode} children - The page content to render
 * @param {string} userRole - The role of the logged-in user
 * @param {string} userName - The name of the logged-in user
 */
export function AppLayout({ children, userRole, userName }) {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar remains fixed on the left */}
        <AppSidebar 
          userRole={userRole} 
          user={{ role: userRole, name: userName }} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto relative">
          <div className="container mx-auto p-6 animate-in fade-in duration-500">
            {children}
          </div>
        </main>

        {/* Floating Chatbot Assistant */}
        <IZitoChatbot />
      </div>
    </TooltipProvider>
  );
}