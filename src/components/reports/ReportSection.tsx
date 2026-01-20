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
    default: "bg-card border-border/50 shadow-sm hover:shadow-md",
    action: "bg-card border-l-4 border-l-destructive border-t border-r border-b border-border/50 shadow-sm",
    highlight: "bg-primary/5 border-primary/20 shadow-sm",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-shadow duration-300",
        variantStyles[variant],
        className
      )}
    >
      <div className="px-6 py-5 border-b border-border/50 bg-gradient-to-r from-muted/40 to-transparent">
        <div className="flex items-center gap-4">
          {Icon && (
            typeof Icon === "string" ? (
              <span className="text-xl">{Icon}</span>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )
          )}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default ReportSection;
