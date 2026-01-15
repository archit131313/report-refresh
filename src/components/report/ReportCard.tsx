import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ReportCardProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

const ReportCard = ({ id, title, subtitle, icon: Icon, children, className }: ReportCardProps) => {
  return (
    <section
      id={id}
      className={cn(
        "report-section bg-card rounded-xl border border-border shadow-card overflow-hidden transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="bg-gradient-to-r from-muted/50 to-transparent border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
};

export default ReportCard;
