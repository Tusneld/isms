import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const variantStyles = {
  default: "border-border",
  primary: "border-l-4 border-l-primary",
  success: "border-l-4 border-l-accent",
  warning: "border-l-4 border-l-secondary",
  danger: "border-l-4 border-l-destructive",
};

const iconBgStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-accent/10 text-accent",
  warning: "bg-secondary/10 text-secondary",
  danger: "bg-destructive/10 text-destructive",
};

/**
 * StatCard Component
 * @param {string} title - The label for the statistic
 * @param {string|number} value - The main number to display
 * @param {ReactNode} icon - Lucide icon component
 * @param {Object} trend - Optional: { value: number, label: string }
 * @param {string} variant - default | primary | success | warning | danger
 * @param {string} className - Additional CSS classes
 */
export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  variant = "default",
  className 
}) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="w-3 h-3" />;
    if (trend.value < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.value > 0) return "text-accent";
    if (trend.value < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className={cn(
      "p-6 rounded-xl border bg-card text-card-foreground shadow-sm", // standard styles if 'stat-card' class isn't in CSS
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          
          {trend && (
            <div className={cn("flex items-center gap-1 mt-2 text-xs", getTrendColor())}>
              {getTrendIcon()}
              <span className="font-medium">{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          iconBgStyles[variant]
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}