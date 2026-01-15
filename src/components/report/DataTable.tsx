import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, string | number>[];
  highlightColumn?: string;
}

const DataTable = ({ columns, data, highlightColumn }: DataTableProps) => {
  const formatValue = (value: string | number, key: string) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    if (typeof value === "string" && value.startsWith("+")) {
      return <span className="metric-negative">{value}</span>;
    }
    if (typeof value === "string" && value.startsWith("-") && !value.includes("N/A")) {
      return <span className="metric-positive">{value}</span>;
    }
    return value;
  };

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "first:rounded-tl-md last:rounded-tr-md",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right"
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.key === highlightColumn && "font-semibold text-foreground"
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
