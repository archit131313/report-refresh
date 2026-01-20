import { ArrowLeft, Download, ChevronRight, AlertCircle, TrendingUp, Clock, Heart, Wrench, ShieldAlert, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";

const reportCards = [
  {
    id: "high-sev",
    title: "High Sev Report",
    description: "AI-powered analysis of high severity tickets with detailed impact, root cause, and resolution insights.",
    icon: AlertCircle,
    color: "bg-red-50",
    iconBg: "bg-white",
    iconColor: "text-red-500",
    path: "/reports/high-sev",
  },
  {
    id: "low-sev",
    title: "Low Sev Trend Analysis",
    description: "Track patterns and trends in low severity tickets over time to identify recurring issues.",
    icon: TrendingUp,
    color: "bg-green-50",
    iconBg: "bg-white",
    iconColor: "text-green-500",
    path: "/reports/low-sev",
  },
  {
    id: "oldest",
    title: "Top 10 Oldest Tickets",
    description: "Identifies the 10 oldest open tickets in the resolver group that are older than 6 months and require immediate attention to reduce backlog.",
    icon: Clock,
    color: "bg-amber-50",
    iconBg: "bg-white",
    iconColor: "text-amber-500",
    path: "/reports/oldest-tickets",
  },
  {
    id: "service-health",
    title: "Service Health",
    description: "Monitor MBOS API p50 latency across DPX and SX regions to track service performance.",
    icon: Heart,
    color: "bg-cyan-50",
    iconBg: "bg-white",
    iconColor: "text-cyan-500",
    path: "/reports/service-health",
  },
  {
    id: "pipeline",
    title: "Pipeline Health",
    description: "Monitor FMA pipeline deployment health including failed builds, tests, blocked pipelines, and interventions.",
    icon: Wrench,
    color: "bg-emerald-50",
    iconBg: "bg-white",
    iconColor: "text-emerald-500",
    path: "/reports/pipeline-health",
  },
  {
    id: "risk",
    title: "Risk Summary",
    description: "Track and manage security risks across Policy Engine, SAS, and Shepherd with action plans and status tracking.",
    icon: ShieldAlert,
    color: "bg-orange-50",
    iconBg: "bg-white",
    iconColor: "text-orange-500",
    path: "/reports/risk-summary",
  },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Report Dashboard</h1>
            <p className="text-muted-foreground">Report ID: 41cb455f</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Weekly Report Summary Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">Weekly Report Summary</h2>
              <p className="text-sm text-muted-foreground">
                Consolidated weekly oncall report with tickets summary, reviews, operational health metrics, service latency, and handover notes. Ready for publishing.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.id} to={card.path}>
                <Card
                  className={`p-6 h-full ${card.color} border-0 hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
