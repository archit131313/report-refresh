import { useState } from "react";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import WorkflowSection from "./WorkflowSection";
import DeployedCodeSection from "./DeployedCodeSection";
import { Pipeline } from "./types";

interface PipelineRowProps {
  pipeline: Pipeline;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700 border-0";
    case "Blocked":
      return "bg-red-100 text-red-700 border-0";
    case "Unhealthy":
      return "bg-yellow-100 text-yellow-700 border-0";
    default:
      return "bg-muted text-muted-foreground border-0";
  }
};

const PipelineRow = ({ pipeline }: PipelineRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            {pipeline.name}
          </div>
        </TableCell>
        <TableCell>
          <Badge className={getStatusBadgeClass(pipeline.status)}>
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

      {isExpanded && (
        <TableRow>
          <TableCell colSpan={5} className="bg-muted/20 p-4">
            <div className="space-y-3">
              <WorkflowSection workflows={pipeline.workflows} />
              <DeployedCodeSection 
                codeReviews={pipeline.codeReviews}
                commitsWithoutCR={pipeline.commitsWithoutCR}
              />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default PipelineRow;
