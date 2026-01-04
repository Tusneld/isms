import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessState({ 
  title = "Success!", 
  message = "Action completed successfully.", 
  onAction, 
  actionLabel = "Continue" 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="mb-4 rounded-full bg-green-50 p-3">
        <CheckCircle2 className="h-12 w-12 text-[hsl(145,55%,38%)]" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        {message}
      </p>
      <Button 
        variant="gradient-success" 
        size="lg" 
        onClick={onAction}
        className="w-full sm:w-auto px-12"
      >
        {actionLabel}
      </Button>
    </div>
  );
}