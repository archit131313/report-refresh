import { ArrowLeft, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
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
import DashboardLayout from "@/components/layout/DashboardLayout";

const RiskSummary = () => {
  const { reportId } = useParams();
  const [peOpen, setPeOpen] = useState(true);
  const [sasOpen, setSasOpen] = useState(true);
  const [shepherdOpen, setShepherdOpen] = useState(false);

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

        <h1 className="text-3xl font-bold text-foreground mb-1">Risk Summary</h1>
        <p className="text-muted-foreground mb-6">Report ID: e286f3d6 | Owners: preggnas, gnguyen</p>

        {/* Warning Alert */}
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Note:</strong> Risk data was not available during report generation. Please regenerate the report to fetch current risk data.
          </AlertDescription>
        </Alert>

        {/* Risk Health Overview */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            <h2 className="font-semibold text-foreground">Risk Health Overview</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">TOTAL OPEN RISKS</p>
              <p className="text-3xl font-bold">0</p>
            </Card>
            <Card className="p-4 text-center border-amber-200 bg-amber-50">
              <p className="text-xs text-amber-600 mb-1">⚠️ NEEDS IMMEDIATE ACTION</p>
              <p className="text-3xl font-bold text-amber-600">0</p>
              <p className="text-xs text-amber-500">0 PE + 0 SAS + 0 Shepherd</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">POLICY ENGINE</p>
              <p className="text-3xl font-bold">0 <span className="text-sm font-normal text-muted-foreground">(0 unacknowledged)</span></p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">SAS</p>
              <p className="text-3xl font-bold">0 <span className="text-sm font-normal text-muted-foreground">(0 critical/high)</span></p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">SHEPHERD</p>
              <p className="text-3xl font-bold">0 <span className="text-sm font-normal text-muted-foreground">(0 blocking)</span></p>
            </Card>
          </div>
        </Card>

        {/* Action Required */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🚨</span>
            <h2 className="font-semibold text-foreground">Action Required</h2>
            <p className="text-sm text-muted-foreground">Risks that need immediate attention, sorted by urgency</p>
          </div>

          <Card className="p-8 bg-green-50 border-green-100">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-700 mb-1">No immediate action required</h3>
              <p className="text-sm text-green-600">All high-priority risks are acknowledged or resolved</p>
            </div>
          </Card>
        </div>

        {/* All PE Risks */}
        <Collapsible open={peOpen} onOpenChange={setPeOpen} className="mb-4">
          <Card className="overflow-hidden">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-4 h-4 transition-transform ${peOpen ? "" : "-rotate-90"}`} />
                  <span className="font-medium">All PE Risks (0)</span>
                </div>
                <Button size="sm" className="bg-primary">🔗 Open PE</Button>
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
          </Card>
        </Collapsible>

        {/* All SAS Resources */}
        <Collapsible open={sasOpen} onOpenChange={setSasOpen} className="mb-4">
          <Card className="overflow-hidden">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-4 h-4 transition-transform ${sasOpen ? "" : "-rotate-90"}`} />
                  <span className="font-medium">All SAS Resources (0)</span>
                </div>
                <Button size="sm" className="bg-primary">🔗 Open SAS</Button>
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
          </Card>
        </Collapsible>

        {/* All Shepherd Issues */}
        <Collapsible open={shepherdOpen} onOpenChange={setShepherdOpen}>
          <Card className="overflow-hidden">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <ChevronRight className={`w-4 h-4 transition-transform ${shepherdOpen ? "rotate-90" : ""}`} />
                  <span className="font-medium">All Shepherd Issues (0)</span>
                </div>
                <Button size="sm" className="bg-primary">🔗 Open Shepherd</Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-8 text-center text-muted-foreground">
                No Shepherd issues found
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </DashboardLayout>
  );
};

export default RiskSummary;
