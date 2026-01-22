export interface ConsistencyCheck {
  name: string;
  successRate: number;
  passed: number;
  total: number;
}

export interface Workflow {
  name: string;
  overallSuccessRate: number;
  consistencyChecks: ConsistencyCheck[];
}

export interface CodeReview {
  id: string;
  author: string;
  description: string;
  deployedTo: string[];
}

export interface CommitWithoutCR {
  package: string;
  author: string;
  description: string;
  commitHash: string;
}

export interface Pipeline {
  name: string;
  status: "Available" | "Blocked" | "Unhealthy";
  failedBuilds: number;
  failedTests: number;
  blocked: boolean;
  workflows: Workflow[];
  codeReviews: CodeReview[];
  commitsWithoutCR: CommitWithoutCR[];
}
