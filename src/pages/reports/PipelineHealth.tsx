import { ArrowLeft, ChevronDown, Check, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportInfo from "@/components/reports/ReportInfo";

const actionRequired = [
  {
    name: "FMAItemPrecompute-release",
    severity: "CRITICAL",
    issues: ["1 failed deployments", "Pipeline is blocked", "Production is blocked"],
    status: "Blocked",
  },
  {
    name: "DeliveryFrictionDatapathQueries-mainline",
    severity: "CRITICAL",
    issues: ["1 failed deployments", "Pipeline is blocked"],
    status: "Blocked",
  },
  {
    name: "EUCX-MinimumOrderQuantityDatapath",
    severity: "CRITICAL",
    issues: ["2 failed tests", "Pipeline is blocked"],
    status: "Blocked",
  },
];

const allPipelines = [
  { name: "FMAItemPrecompute-release", status: "Blocked", failedBuilds: 0, failedTests: 0, blocked: true },
  { name: "DeliveryFrictionDatapathQueries-mainline", status: "Blocked", failedBuilds: 0, failedTests: 0, blocked: true },
  { name: "FMATicketAutomation", status: "Available", failedBuilds: 0, failedTests: 0, blocked: false },
  { name: "EUCX-MinimumOrderQuantityDatapath", status: "Blocked", failedBuilds: 0, failedTests: 2, blocked: true },
  { name: "FMADeliveryPromiseDatapathQueries", status: "Available", failedBuilds: 0, failedTests: 0, blocked: false },
  { name: "FMARequestReplayService", status: "Available", failedBuilds: 0, failedTests: 0, blocked: false },
  { name: "MBOSDynamicBuyingOptions-release", status: "Available", failedBuilds: 0, failedTests: 0, blocked: false },
  { name: "BuyingOptionLoggerDatapathViews-mainline", status: "Available", failedBuilds: 0, failedTests: 0, blocked: false },
  { name: "FMAV5RestBindings-release", status: "Available", failedBuilds: 0, failedTests: 0, blocked: false },
];

const PipelineHealth = () => {
  const { reportId } = useParams();
  const [isOpen, setIsOpen] = useState(true);

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

        <h1 className="text-3xl font-bold text-foreground mb-1">Pipeline Health</h1>
        <p className="text-muted-foreground mb-6">Report ID: e286f3d6</p>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📁</span>
            <h2 className="font-semibold text-foreground">Report Information</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">📅 DATE RANGE</p>
              <p className="text-sm font-medium">2026-01-01 to 2026-01-08</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">🔧 PIPELINES MONITORED</p>
              <p className="text-sm font-medium">9</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">👥 RESOLVER GROUPS</p>
              <p className="text-sm font-medium">FMA-FeaturedOffer, FMA-Business</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">✅ HEALTHY</p>
              <p className="text-sm font-medium">6</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">⚠️ NEED ATTENTION</p>
              <p className="text-sm font-medium">3</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">🕐 Created: 2026-01-15 18:44:21</p>
        </Card>

        {/* Action Required */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🚨</span>
            <h2 className="font-semibold text-foreground">Action Required</h2>
          </div>

          <div className="space-y-4">
            {actionRequired.map((item) => (
              <Card key={item.name} className="p-4 border-l-4 border-l-red-500">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Badge className="bg-red-100 text-red-700">{item.severity}</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                      {item.issues.map((issue, i) => (
                        <li key={i}>• {issue}</li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary">View Pipeline</Button>
                      <Button size="sm" variant="outline">Create Ticket</Button>
                      <Button size="sm" variant="outline">View Logs</Button>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700">{item.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Pipelines */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 mb-4 p-0 h-auto">
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
              View All Pipelines (9)
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PIPELINE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>FAILED BUILDS</TableHead>
                    <TableHead>FAILED TESTS</TableHead>
                    <TableHead>BLOCKED</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPipelines.map((pipeline) => (
                    <TableRow key={pipeline.name}>
                      <TableCell className="font-medium">{pipeline.name}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            pipeline.status === "Blocked"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {pipeline.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{pipeline.failedBuilds}</TableCell>
                      <TableCell>{pipeline.failedTests}</TableCell>
                      <TableCell>
                        {pipeline.blocked ? (
                          <X className="w-4 h-4 text-red-500" />
                        ) : (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </DashboardLayout>
  );
};

export default PipelineHealth;
