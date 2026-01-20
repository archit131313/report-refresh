import { ChevronDown, Check, X, FolderOpen, BarChart3, AlertTriangle, GitBranch } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
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
import ReportPageLayout from "@/components/reports/ReportPageLayout";
import ReportSection from "@/components/reports/ReportSection";
import SummaryMetrics from "@/components/reports/SummaryMetrics";
import ActionItem from "@/components/reports/ActionItem";

const actionRequired = [
  {
    name: "FMAItemPrecompute-release",
    severity: "critical" as const,
    issues: ["1 failed deployments", "Pipeline is blocked", "Production is blocked"],
    status: "Blocked",
  },
  {
    name: "DeliveryFrictionDatapathQueries-mainline",
    severity: "critical" as const,
    issues: ["1 failed deployments", "Pipeline is blocked"],
    status: "Blocked",
  },
  {
    name: "EUCX-MinimumOrderQuantityDatapath",
    severity: "critical" as const,
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
    <ReportPageLayout
      reportId={reportId || ""}
      title="Pipeline Health"
      subtitle={`Report ID: ${reportId}`}
    >
      {/* Section 1: Report Information */}
      <ReportSection
        icon={FolderOpen}
        title="Report Information"
        description="Overview of report parameters and scope"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Date Range</p>
            <p className="text-sm font-medium">2026-01-01 to 2026-01-08</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Pipelines Monitored</p>
            <p className="text-sm font-medium">9</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Resolver Groups</p>
            <p className="text-sm font-medium">FMA-FeaturedOffer, FMA-Business</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Healthy</p>
            <p className="text-sm font-medium text-green-600">6</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Need Attention</p>
            <p className="text-sm font-medium text-red-600">3</p>
          </div>
        </div>
      </ReportSection>

      {/* Section 2: Summary Metrics */}
      <ReportSection
        icon={BarChart3}
        title="Summary Metrics"
        description="Pipeline health overview"
      >
        <SummaryMetrics
          columns={4}
          metrics={[
            { value: "9", label: "Total Pipelines" },
            { value: "6", label: "Healthy Pipelines", variant: "success" },
            { value: "3", label: "Blocked Pipelines", variant: "danger" },
            { value: "67%", label: "Health Rate" },
          ]}
        />
      </ReportSection>

      {/* Section 3: Summary / All Pipelines Table */}
      <ReportSection
        icon={GitBranch}
        title="All Pipelines"
        description="Complete status of all monitored pipelines"
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 mb-4 p-0 h-auto">
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
              {isOpen ? "Hide" : "Show"} All Pipelines (9)
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="overflow-x-auto border rounded-lg">
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ReportSection>

      {/* Section 4: Action Items */}
      <ReportSection
        icon={AlertTriangle}
        title="Action Required"
        description="Pipelines requiring immediate attention"
        variant="action"
      >
        <div className="space-y-4">
          {actionRequired.map((item) => (
            <ActionItem
              key={item.name}
              title={item.name}
              severity={item.severity}
              status={item.status}
              statusVariant="danger"
              issues={item.issues}
              actions={[
                { label: "View Pipeline", variant: "default" },
                { label: "Create Ticket", variant: "outline" },
                { label: "View Logs", variant: "outline" },
              ]}
            />
          ))}
        </div>
      </ReportSection>
    </ReportPageLayout>
  );
};

export default PipelineHealth;
