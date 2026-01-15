import { ArrowLeft, FileDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportHeaderProps {
  title: string;
  dateRange: string;
  reportId: string;
}

const ReportHeader = ({ title, dateRange, reportId }: ReportHeaderProps) => {
  return (
    <div className="mb-8">
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Reports Dashboard
      </button>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {dateRange} • Report ID: {reportId}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <FileDown className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
