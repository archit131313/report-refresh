import { ChevronDown, CheckCircle2, AlertTriangle, FolderOpen, BarChart3, Shield, Bell } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

const RiskSummary = () => {
  const { reportId } = useParams();
  const [peOpen, setPeOpen] = useState(true);
  const [sasOpen, setSasOpen] = useState(true);
  const [shepherdOpen, setShepherdOpen] = useState(false);

  return (
    <ReportPageLayout
      reportId={reportId || ""}
      title="Risk Summary"
      subtitle={`Report ID: ${reportId} | Owners: preggnas, gnguyen`}
    >
      {/* Warning Alert */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Note:</strong> Risk data was not available during report generation. Please regenerate the report to fetch current risk data.
        </AlertDescription>
      </Alert>

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
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Risk Types</p>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
              PE, SAS, Shepherd
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Owners</p>
            <p className="text-sm font-medium">preggnas, gnguyen</p>
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
        description="Risk health overview across all categories"
      >
        <SummaryMetrics
          columns={5}
          metrics={[
            { value: "0", label: "Total Open Risks" },
            { value: "0", label: "Needs Immediate Action", variant: "warning" },
            { value: "0", label: "Policy Engine (0 unack)" },
            { value: "0", label: "SAS (0 critical/high)" },
            { value: "0", label: "Shepherd (0 blocking)" },
          ]}
        />
      </ReportSection>

      {/* Section 3: Summary / Risk Details */}
      <ReportSection
        icon={Shield}
        title="Risk Details"
        description="Breakdown by risk category"
      >
        {/* All PE Risks */}
        <Collapsible open={peOpen} onOpenChange={setPeOpen} className="mb-4">
          <div className="border rounded-lg overflow-hidden">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 bg-muted/30">
                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-4 h-4 transition-transform ${peOpen ? "" : "-rotate-90"}`} />
                  <span className="font-medium">All PE Risks (0)</span>
                </div>
                <Button size="sm" variant="outline">🔗 Open PE</Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>VIOLATION</TableHead>
                    <TableHead>SEVERITY</TableHead>
                    <TableHead>ENTITY</TableHead>
                    <TableHead>OWNER</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No PE risks found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* All SAS Resources */}
        <Collapsible open={sasOpen} onOpenChange={setSasOpen} className="mb-4">
          <div className="border rounded-lg overflow-hidden">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 bg-muted/30">
                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-4 h-4 transition-transform ${sasOpen ? "" : "-rotate-90"}`} />
                  <span className="font-medium">All SAS Resources (0)</span>
                </div>
                <Button size="sm" variant="outline">🔗 Open SAS</Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RESOURCE</TableHead>
                    <TableHead>TYPE</TableHead>
                    <TableHead>SEVERITIES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      No SAS resources found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* All Shepherd Issues */}
        <Collapsible open={shepherdOpen} onOpenChange={setShepherdOpen}>
          <div className="border rounded-lg overflow-hidden">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 bg-muted/30">
                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-4 h-4 transition-transform ${shepherdOpen ? "" : "-rotate-90"}`} />
                  <span className="font-medium">All Shepherd Issues (0)</span>
                </div>
                <Button size="sm" variant="outline">🔗 Open Shepherd</Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-8 text-center text-muted-foreground">
                No Shepherd issues found
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </ReportSection>

      {/* Section 4: Action Items */}
      <ReportSection
        icon={Bell}
        title="Action Required"
        description="Risks that need immediate attention, sorted by urgency"
      >
        <div className="p-8 bg-green-50 border border-green-100 rounded-lg">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-700 mb-1">No immediate action required</h3>
            <p className="text-sm text-green-600">All high-priority risks are acknowledged or resolved</p>
          </div>
        </div>
      </ReportSection>
    </ReportPageLayout>
  );
};

export default RiskSummary;
