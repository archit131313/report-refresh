import { LucideIcon, TrendingUp, TrendingDown, Clock, DollarSign, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricItem {
  value: string | number;
  label: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
    isPositive?: boolean;
  };
  variant?: "default" | "highlight" | "success" | "warning" | "danger" | "primary";
}

interface SummaryMetricsProps {
  metrics: MetricItem[];
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

const SummaryMetrics = ({ metrics, columns = 3, className }: SummaryMetricsProps) => {
  const variantStyles = {
    default: "bg-gradient-to-br from-card to-muted/20 border-border/50",
    highlight: "bg-gradient-to-br from-amber-50 to-yellow-50/50 border-amber-200/50",
    success: "bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/50",
    warning: "bg-gradient-to-br from-yellow-50 to-amber-50/50 border-yellow-200/50",
    danger: "bg-gradient-to-br from-red-50 to-pink-50/50 border-red-200/50",
    primary: "bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200/50",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    highlight: "bg-amber-100 text-amber-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    danger: "bg-red-100 text-red-600",
    primary: "bg-blue-100 text-blue-600",
  };

  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  };

  return (
    <div className={cn(`grid grid-cols-1 ${columnClasses[columns]} gap-4`, className)}>
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const variant = metric.variant || "default";
        
        return (
          <div
            key={index}
            className={cn(
              "p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
              variantStyles[variant]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-3xl font-bold text-foreground mb-1 tracking-tight">{metric.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                {metric.subtext && (
                  <p className="text-xs text-muted-foreground/70 mt-1">{metric.subtext}</p>
                )}
              </div>
              {Icon && (
                <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
            </div>
            
            {metric.trend && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  metric.trend.isPositive ? "text-green-600" : metric.trend.direction === "down" ? "text-red-600" : "text-muted-foreground"
                )}>
                  {metric.trend.direction === "up" && <TrendingUp className="w-3 h-3" />}
                  {metric.trend.direction === "down" && <TrendingDown className="w-3 h-3" />}
                  <span>{metric.trend.value}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SummaryMetrics;
