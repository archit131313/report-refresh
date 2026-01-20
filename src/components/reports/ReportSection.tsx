import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportSectionProps {
  icon?: LucideIcon | string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "action" | "highlight";
}

const ReportSection = ({
  icon: Icon,
  title,
  description,
  children,
  className,
  variant = "default",
}: ReportSectionProps) => {
  const variantStyles = {
    default: "bg-card border-border",
    action: "bg-card border-l-4 border-l-destructive border-t border-r border-b border-border",
    highlight: "bg-primary/5 border-primary/20",
  };

  return (
    <div
      className={cn(
        "rounded-xl border shadow-sm overflow-hidden",
        variantStyles[variant],
        className
      )}
    >
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          {Icon && (
            typeof Icon === "string" ? (
              <span className="text-xl">{Icon}</span>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )
          )}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default ReportSection;
