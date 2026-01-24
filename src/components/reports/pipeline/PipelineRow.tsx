import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
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
          <span className="font-mono text-sm text-muted-foreground">
            {pipeline.avgTimeToProdHrs.toFixed(1)}h
          </span>
        </TableCell>
        <TableCell className="text-center py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={cn(
                  "inline-flex items-center gap-1.5 font-mono text-sm cursor-help",
                  pipeline.overrideDeploy > 0 ? 'text-orange-500 font-medium' : 'text-muted-foreground'
                )}>
                  {pipeline.overrideDeploy.toFixed(3)}
                  {pipeline.overrideDeploy > 0 && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-popover border shadow-lg">
                <p className="text-sm">Override/Deploy ratio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="text-center py-4">
          <span className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{pipeline.deployFrequency.toFixed(1)}</span>
            <span className="text-muted-foreground">/week</span>
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