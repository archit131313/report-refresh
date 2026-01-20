import { FolderOpen, BarChart3, Clock, Bell } from "lucide-react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
import ActionItem from "@/components/reports/ActionItem";

const tickets = [
  {
    id: "P239249135",
    title: "N/A",
    status: "Pending",
    severity: "SEV_3",
    createdDate: "2025-05-14",
    assignee: "dhvanivo",
  },
];

const OldestTickets = () => {
  const { reportId } = useParams();

  return (
    <ReportPageLayout
      reportId={reportId || ""}
      title="Top 10 Oldest Tickets"
      subtitle={`Report ID: ${reportId}`}
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
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
              ALL (SEV_1 - SEV_5)
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
        description="Overview of ticket backlog status"
      >
        <SummaryMetrics
          metrics={[
            { value: "1", label: "Tickets Older Than 6 Months", variant: "danger" },
            { value: "1", label: "Showing Top Oldest" },
            { value: "2025-07-19", label: "6 Months Cutoff Date", variant: "highlight" },
          ]}
        />
      </ReportSection>

      {/* Section 3: Summary / Details Table */}
      <ReportSection
        icon={Clock}
        title="Top 10 Oldest Open Tickets (>6 Months)"
        description="Tickets requiring immediate attention to reduce backlog"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TICKET ID</TableHead>
                <TableHead>TITLE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>SEVERITY</TableHead>
                <TableHead>CREATED DATE</TableHead>
                <TableHead>ASSIGNEE</TableHead>
                <TableHead>ACTION</TableHead>
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
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.severity}</TableCell>
                  <TableCell>{ticket.createdDate}</TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="default">
                      Notify Owner
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ReportSection>

      {/* Section 4: Action Items */}
      <ReportSection
        icon={Bell}
        title="Action Items"
        description="Recommended actions to address aging tickets"
      >
        <div className="space-y-4">
          <ActionItem
            title="Follow up on P239249135"
            severity="high"
            status="Overdue"
            statusVariant="danger"
            description="This ticket has been open for over 8 months and requires immediate attention"
            issues={[
              "Ticket age exceeds SLA by 2 months",
              "No recent activity from assignee",
            ]}
            actions={[
              { label: "Notify Owner", variant: "default" },
              { label: "Reassign Ticket", variant: "outline" },
              { label: "Escalate", variant: "outline" },
            ]}
          />
        </div>
      </ReportSection>
    </ReportPageLayout>
  );
};

export default OldestTickets;
