import { ArrowLeft, FileDown, Edit, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReportHeaderProps {
  title: string;
  dateRange: string;
  reportId: string;
}

const ReportHeader = ({ title, dateRange, reportId }: ReportHeaderProps) => {
  return (
    <div className="mb-8">
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Reports Dashboard
      </button>
      
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                <Calendar className="w-3.5 h-3.5" />
                {dateRange}
              </Badge>
              <Badge variant="outline" className="gap-1.5 px-3 py-1">
                <Hash className="w-3.5 h-3.5" />
                {reportId}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 shadow-sm hover:shadow-md transition-shadow">
              <FileDown className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 shadow-sm hover:shadow-md transition-shadow bg-primary hover:bg-primary/90">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
