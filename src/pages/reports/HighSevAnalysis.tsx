import { FolderOpen, BarChart3, FileText, AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
import ActionItem from "@/components/reports/ActionItem";

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
  const { reportId } = useParams();

  return (
    <ReportPageLayout
      reportId={reportId || ""}
      title="AI-Powered Report Analysis"
      subtitle={`Report ID: ${reportId} - Click on any field to edit`}
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
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Severity</p>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
              HIGH (SEV_1, SEV_2)
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
        description="Key statistics for high severity incidents"
      >
        <SummaryMetrics
          metrics={[
            { value: "1", label: "Total High Sev Tickets" },
            { value: "0", label: "Open Tickets", variant: "success" },
            { value: "100%", label: "Resolution Rate", variant: "success" },
          ]}
        />
      </ReportSection>

      {/* Section 3: Summary / Details Table */}
      <ReportSection
        icon={FileText}
        title="AI-Analyzed Tickets"
        description="Each ticket has been analyzed by Claude Sonnet 4 to extract Impact, Root Cause, and Resolution"
      >
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
      </ReportSection>

      {/* Section 4: Action Items */}
      <ReportSection
        icon={AlertTriangle}
        title="Action Items"
        description="Recommended follow-up actions based on analysis"
      >
        <div className="space-y-4">
          <ActionItem
            title="Review deployment process for FMA services"
            severity="medium"
            status="Pending"
            statusVariant="warning"
            description="Consider implementing additional pre-deployment checks to prevent similar incidents"
            actions={[
              { label: "Create Follow-up Ticket", variant: "default" },
              { label: "View Related Runbook", variant: "outline" },
            ]}
          />
          <ActionItem
            title="Update monitoring alerts for JP region"
            severity="low"
            status="Suggested"
            statusVariant="default"
            description="Enhance alerting thresholds to detect availability drops earlier"
            actions={[
              { label: "Review Alerts", variant: "outline" },
            ]}
          />
        </div>
      </ReportSection>
    </ReportPageLayout>
  );
};

export default HighSevAnalysis;
