import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
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
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportInfo from "@/components/reports/ReportInfo";
import StatsCard from "@/components/reports/StatsCard";

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
    <DashboardLayout>
      <div className="p-8">
        <Link
          to={`/reports/${reportId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Report Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-1">Top 10 Oldest Tickets</h1>
        <p className="text-muted-foreground mb-6">Report ID: e286f3d6</p>

        <ReportInfo
          dateRange="2026-01-01 to 2026-01-08"
          severity="ALL (SEV_1 - SEV_5)"
          severityType="all"
          resolverGroups="FMA-FeaturedOffer, FMA-Business"
          oldestTickets={1}
          createdAt="2026-01-15 18:44:21"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard value="1" label="Tickets Older Than 6 Months" />
          <StatsCard value="1" label="Showing Top Oldest" />
          <StatsCard value="2025-07-19" label="6 Months Cutoff Date" variant="highlight" />
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⏰</span>
            <h2 className="font-semibold text-foreground">Top 10 Oldest Open Tickets (&gt;6 Months)</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Tickets requiring immediate attention to reduce backlog
          </p>

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
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OldestTickets;
