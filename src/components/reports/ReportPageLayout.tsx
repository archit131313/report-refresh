import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface ReportPageLayoutProps {
  reportId: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const ReportPageLayout = ({
  reportId,
  title,
  subtitle,
  children,
}: ReportPageLayoutProps) => {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <Link
          to={`/reports/${reportId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Report Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="space-y-6">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportPageLayout;
