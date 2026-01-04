import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  MapPin,
  School,
  GraduationCap,
  Users,
  User,
} from "lucide-react";

const roleConfig = {
  super_admin: {
    icon: Shield,
    label: "Super Admin",
    className: "bg-destructive text-destructive-foreground",
  },
  regional_admin: {
    icon: MapPin,
    label: "Regional Admin",
    className: "bg-primary text-primary-foreground",
  },
  school_admin: {
    icon: School,
    label: "School Admin",
    className: "bg-accent text-accent-foreground",
  },
  teacher: {
    icon: GraduationCap,
    label: "Teacher",
    className: "bg-secondary text-secondary-foreground",
  },
  parent: {
    icon: Users,
    label: "Parent",
    className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30",
  },
  learner: {
    icon: User,
    label: "Learner",
    className: "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30",
  },
};

export function RoleBadge({ role, showIcon = true, size = "default", className }) {
  const config = roleConfig[role] || roleConfig.learner; // fallback
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        config.className,
        size === "sm" && "text-xs px-2 py-0.5",
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            "mr-1",
            size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"
          )}
        />
      )}
      {config.label}
    </Badge>
  );
}