import { FolderOpen, BarChart3, AlertTriangle, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportPageLayout from "@/components/reports/ReportPageLayout";
import ReportSection from "@/components/reports/ReportSection";
import SummaryMetrics from "@/components/reports/SummaryMetrics";
import ActionItemsSection from "@/components/reports/ActionItemsSection";
import { PipelineRow, Pipeline } from "@/components/reports/pipeline";

const pipelinesData: Pipeline[] = [
  {
    name: "FMAItemPrecompute-release",
    status: "Blocked",
    failedBuilds: 0,
    failedTests: 0,
    blocked: true,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 100,
        consistencyChecks: [],
      },
    ],
    codeReviews: [
      {
        id: "CR-224067038",
        author: "bverobar",
        description: "Remove OUB source from projection after ZAZ trigger has been...",
        deployedTo: ["IAD"],
      },
      {
        id: "CR-176621717",
        author: "sriramsh",
        description: 'Revert "Cleaning up Seller Rating v2: TT: https://t.corp.ama...',
        deployedTo: ["IAD"],
      },
      {
        id: "CR-181900069",
        author: "manojsv",
        description: "fix: Update CPT payload expiration date in precompute tests...",
        deployedTo: ["IAD"],
      },
    ],
    commitsWithoutCR: [
      {
        package: "FMAItemPrecomputeDeploymentPackage/mainline",
        author: "snaparch",
        description: "Removing the FMACollectionsDatapathQueries",
        commitHash: "5fa64a095a83",
      },
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
    failedBuilds: 0,
    failedTests: 0,
    blocked: true,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 85,
        consistencyChecks: [
          { name: "DataPath Validation", successRate: 85, passed: 17, total: 20 },
        ],
      },
    ],
    codeReviews: [
      {
        id: "CR-234521098",
        author: "johnsmith",
        description: "Add delivery friction metrics calculation...",
        deployedTo: ["IAD", "PDX"],
      },
    ],
    commitsWithoutCR: [],
  },
  {
    name: "FMATicketAutomation",
    status: "Available",
    failedBuilds: 0,
    failedTests: 0,
    blocked: false,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "EUCX-MinimumOrderQuantityDatapath",
    status: "Blocked",
    failedBuilds: 0,
    failedTests: 2,
    blocked: true,
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
    codeReviews: [
      {
        id: "CR-198765432",
        author: "alexchen",
        description: "Update minimum order quantity thresholds for EU...",
        deployedTo: ["DUB"],
      },
    ],
    commitsWithoutCR: [],
  },
  {
    name: "FMADeliveryPromiseDatapathQueries",
    status: "Blocked",
    failedBuilds: 0,
    failedTests: 1,
    blocked: true,
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
    status: "Unhealthy",
    failedBuilds: 0,
    failedTests: 0,
    blocked: false,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "MBOSDynamicBuyingOptions-release",
    status: "Blocked",
    failedBuilds: 0,
    failedTests: 1,
    blocked: true,
    workflows: [
      {
        name: "Run Consistency Checker",
        overallSuccessRate: 75,
        consistencyChecks: [
          { name: "Buying Options Cache", successRate: 75, passed: 15, total: 20 },
        ],
      },
    ],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "BuyingOptionLoggerDatapathViews-mainline",
    status: "Available",
    failedBuilds: 0,
    failedTests: 0,
    blocked: false,
    workflows: [],
    codeReviews: [],
    commitsWithoutCR: [],
  },
  {
    name: "FMAV5RestBindings-release",
    status: "Unhealthy",
    failedBuilds: 0,
    failedTests: 0,
    blocked: false,
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
        id: "CR-85637622",
        author: "davidnd",
        description: "Adding FMACoreRankingDatapathQueries to deployment packages...",
        deployedTo: ["DUB", "IAD", "PDX", "PEK"],
      },
      {
        id: "CR-246529128",
        author: "qianghw",
        description: "added TAR rule to autofds cr: https://code.amazon.com/revie...",
        deployedTo: ["DUB", "PDX", "PEK"],
      },
      {
        id: "CR-236930530",
        author: "dhvarise",
        description: "moving resultsMetricsDiagnostics to postHandlers cr: https://cod...",
        deployedTo: ["DUB", "IAD", "PDX", "PEK"],
      },
      {
        id: "CR-245558906",
        author: "sntus",
        description: "Make default customerid as 0 if not provided in FOS gateway...",
        deployedTo: ["DUB", "IAD"],
      },
      {
        id: "CR-245899306",
        author: "tanvato",
        description: "added context for request replay and integration requests c...",
        deployedTo: ["DUB", "IAD"],
      },
      {
        id: "CR-241760499",
        author: "carymatt",
        description: "Changes to Live Q2S2 Config for ItemTypeAsinList in Latent...",
        deployedTo: ["DUB", "IAD"],
      },
      {
        id: "CR-244009120",
        author: "dkfluni",
        description: "added constraints for 3 new fields for box logging for xT-SM...",
        deployedTo: ["DUB", "IAD"],
      },
      {
        id: "CR-217968265",
        author: "edvia",
        description: "Revert 'Adding mdsp view to trigger build to re-master FMACtr...",
        deployedTo: ["DUB", "IAD"],
      },
      {
        id: "CR-243595027",
        author: "jyucejwn",
        description: "Fix FQRS stf leak cr: https://code.amazon.com/reviews/CR-2...",
        deployedTo: ["DUB", "IAD"],
      },
    ],
    commitsWithoutCR: [
      {
        package: "FMAPostExecutionQueries/mainline",
        author: "jinchang",
        description: "Updating CRUX Template for COE-A-28408876",
        commitHash: "ce6c5ce8e8969",
      },
      {
        package: "FMAPrerankingDatapathQueries/mainline",
        author: "jinchang",
        description: "Updating CRUX Template for COE-A-3845876",
        commitHash: "e72c5ffe9d8a5",
      },
      {
        package: "FMACustomerSegmentDatapathQueries/mainline",
        author: "jinchang",
        description: "Updating CRUX Template for COE-A-7845878",
        commitHash: "87cf994867at",
      },
    ],
  },
];

// Calculate summary statistics
const totalPipelines = pipelinesData.length;
const healthyPipelines = pipelinesData.filter(p => p.status === "Available").length;
const blockedPipelines = pipelinesData.filter(p => p.blocked).length;
const unhealthyPipelines = pipelinesData.filter(p => p.status === "Unhealthy").length;
const needAttention = blockedPipelines + unhealthyPipelines;
const healthRate = Math.round((healthyPipelines / totalPipelines) * 100);

// Generate auto action items
const autoGeneratedItems = [
  {
    id: "unhealthy-pipelines",
    title: `Unhealthy Pipelines: ${unhealthyPipelines + blockedPipelines} pipeline(s) need attention. Review failed builds and tests.`,
    severity: "medium" as const,
  },
  {
    id: "failed-tests",
    title: `Failed Tests: ${pipelinesData.reduce((acc, p) => acc + p.failedTests, 0)} test failure(s) detected. Review and fix failing tests.`,
    severity: "critical" as const,
  },
  {
    id: "blocked-pipelines",
    title: `Blocked Pipelines: ${blockedPipelines} pipeline(s) are blocked. Urgent attention required.`,
    severity: "critical" as const,
  },
];

const PipelineHealth = () => {
  const { reportId } = useParams();

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
            <p className="text-sm font-medium">2026-01-19 to 2026-01-21</p>
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
            <p className="text-sm font-medium">2026-01-21 15:26:23</p>
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
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[300px]">PIPELINE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>FAILED BUILDS</TableHead>
                <TableHead>FAILED TESTS</TableHead>
                <TableHead>BLOCKED</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
        <ActionItemsSection autoGeneratedItems={autoGeneratedItems} />
      </ReportSection>
    </ReportPageLayout>
  );
};

export default PipelineHealth;
