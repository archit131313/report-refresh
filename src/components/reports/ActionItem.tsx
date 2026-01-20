import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButton {
  label: string;
  variant?: "default" | "outline" | "secondary";
  onClick?: () => void;
}

interface ActionItemProps {
  title: string;
  severity?: "critical" | "high" | "medium" | "low";
  status?: string;
  statusVariant?: "default" | "success" | "warning" | "danger";
  description?: string | ReactNode;
  issues?: string[];
  actions?: ActionButton[];
  className?: string;
}

const ActionItem = ({
  title,
  severity,
  status,
  statusVariant = "default",
  description,
  issues,
  actions,
  className,
}: ActionItemProps) => {
  const severityStyles = {
    critical: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const statusStyles = {
    default: "bg-muted text-muted-foreground",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  const borderStyles = {
    critical: "border-l-red-500",
    high: "border-l-orange-500",
    medium: "border-l-yellow-500",
    low: "border-l-blue-500",
  };

  return (
    <div
      className={cn(
        "p-5 rounded-xl border bg-card border-l-4",
        severity ? borderStyles[severity] : "border-l-primary",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {severity && (
              <Badge variant="outline" className={severityStyles[severity]}>
                {severity.toUpperCase()}
              </Badge>
            )}
          </div>
          
          {description && (
            <div className="text-sm text-muted-foreground mb-3">
              {description}
            </div>
          )}
          
          {issues && issues.length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1 mb-3">
              {issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          )}
          
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {actions.map((action, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={action.variant || "default"}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        {status && (
          <Badge className={statusStyles[statusVariant]}>
            {status}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ActionItem;
