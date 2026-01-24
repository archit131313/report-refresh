import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Workflow } from "./types";

interface WorkflowSectionProps {
  workflows: Workflow[];
}

const WorkflowSection = ({ workflows }: WorkflowSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (workflows.length === 0) {
    return null;
  }

  return (
    <div className="py-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors w-full text-left"
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
        <LayoutGrid className="w-4 h-4 text-blue-500" />
        <span>Workflows</span>
      </button>

      {isOpen && (
        <div className="mt-3 ml-6 space-y-4">
          {workflows.map((workflow) => {
            const lowSuccessCCs = workflow.consistencyChecks.filter(cc => cc.successRate <= 30);
            const allPassing = lowSuccessCCs.length === 0;
            
            // Get the lowest success rate for display
            const lowestRate = lowSuccessCCs.length > 0 
              ? Math.min(...lowSuccessCCs.map(cc => cc.successRate))
              : workflow.overallSuccessRate;

            return (
              <div key={workflow.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">{workflow.name}</p>
                    <span className="text-xs text-muted-foreground">
                      Overall: {workflow.overallSuccessRate}%
                    </span>
                  </div>
                  {!allPassing && (
                    <Badge className="bg-red-100 text-red-700 border-0 text-xs font-medium">
                      LOW SUCCESS RATE ({lowestRate}%)
                    </Badge>
                  )}
                </div>

                {allPassing ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-2 rounded-md">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All workflows passing (no steps with ≤30% success rate)</span>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                      <XCircle className="w-4 h-4" />
                      <span>Steps with &lt;30% Success Rate ({lowSuccessCCs.length}):</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {lowSuccessCCs.map((cc) => (
                        <div key={cc.name} className="bg-white rounded-md p-2.5 border border-red-100">
                          <p className="text-sm font-medium text-foreground">{cc.name}</p>
                          <p className="text-xs text-red-600 mt-0.5">
                            Success Rate: {cc.passed}/{cc.total} ({cc.successRate}%)
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkflowSection;