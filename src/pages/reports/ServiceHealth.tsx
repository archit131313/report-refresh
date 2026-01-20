import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";

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
  return (
    <DashboardLayout>
      <div className="p-8">
        <Link
          to="/reports"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Report Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-1">Service Health Metrics</h1>
        <p className="text-muted-foreground mb-1">MBOS API P50 Latency (ms)</p>
        <p className="text-sm text-muted-foreground mb-6">Report ID: e286f3d6 | 2026-01-01 to 2026-01-08</p>

        {/* MBOS Latency Table */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">MBOS latency trend</h2>
            <Button className="gap-2 bg-primary">
              <span className="w-2 h-2 rounded-full bg-white" />
              View Live Metrics
            </Button>
          </div>

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
        </Card>

        {/* mosWinners Latency Table */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">mosWinners latency trend</h2>
            <Button className="gap-2 bg-primary">
              <span className="w-2 h-2 rounded-full bg-white" />
              View Live Metrics
            </Button>
          </div>

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
        </Card>

        {/* Legend */}
        <Card className="p-4">
          <p className="font-medium mb-2">Legend</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ServiceHealth;
