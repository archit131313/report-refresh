import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricItem {
  value: string | number;
  label: string;
  variant?: "default" | "highlight" | "success" | "warning" | "danger";
}

interface SummaryMetricsProps {
  metrics: MetricItem[];
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

const SummaryMetrics = ({ metrics, columns = 3, className }: SummaryMetricsProps) => {
  const variantStyles = {
    default: "bg-card border-border",
    highlight: "bg-amber-50 border-amber-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    danger: "bg-red-50 border-red-200",
  };

  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  };

  return (
    <div className={cn(`grid grid-cols-1 ${columnClasses[columns]} gap-4`, className)}>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={cn(
            "p-5 rounded-xl border transition-all hover:shadow-md",
            variantStyles[metric.variant || "default"]
          )}
        >
          <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryMetrics;
