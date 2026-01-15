import DataTable from "./DataTable";

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

  return (
    <div className="flex-1 min-w-[280px]">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default LatencyCard;
