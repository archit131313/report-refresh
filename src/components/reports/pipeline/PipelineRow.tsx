import { useState } from "react";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import WorkflowSection from "./WorkflowSection";
import DeployedCodeSection from "./DeployedCodeSection";
import { Pipeline } from "./types";

interface PipelineRowProps {
  pipeline: Pipeline;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 shadow-sm";
    case "Blocked":
      return "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 shadow-sm";
    case "Unhealthy":
      return "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 shadow-sm";
    default:
      return "bg-muted text-muted-foreground border-0";
  }
};

const PipelineRow = ({ pipeline }: PipelineRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if override/deploy is trending up or down
  const isOverrideUp = pipeline.overrideDeploy > 0.5;
  const isBlocked = pipeline.status === "Blocked";

  return (
    <>
      <TableRow 
        className={cn(
          "cursor-pointer transition-all duration-200 group",
          "hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent",
          isExpanded && "bg-muted/30",
          isBlocked && "bg-red-50/30"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="font-medium py-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-1 rounded-md transition-colors duration-200",
              "group-hover:bg-primary/10",
              isExpanded && "bg-primary/10"
            )}>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              )}
            </div>
            <span className={cn(
              "truncate font-semibold text-foreground/90 group-hover:text-foreground transition-colors",
              isBlocked && "text-red-700"
            )}>
              {pipeline.name}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-4">
          <Badge className={cn(getStatusBadgeClass(pipeline.status), "font-medium text-xs px-3 py-1")}>
            {pipeline.status}
          </Badge>
        </TableCell>
        <TableCell className="text-center py-4">
          <span className={cn(
            "font-mono text-sm px-2 py-1 rounded-md transition-colors",
            "group-hover:bg-muted"
          )}>
            {pipeline.avgTimeToProdHrs.toFixed(1)}
          </span>
        </TableCell>
        <TableCell className="text-center py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={cn(
                  "inline-flex items-center gap-1.5 font-mono text-sm px-2 py-1 rounded-md transition-all",
                  "group-hover:bg-muted cursor-help",
                  isOverrideUp ? 'text-emerald-600 font-semibold' : 'text-muted-foreground'
                )}>
                  {pipeline.overrideDeploy.toFixed(3)}
                  {isOverrideUp && <TrendingUp className="w-3.5 h-3.5" />}
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-popover border shadow-lg">
                <p className="text-sm">Override/Deploy ratio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="text-center py-4">
          <span className={cn(
            "font-mono text-sm px-2 py-1 rounded-md transition-colors",
            "group-hover:bg-muted"
          )}>
            {pipeline.deployFrequency}
          </span>
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow className="bg-gradient-to-r from-muted/40 to-muted/20">
          <TableCell colSpan={5} className="p-0">
            <div className="border-l-4 border-primary/40 pl-6 pr-4 py-5 ml-4">
              <div className="space-y-5">
                <WorkflowSection workflows={pipeline.workflows} />
                <DeployedCodeSection 
                  codeReviews={pipeline.codeReviews}
                  commitsWithoutCR={pipeline.commitsWithoutCR}
                />
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default PipelineRow;