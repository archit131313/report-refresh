import { Calendar, AlertTriangle, Users, Ticket, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ReportInfoProps {
  dateRange: string;
  severity?: string;
  severityType?: "high" | "low" | "all";
  resolverGroups: string;
  totalTickets?: number;
  oldestTickets?: number;
  createdAt: string;
}

const ReportInfo = ({
  dateRange,
  severity,
  severityType = "all",
  resolverGroups,
  totalTickets,
  oldestTickets,
  createdAt,
}: ReportInfoProps) => {
  const getSeverityBadgeColor = () => {
    switch (severityType) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📁</span>
        <h2 className="font-semibold text-foreground">Report Information</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
        <div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Calendar className="w-3 h-3" />
            DATE RANGE
          </div>
          <p className="text-sm font-medium">{dateRange}</p>
        </div>

        {severity && (
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <AlertTriangle className="w-3 h-3" />
              SEVERITY
            </div>
            <Badge variant="outline" className={getSeverityBadgeColor()}>
              {severity}
            </Badge>
          </div>
        )}

        <div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Users className="w-3 h-3" />
            RESOLVER GROUPS
          </div>
          <p className="text-sm font-medium">{resolverGroups}</p>
        </div>

        {totalTickets !== undefined && (
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Ticket className="w-3 h-3" />
              TOTAL TICKETS
            </div>
            <p className="text-sm font-medium">{totalTickets}</p>
          </div>
        )}

        {oldestTickets !== undefined && (
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Ticket className="w-3 h-3" />
              OLDEST TICKETS
            </div>
            <p className="text-sm font-medium">{oldestTickets}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        Created: {createdAt}
      </div>
    </Card>
  );
};

export default ReportInfo;
