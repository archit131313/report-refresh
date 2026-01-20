import { TrendingUp, TrendingDown, FolderOpen, BarChart3, Activity, Info } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportPageLayout from "@/components/reports/ReportPageLayout";
import ReportSection from "@/components/reports/ReportSection";
import SummaryMetrics from "@/components/reports/SummaryMetrics";

const mbosData = [
  {
    period: "Current Period",
    dpxNa: { value: 68.78, change: 1.38 },
    sxNa: { value: 68.23, change: 0.85 },
    dpxEu: { value: 43.74, change: 2.61 },
    sxEu: { value: 66.92, change: 1.13 },
    dpxFe: { value: 57.79, change: -0.63 },
    sxFe: { value: 60.96, change: -0.69 },
  },
  {
    period: "1 Week Prior",
    dpxNa: { value: 67.40 },
    sxNa: { value: 67.38 },
    dpxEu: { value: 41.13 },
    sxEu: { value: 65.79 },
    dpxFe: { value: 58.42 },
    sxFe: { value: 61.65 },
  },
  {
    period: "2 Weeks Prior",
    dpxNa: { value: 66.14 },
    sxNa: { value: 66.77 },
    dpxEu: { value: 41.25 },
    sxEu: { value: 64.39 },
    dpxFe: { value: 58.13 },
    sxFe: { value: 61.36 },
  },
];

const mosWinnersData = [
  {
    period: "Current Period",
    dpxNa: { value: "N/A" },
    sxNa: { value: "N/A" },
    dpxEu: { value: "N/A" },
    sxEu: { value: "N/A" },
    dpxFe: { value: "N/A" },
    sxFe: { value: "N/A" },
  },
  {
    period: "1 Week Prior",
    dpxNa: { value: "N/A" },
    sxNa: { value: "N/A" },
    dpxEu: { value: "N/A" },
    sxEu: { value: "N/A" },
    dpxFe: { value: "N/A" },
    sxFe: { value: "N/A" },
  },
  {
    period: "2 Weeks Prior",
    dpxNa: { value: "N/A" },
    sxNa: { value: "N/A" },
    dpxEu: { value: "N/A" },
    sxEu: { value: "N/A" },
    dpxFe: { value: "N/A" },
    sxFe: { value: "N/A" },
  },
];

const renderCell = (data: { value: number | string; change?: number }) => {
  const isNumber = typeof data.value === "number";
  const hasChange = data.change !== undefined;
  const displayValue = isNumber ? (data.value as number).toFixed(2) : data.value;

  return (
    <div className="text-center">
      <span>{displayValue}</span>
      {hasChange && data.change !== 0 && (
        <div className={`flex items-center justify-center gap-1 text-xs mt-1 ${data.change > 0 ? "text-red-500" : "text-green-500"}`}>
          {data.change > 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {data.change > 0 ? "+" : ""}{data.change.toFixed(2)}
        </div>
      )}
    </div>
  );
};

const ServiceHealth = () => {
  const { reportId } = useParams();

  return (
    <ReportPageLayout
      reportId={reportId || ""}
      title="Service Health Metrics"
      subtitle={`Report ID: ${reportId} | MBOS API P50 Latency (ms)`}
    >
      {/* Section 1: Report Information */}
      <ReportSection
        icon={FolderOpen}
        title="Report Information"
        description="Overview of report parameters and scope"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Date Range</p>
            <p className="text-sm font-medium">2026-01-01 to 2026-01-08</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Metric Type</p>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
              P50 Latency
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Resolver Groups</p>
            <p className="text-sm font-medium">FMA-FeaturedOffer, FMA-Business</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Created</p>
            <p className="text-sm font-medium">2026-01-15 18:44:21</p>
          </div>
        </div>
      </ReportSection>

      {/* Section 2: Summary Metrics */}
      <ReportSection
        icon={BarChart3}
        title="Summary Metrics"
        description="Key latency indicators across regions"
      >
        <SummaryMetrics
          columns={4}
          metrics={[
            { value: "68.78ms", label: "DPX NA (Current)", variant: "warning" },
            { value: "43.74ms", label: "DPX EU (Current)", variant: "success" },
            { value: "57.79ms", label: "DPX FE (Current)" },
            { value: "+2.61ms", label: "Highest Increase (DPX EU)", variant: "danger" },
          ]}
        />
      </ReportSection>

      {/* Section 3: Summary / MBOS Latency Trend */}
      <ReportSection
        icon={Activity}
        title="MBOS Latency Trend"
        description="Historical latency comparison across regions"
      >
        <div className="flex justify-end mb-4">
          <Button className="gap-2 bg-primary">
            <span className="w-2 h-2 rounded-full bg-white" />
            View Live Metrics
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PERIOD</TableHead>
                <TableHead className="text-center">DPX NA (MS)</TableHead>
                <TableHead className="text-center">SX NA (MS)</TableHead>
                <TableHead className="text-center">DPX EU (MS)</TableHead>
                <TableHead className="text-center">SX EU (MS)</TableHead>
                <TableHead className="text-center">DPX FE (MS)</TableHead>
                <TableHead className="text-center">SX FE (MS)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mbosData.map((row) => (
                <TableRow key={row.period}>
                  <TableCell className="font-medium">{row.period}</TableCell>
                  <TableCell>{renderCell(row.dpxNa)}</TableCell>
                  <TableCell>{renderCell(row.sxNa)}</TableCell>
                  <TableCell>{renderCell(row.dpxEu)}</TableCell>
                  <TableCell>{renderCell(row.sxEu)}</TableCell>
                  <TableCell>{renderCell(row.dpxFe)}</TableCell>
                  <TableCell>{renderCell(row.sxFe)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ReportSection>

      {/* mosWinners Latency Table */}
      <ReportSection
        icon={Activity}
        title="mosWinners Latency Trend"
        description="Historical mosWinners latency comparison"
      >
        <div className="flex justify-end mb-4">
          <Button className="gap-2 bg-primary">
            <span className="w-2 h-2 rounded-full bg-white" />
            View Live Metrics
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PERIOD</TableHead>
                <TableHead className="text-center">DPX NA (MS)</TableHead>
                <TableHead className="text-center">SX NA (MS)</TableHead>
                <TableHead className="text-center">DPX EU (MS)</TableHead>
                <TableHead className="text-center">SX EU (MS)</TableHead>
                <TableHead className="text-center">DPX FE (MS)</TableHead>
                <TableHead className="text-center">SX FE (MS)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mosWinnersData.map((row) => (
                <TableRow key={row.period}>
                  <TableCell className="font-medium">{row.period}</TableCell>
                  <TableCell className="text-center">{row.dpxNa.value}</TableCell>
                  <TableCell className="text-center">{row.sxNa.value}</TableCell>
                  <TableCell className="text-center">{row.dpxEu.value}</TableCell>
                  <TableCell className="text-center">{row.sxEu.value}</TableCell>
                  <TableCell className="text-center">{row.dpxFe.value}</TableCell>
                  <TableCell className="text-center">{row.sxFe.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ReportSection>

      {/* Section 4: Action Items / Legend */}
      <ReportSection
        icon={Info}
        title="Legend & Action Items"
        description="Understanding latency indicators"
      >
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            Latency Increased (vs prior period)
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-green-500" />
            Latency Decreased (vs prior period)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-muted-foreground" />
            No Significant Change
          </div>
        </div>
      </ReportSection>
    </ReportPageLayout>
  );
};

export default ServiceHealth;
