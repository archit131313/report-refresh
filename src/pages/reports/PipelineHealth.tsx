import { useState } from "react";
import { FolderOpen, BarChart3, AlertTriangle, Clock, ChevronDown, ChevronRight, Info, Lightbulb } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ReportPageLayout from "@/components/reports/ReportPageLayout";
import ReportSection from "@/components/reports/ReportSection";
import SummaryMetrics from "@/components/reports/SummaryMetrics";
import { PipelineRow, Pipeline } from "@/components/reports/pipeline";
import { Input } from "@/components/ui/input";

const pipelinesData: Pipeline[] = [
  {
    name: "FMAItemPrecompute-release",
    status: "Available",
    avgTimeToProdHrs: 0.0,
    overrideDeploy: 0.000,
    deployFrequency: 2.0,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 100,
        consistencyChecks: [],
      },
    ],
    codeReviews: [
      {
        id: "CR-176621717",
        author: "sriramsh",
        description: 'Revert "Cleaning up Seller Rating v2: TT: https://t.corp.ama...',
        deployedTo: ["IAD"],
        fileChanges: [],
      },
      {
        id: "CR-181900069",
        author: "manojsv",
        description: "fix: Update CPT payload expiration date in precompute tests...",
        deployedTo: ["IAD"],
        fileChanges: [],
      },
      {
        id: "CR-224067038",
        author: "bverobar",
        description: "Remove OUB source from projection after ZAZ trigger has been...",
        deployedTo: ["IAD"],
        fileChanges: [],
      },
    ],
    commitsWithoutCR: [
      {
        package: "FMAItemPrecomputeDeploymentPackage/mainline",
        author: "snaparch",
        description: "Removing the FMACollectionsDatapathQueries",
        commitHash: "5fa64a095a83",
      },
    ],
  },
  {
    name: "DeliveryFrictionDatapathQueries-mainline",
    status: "Blocked",
    avgTimeToProdHrs: 0.1,
    overrideDeploy: 0.000,
    deployFrequency: 2.0,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 85,
        consistencyChecks: [
          { name: "DataPath Validation", successRate: 85, passed: 17, total: 20 },
        ],
      },
    ],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "FMATicketAutomation",
    status: "Available",
    avgTimeToProdHrs: 82.3,
    overrideDeploy: 0.000,
    deployFrequency: 2.0,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "EUCX-MinimumOrderQuantityDatapath",
    status: "Blocked",
    avgTimeToProdHrs: 0.2,
    overrideDeploy: 0.000,
    deployFrequency: 1.0,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 45,
        consistencyChecks: [
          { name: "MinOrder Validation EU", successRate: 25, passed: 1, total: 4 },
          { name: "Quantity Threshold Check", successRate: 20, passed: 2, total: 10 },
        ],
      },
    ],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "FMADeliveryPromiseDatapathQueries",
    status: "Blocked",
    avgTimeToProdHrs: 0.0,
    overrideDeploy: 1.500,
    deployFrequency: 2.0,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 60,
        consistencyChecks: [
          { name: "Promise Time Validation", successRate: 30, passed: 3, total: 10 },
        ],
      },
    ],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "FMARequestReplayService",
    status: "Blocked",
    avgTimeToProdHrs: 0.1,
    overrideDeploy: 1.000,
    deployFrequency: 1.0,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "MBOSDynamicBuyingOptions-release",
    status: "Available",
    avgTimeToProdHrs: 24.8,
    overrideDeploy: 0.000,
    deployFrequency: 6.0,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "BuyingOptionLoggerDatapathViews-mainline",
    status: "Available",
    avgTimeToProdHrs: 3.3,
    overrideDeploy: 0.000,
    deployFrequency: 1.0,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "FMAV5RestBindings-release",
    status: "Blocked",
    avgTimeToProdHrs: 14.1,
    overrideDeploy: 0.333,
    deployFrequency: 6.0,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 0,
        consistencyChecks: [
          { name: "Legacy API View Level CCs DUB", successRate: 0, passed: 0, total: 2 },
          { name: "Legacy API View Level CCs IAD", successRate: 0, passed: 0, total: 2 },
          { name: "Legacy API View Level CCs PDX", successRate: 0, passed: 0, total: 2 },
        ],
      },
    ],
    codeReviews: [
      {
        id: "CR-246529128",
        author: "qianghw",
        description: "added TAR rule to autofds cr: https://code.amazon.com/revie...",
        deployedTo: ["DUB", "IAD", "PDX", "PEK"],
        fileChanges: [
          { fileName: "FMAPrerankingDatapathQueries/mainline", commitHash: "7b673c497cc" },
          { fileName: "FMPRPreExecutionQueries/mainline", commitHash: "3fa74b3ab28" },
          { fileName: "FMRRExecutionQueries/mainline", commitHash: "8dc23f4ee3a" },
          { fileName: "FMRNPreRankingQueries/mainline", commitHash: "4de12c89901" },
          { fileName: "FMRNExecutionQueries/mainline", commitHash: "9ab45d67123" },
          { fileName: "FMRNPostExecutionQueries/mainline", commitHash: "1bc56e78234" },
          { fileName: "FMRNStarkExecutionQueries/mainline", commitHash: "2cd67f89345" },
          { fileName: "FMRNFinalExecutionQueries/mainline", commitHash: "3de78a90456" },
          { fileName: "FMRPPrerankingDatapathQueries/mainline", commitHash: "4ef89b01567" },
          { fileName: "FMRPPreExecutionQueries/mainline", commitHash: "5fa90c12678" },
          { fileName: "FMRPExecutionQueries/mainline", commitHash: "6ab01d23789" },
          { fileName: "FMRPPostExecutionQueries/mainline", commitHash: "7bc12e34890" },
          { fileName: "FMRPFinalExecutionQueries/mainline", commitHash: "8cd23f45901" },
          { fileName: "FMRCustomerSegmentDatapathQueries/mainline", commitHash: "9de34a56012" },
        ],
      },
      {
        id: "CR-236930530",
        author: "dhvarise",
        description: "moving resultsMetricsDiagnostics to postHandlers cr: https://cod...",
        deployedTo: ["DUB", "IAD", "PDX", "PEK"],
        fileChanges: [
          { fileName: "FMAPrerankingDatapathQueries/mainline", commitHash: "ab12cd3456" },
          { fileName: "FMAPrerankingDatapathQueries/mainline", commitHash: "cd34ef5678" },
        ],
      },
      {
        id: "CR-245558906",
        author: "sntus",
        description: "Make default customerid as 0 if not provided in FOS gateway...",
        deployedTo: ["DUB", "IAD"],
        fileChanges: [],
      },
      {
        id: "CR-85637622",
        author: "davidnd",
        description: "Adding FMACoreRankingDatapathQueries to deployment packages...",
        deployedTo: ["DUB", "IAD", "PDX", "PEK"],
        fileChanges: [
          { fileName: "FMAPostExecutionQueries/mainline", commitHash: "a0e01ce8087" },
          { fileName: "FMAPostExecutionQueries/mainline", commitHash: "a0e01ce8087" },
        ],
      },
    ],
    commitsWithoutCR: [],
  },
];

// Calculate summary statistics
const totalPipelines = pipelinesData.length;
const healthyPipelines = pipelinesData.filter(p => p.status === "Available").length;
const blockedPipelines = pipelinesData.filter(p => p.status === "Blocked").length;
const unhealthyPipelines = pipelinesData.filter(p => p.status === "Unhealthy").length;
const needAttention = blockedPipelines + unhealthyPipelines;

// Get blocked pipeline details for action items
const blockedPipelineDetails = pipelinesData.filter(p => p.status === "Blocked").map(p => ({
  name: p.name,
  issues: [
    p.workflows.some(w => w.consistencyChecks.some(cc => cc.successRate <= 30))
      ? "Failed tests, Pipeline is blocked, Failed workflow"
      : "1 Failed tests, Pipeline is blocked, 2 Failed workflows",
  ],
  tip: "Tip: Check fix the workflow, abort the sev, or run self remediation in the pipeline details.",
}));

interface BlockedPipelineItemProps {
  pipeline: typeof blockedPipelineDetails[0];
}

const BlockedPipelineItem = ({ pipeline }: BlockedPipelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="font-medium">{pipeline.name}</span>
        </div>
        <Button size="sm" variant="outline" className="text-xs h-7">
          Mark Done
        </Button>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t bg-muted/20 pt-3 space-y-2">
          {pipeline.issues.map((issue, idx) => (
            <p key={idx} className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Issues:</span> {issue}
            </p>
          ))}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md p-2 text-sm text-amber-800">
            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{pipeline.tip}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const PipelineHealth = () => {
  const { reportId } = useParams();
  const [newActionItem, setNewActionItem] = useState("");

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Date Range</p>
            <p className="text-sm font-medium">2026-01-11 to 2026-01-22</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Resolver Groups</p>
            <p className="text-sm font-medium">FMA-FeaturedOffer</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Pipelines Monitored</p>
            <p className="text-sm font-medium">{totalPipelines}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Created</p>
            <p className="text-sm font-medium">2026-01-22 07:47:42</p>
          </div>
        </div>
      </ReportSection>

      {/* Section 2: Summary Metrics */}
      <ReportSection
        icon={BarChart3}
        title="Summary Metrics"
        description="Overview of pipeline health status"
      >
        <SummaryMetrics
          columns={4}
          metrics={[
            { value: totalPipelines.toString(), label: "Total Pipelines" },
            { value: healthyPipelines.toString(), label: "Healthy", variant: "success" },
            { value: needAttention.toString(), label: "Need Attention", variant: "warning" },
            { value: blockedPipelines.toString(), label: "Blocked", variant: "danger" },
          ]}
        />
      </ReportSection>

      {/* Section 3: All Pipelines Table */}
      <ReportSection
        icon={Clock}
        title={`All Pipelines (${totalPipelines})`}
        description="Click on a pipeline to view detailed workflow and deployment information"
      >
        <div className="overflow-x-auto border rounded-xl shadow-sm bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/80 to-muted/50 border-b-2 border-border/50">
                <TableHead className="min-w-[300px] py-4 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors cursor-default">
                  PIPELINE
                </TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors cursor-default">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1.5 cursor-help">
                        STATUS
                        <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border shadow-lg">
                        <p>Current pipeline status</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead className="text-center py-4 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors cursor-default">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1.5 justify-center cursor-help">
                        AVG TIME TO PROD (HRS)
                        <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border shadow-lg">
                        <p>Average time to production in hours</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead className="text-center py-4 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors cursor-default">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1.5 justify-center cursor-help">
                        OVERRIDE/DEPLOY
                        <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border shadow-lg">
                        <p>Override to deploy ratio</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead className="text-center py-4 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors cursor-default">
                  DEPLOY FREQUENCY
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border/50">
              {pipelinesData.map((pipeline) => (
                <PipelineRow key={pipeline.name} pipeline={pipeline} />
              ))}
            </TableBody>
          </Table>
        </div>
      </ReportSection>

      {/* Section 4: Action Items */}
      <ReportSection
        icon={AlertTriangle}
        title="Action Items"
        description="Recommended actions based on pipeline health analysis"
      >
        <div className="space-y-6">
          {/* Blocked Pipelines Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">Blocked Pipelines: {blockedPipelines} pipeline(s)</span>
              <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                Mark All Done
              </Badge>
            </div>
            
            <div className="space-y-3">
              {blockedPipelineDetails.map((pipeline) => (
                <BlockedPipelineItem key={pipeline.name} pipeline={pipeline} />
              ))}
            </div>
          </div>

          {/* Add Manual Action Item */}
          <div className="border-t pt-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Add Manual Action Item</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter action item..."
                value={newActionItem}
                onChange={(e) => setNewActionItem(e.target.value)}
                className="flex-1"
              />
              <Button size="sm">Add</Button>
            </div>
          </div>
        </div>
      </ReportSection>
    </ReportPageLayout>
  );
};

export default PipelineHealth;