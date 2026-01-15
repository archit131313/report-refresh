import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, string | number>[];
  highlightColumn?: string;
  compact?: boolean;
}

const DataTable = ({ columns, data, highlightColumn, compact = false }: DataTableProps) => {
  const formatValue = (value: string | number, key: string) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    if (typeof value === "string" && value.startsWith("+")) {
      return (
        <span className="inline-flex items-center gap-1 text-destructive font-medium">
          <TrendingUp className="w-3 h-3" />
          {value}
        </span>
      );
    }
    if (typeof value === "string" && value.startsWith("-") && !value.includes("N/A") && value !== "-") {
      return (
        <span className="inline-flex items-center gap-1 text-success font-medium">
          <TrendingDown className="w-3 h-3" />
          {value}
        </span>
      );
    }
    return value;
  };

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/50",
                  index === 0 && "rounded-tl-lg",
                  index === columns.length - 1 && "rounded-tr-lg",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  compact && "py-2 px-3"
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              className="group transition-colors hover:bg-muted/30"
            >
              {columns.map((col, colIdx) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-sm",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.key === highlightColumn && "font-semibold text-foreground bg-primary/5",
                    colIdx === 0 && "font-medium text-foreground",
                    compact && "py-2 px-3"
                  )}
                >
                  {formatValue(row[col.key], col.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
