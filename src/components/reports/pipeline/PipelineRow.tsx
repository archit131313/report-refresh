import { useState } from "react";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import WorkflowSection from "./WorkflowSection";
import DeployedCodeSection from "./DeployedCodeSection";
import { Pipeline } from "./types";

interface PipelineRowProps {
  pipeline: Pipeline;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700 border-0 hover:bg-green-100";
    case "Blocked":
      return "bg-red-100 text-red-700 border-0 hover:bg-red-100";
    case "Unhealthy":
      return "bg-yellow-100 text-yellow-700 border-0 hover:bg-yellow-100";
    default:
      return "bg-muted text-muted-foreground border-0";
  }
};

const PipelineRow = ({ pipeline }: PipelineRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if override/deploy is trending up or down (mock logic)
  const isOverrideUp = pipeline.overrideDeploy > 0.5;

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
            <span className="truncate">{pipeline.name}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge className={getStatusBadgeClass(pipeline.status)}>
            {pipeline.status}
          </Badge>
        </TableCell>
        <TableCell className="text-center">{pipeline.avgTimeToProdHrs.toFixed(1)}%</TableCell>
        <TableCell className="text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={`inline-flex items-center gap-1 ${isOverrideUp ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {pipeline.overrideDeploy.toFixed(3)}
                  {isOverrideUp && <TrendingUp className="w-3 h-3" />}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Override/Deploy ratio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="text-center">{pipeline.deployFrequency}</TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow>
          <TableCell colSpan={5} className="bg-muted/20 p-4 border-l-2 border-primary/30">
            <div className="space-y-4 ml-2">
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