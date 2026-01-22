import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Workflow, ConsistencyCheck } from "./types";

interface WorkflowSectionProps {
  workflows: Workflow[];
}

const WorkflowSection = ({ workflows }: WorkflowSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if any workflow has CCs failing >30% (success rate ≤70%)
  const hasFailingCCs = workflows.some(w => 
    w.consistencyChecks.some(cc => cc.successRate <= 30)
  );

  const failingCCsCount = workflows.reduce((acc, w) => 
    acc + w.consistencyChecks.filter(cc => cc.successRate <= 30).length, 0
  );

  return (
    <div className="border-l-2 border-muted pl-4 py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
          {workflows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No workflows found</p>
          ) : (
            workflows.map((workflow) => {
              const lowSuccessCCs = workflow.consistencyChecks.filter(cc => cc.successRate <= 30);
              const allPassing = lowSuccessCCs.length === 0;

              return (
                <div key={workflow.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{workflow.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Overall: {workflow.overallSuccessRate}%
                      </p>
                    </div>
                    {!allPassing && (
                      <Badge className="bg-red-100 text-red-700 border-0">
                        LOW SUCCESS RATE
                      </Badge>
                    )}
                  </div>

                  {allPassing ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>All workflows passing (no steps with ≤30% success rate)</span>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                        <XCircle className="w-4 h-4" />
                        <span>Steps with ≤30% Success Rate ({lowSuccessCCs.length}):</span>
                      </div>
                      <div className="ml-6 space-y-1.5">
                        {lowSuccessCCs.map((cc) => (
                          <div key={cc.name} className="bg-white rounded p-2 border border-red-100">
                            <p className="text-sm font-medium text-foreground">{cc.name}</p>
                            <p className="text-xs text-red-600">
                              Success Rate: {cc.passed}/{cc.total} ({cc.successRate}%)
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default WorkflowSection;
