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
    default: "bg-gradient-to-br from-card to-muted/20 border-border/50",
    highlight: "bg-gradient-to-br from-amber-50 to-yellow-50/50 border-amber-200/50",
    success: "bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/50",
    warning: "bg-gradient-to-br from-yellow-50 to-amber-50/50 border-yellow-200/50",
    danger: "bg-gradient-to-br from-red-50 to-pink-50/50 border-red-200/50",
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
            "p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
            variantStyles[metric.variant || "default"]
          )}
        >
          <p className="text-3xl font-bold text-foreground mb-1 tracking-tight">{metric.value}</p>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryMetrics;
