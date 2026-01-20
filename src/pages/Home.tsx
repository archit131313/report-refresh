import { FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">FMA Ops Dashboard</h1>
          <p className="text-muted-foreground mb-8">AI-Powered Ticket Analysis & Reporting</p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/generate">
                Generate Report <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/reports">View Reports</Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
