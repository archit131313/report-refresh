import { useState } from "react";
import { ChevronDown, ChevronRight, GitCommit, User, ExternalLink, FileCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodeReview, CommitWithoutCR } from "./types";

interface DeployedCodeSectionProps {
  codeReviews: CodeReview[];
  commitsWithoutCR: CommitWithoutCR[];
}

const DeployedCodeSection = ({ codeReviews, commitsWithoutCR }: DeployedCodeSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCRs, setExpandedCRs] = useState<Set<string>>(new Set());

  const toggleCR = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedCRs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCRs(newExpanded);
  };

  if (codeReviews.length === 0 && commitsWithoutCR.length === 0) {
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
        <GitCommit className="w-4 h-4 text-orange-500" />
        <span>Deployed Code</span>
      </button>

      {isOpen && (
        <div className="mt-3 ml-6 space-y-4">
          {/* Code Reviews */}
          {codeReviews.map((cr) => (
            <div key={cr.id} className="border rounded-lg overflow-hidden bg-card">
              <button
                onClick={(e) => toggleCR(cr.id, e)}
                className="w-full flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
              >
                {expandedCRs.has(cr.id) ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                      📄 {cr.id}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                      Deployed to: {cr.deployedTo.join(", ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{cr.author}</span>
                    <span className="mx-1">·</span>
                    <span className="truncate">{cr.description}</span>
                  </div>
                </div>
              </button>

              {/* Expanded file changes */}
              {expandedCRs.has(cr.id) && cr.fileChanges && cr.fileChanges.length > 0 && (
                <div className="border-t bg-muted/30 p-3">
                  <div className="space-y-1.5">
                    {cr.fileChanges.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-1.5 px-2 rounded hover:bg-muted/50">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileCode className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="truncate text-foreground">{file.fileName}</span>
                        </div>
                        <span className="text-xs font-mono text-blue-600 flex items-center gap-1 hover:underline cursor-pointer shrink-0">
                          {file.commitHash}
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Commits without CR */}
          {commitsWithoutCR.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Commits without CR:</p>
              {commitsWithoutCR.map((commit, idx) => (
                <div key={idx} className="bg-muted/30 rounded-lg p-3 border">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{commit.package}</p>
                    <span className="text-xs font-mono text-blue-600 flex items-center gap-1 hover:underline cursor-pointer">
                      {commit.commitHash.slice(0, 12)}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{commit.author}</span>
                    <span className="mx-1">·</span>
                    <span className="truncate">{commit.description}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeployedCodeSection;