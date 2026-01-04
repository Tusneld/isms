import { cn } from "@/lib/utils";
import { Check, Clock, X, AlertCircle, Loader2 } from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    className: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30",
    defaultLabel: "Pending",
  },
  approved: {
    icon: Check,
    className: "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30",
    defaultLabel: "Approved",
  },
  rejected: {
    icon: X,
    className: "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30",
    defaultLabel: "Rejected",
  },
  processing: {
    icon: Loader2,
    className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30",
    defaultLabel: "Processing",
  },
  info: {
    icon: AlertCircle,
    className: "bg-muted text-muted-foreground border border-border",
    defaultLabel: "Info",
  },
};

export function StatusBadge({ status, label, className }) {
  const config = statusConfig[status] || statusConfig.info; // fallback to "info"
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon
        className={cn(
          "w-3 h-3",
          status === "processing" && "animate-spin"
        )}
      />
      {label || config.defaultLabel}
    </span>
  );
}