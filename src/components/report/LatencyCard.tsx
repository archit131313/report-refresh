import DataTable from "./DataTable";
import { Activity, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LatencyData {
  region: string;
  p50: number;
  p99: number;
  change: string;
}

interface LatencyCardProps {
  title: string;
  data: LatencyData[];
}

const LatencyCard = ({ title, data }: LatencyCardProps) => {
  const columns = [
    { key: "region", label: "Region", align: "left" as const },
    { key: "p50", label: "P50", align: "center" as const },
    { key: "p99", label: "P99", align: "center" as const },
    { key: "change", label: "VS T-1", align: "right" as const },
  ];

  const tableData = data.map((d) => ({
    region: d.region,
    p50: d.p50.toFixed(2),
    p99: d.p99.toFixed(2),
    change: d.change,
  }));

  // Calculate average for display
  const avgP50 = (data.reduce((acc, d) => acc + d.p50, 0) / data.length).toFixed(1);

  return (
    <div className="flex-1 min-w-[320px] p-5 rounded-xl bg-gradient-to-br from-muted/30 to-transparent border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Avg: {avgP50}ms
              </span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {data.length} regions
        </Badge>
      </div>
      <DataTable columns={columns} data={tableData} compact />
    </div>
  );
};

export default LatencyCard;
