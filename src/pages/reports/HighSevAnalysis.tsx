import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportInfo from "@/components/reports/ReportInfo";

const tickets = [
  {
    id: "V2061637043",
    impact: "Availability drop in JP region causing increased MBOS BOP fallbacks and affecting AIV availability",
    rootCause: "Deployment issue causing service degradation and increased latency in the Featured Merchant Algorithm (FMA) services",
    resolution: "Issue resolved after deployment rollback and system metrics returned to normal with availability back to 100%",
    status: "Resolved",
  },
];

const HighSevAnalysis = () => {
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

        <h1 className="text-3xl font-bold text-foreground mb-1">AI-Powered Report Analysis</h1>
        <p className="text-muted-foreground mb-6">Report ID: e286f3d6 - Click on any field to edit</p>

        <ReportInfo
          dateRange="2026-01-01 to 2026-01-08"
          severity="HIGH (SEV_1, SEV_2)"
          severityType="high"
          resolverGroups="FMA-FeaturedOffer, FMA-Business"
          totalTickets={1}
          createdAt="2026-01-15 18:44:21"
        />

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📁</span>
            <h2 className="font-semibold text-foreground">AI-Analyzed Tickets (1)</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Each ticket has been analyzed by Claude Sonnet 4 to extract Impact, Root Cause, and Resolution
          </p>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">TICKET ID</TableHead>
                  <TableHead>IMPACT</TableHead>
                  <TableHead>ROOT CAUSE</TableHead>
                  <TableHead>RESOLUTION</TableHead>
                  <TableHead className="w-24">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <a
                        href={`#${ticket.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {ticket.id}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm">{ticket.impact}</TableCell>
                    <TableCell className="text-sm">{ticket.rootCause}</TableCell>
                    <TableCell className="text-sm">{ticket.resolution}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {ticket.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HighSevAnalysis;
