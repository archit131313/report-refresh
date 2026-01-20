import { ArrowLeft, Download, ChevronRight, AlertCircle, TrendingUp, Clock, Heart, Wrench, ShieldAlert, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";

const reportCards = [
  {
    id: "high-sev",
    title: "High Sev Report",
    description: "AI-powered analysis of high severity tickets with detailed impact, root cause, and resolution insights.",
    icon: AlertCircle,
    color: "from-red-100 via-red-50 to-pink-50",
    iconColor: "text-red-500",
    borderColor: "hover:border-red-200",
    path: "high-sev",
  },
  {
    id: "low-sev",
    title: "Low Sev Trend Analysis",
    description: "Track patterns and trends in low severity tickets over time to identify recurring issues.",
    icon: TrendingUp,
    color: "from-green-100 via-green-50 to-emerald-50",
    iconColor: "text-green-500",
    borderColor: "hover:border-green-200",
    path: "low-sev",
  },
  {
    id: "oldest",
    title: "Top 10 Oldest Tickets",
    description: "Identifies the 10 oldest open tickets that are older than 6 months and require immediate attention.",
    icon: Clock,
    color: "from-amber-100 via-amber-50 to-yellow-50",
    iconColor: "text-amber-500",
    borderColor: "hover:border-amber-200",
    path: "oldest-tickets",
  },
  {
    id: "service-health",
    title: "Service Health",
    description: "Monitor MBOS API p50 latency across DPX and SX regions to track service performance.",
    icon: Heart,
    color: "from-cyan-100 via-cyan-50 to-sky-50",
    iconColor: "text-cyan-500",
    borderColor: "hover:border-cyan-200",
    path: "service-health",
  },
  {
    id: "pipeline",
    title: "Pipeline Health",
    description: "Monitor FMA pipeline deployment health including failed builds, tests, and blocked pipelines.",
    icon: Wrench,
    color: "from-teal-100 via-teal-50 to-emerald-50",
    iconColor: "text-teal-500",
    borderColor: "hover:border-teal-200",
    path: "pipeline-health",
  },
  {
    id: "risk",
    title: "Risk Summary",
    description: "Track and manage security risks across Policy Engine, SAS, and Shepherd with action plans.",
    icon: ShieldAlert,
    color: "from-orange-100 via-orange-50 to-amber-50",
    iconColor: "text-orange-500",
    borderColor: "hover:border-orange-200",
    path: "risk-summary",
  },
];

const ReportDashboard = () => {
  const { reportId } = useParams();

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/reports"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Reports
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Report Dashboard</h1>
            <p className="text-muted-foreground mt-1">Report ID: {reportId}</p>
          </div>
          <Button variant="outline" className="gap-2 rounded-xl h-11 px-5 shadow-sm hover:shadow-md transition-shadow">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Weekly Report Summary Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center ring-1 ring-primary/10">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-1">Weekly Report Summary</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consolidated weekly oncall report with tickets summary, reviews, operational health metrics, service latency, and handover notes.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Card>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.id} to={`/reports/${reportId}/${card.path}`}>
                <Card
                  className={`group p-6 h-full bg-gradient-to-br ${card.color} border border-transparent ${card.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform">
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportDashboard;
