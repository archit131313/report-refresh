import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportInfo from "@/components/reports/ReportInfo";
import StatsCard from "@/components/reports/StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ticketTrendData = [
  { date: "2026-01-01", Total: 45, "Lost Featured Offer": 40, "Alarm-AutoCut": 0, "SAS Risk": 0, "Policy Engine Risk": 0, "Datapath Permission Request": 0, Cradle: 4, Other: 1 },
  { date: "2026-01-02", Total: 2, "Lost Featured Offer": 0, "Alarm-AutoCut": 0, "SAS Risk": 0, "Policy Engine Risk": 0, "Datapath Permission Request": 0, Cradle: 1, Other: 1 },
  { date: "2026-01-03", Total: 6, "Lost Featured Offer": 2, "Alarm-AutoCut": 1, "SAS Risk": 0, "Policy Engine Risk": 0, "Datapath Permission Request": 1, Cradle: 1, Other: 1 },
  { date: "2026-01-04", Total: 14, "Lost Featured Offer": 8, "Alarm-AutoCut": 2, "SAS Risk": 1, "Policy Engine Risk": 1, "Datapath Permission Request": 0, Cradle: 1, Other: 1 },
  { date: "2026-01-05", Total: 16, "Lost Featured Offer": 10, "Alarm-AutoCut": 2, "SAS Risk": 1, "Policy Engine Risk": 1, "Datapath Permission Request": 0, Cradle: 1, Other: 1 },
  { date: "2026-01-06", Total: 15, "Lost Featured Offer": 8, "Alarm-AutoCut": 1, "SAS Risk": 1, "Policy Engine Risk": 1, "Datapath Permission Request": 1, Cradle: 2, Other: 1 },
  { date: "2026-01-07", Total: 18, "Lost Featured Offer": 10, "Alarm-AutoCut": 2, "SAS Risk": 1, "Policy Engine Risk": 1, "Datapath Permission Request": 0, Cradle: 3, Other: 1 },
  { date: "2026-01-08", Total: 17, "Lost Featured Offer": 9, "Alarm-AutoCut": 1, "SAS Risk": 0, "Policy Engine Risk": 0, "Datapath Permission Request": 0, Cradle: 6, Other: 1 },
];

const resolutionTrendData = [
  { date: "2026-01-01", Incoming: 45, Open: 6, "Manual Resolved": 2, "Auto Resolved": 1 },
  { date: "2026-01-02", Incoming: 2, Open: 6, "Manual Resolved": 0, "Auto Resolved": 0 },
  { date: "2026-01-03", Incoming: 6, Open: 7, "Manual Resolved": 1, "Auto Resolved": 0 },
  { date: "2026-01-04", Incoming: 14, Open: 7, "Manual Resolved": 1, "Auto Resolved": 9 },
  { date: "2026-01-05", Incoming: 16, Open: 8, "Manual Resolved": 1, "Auto Resolved": 13 },
  { date: "2026-01-06", Incoming: 15, Open: 7, "Manual Resolved": 2, "Auto Resolved": 13 },
  { date: "2026-01-07", Incoming: 18, Open: 9, "Manual Resolved": 1, "Auto Resolved": 13 },
  { date: "2026-01-08", Incoming: 17, Open: 11, "Manual Resolved": 1, "Auto Resolved": 13 },
];

const categories = [
  { name: "Lost Featured Offer", count: 70, color: "border-l-red-500" },
  { name: "Cradle", count: 46, color: "border-l-purple-500" },
  { name: "Alarm-AutoCut", count: 8, color: "border-l-green-500" },
  { name: "Other", count: 6, color: "border-l-gray-500" },
  { name: "Policy Engine Risk", count: 3, color: "border-l-blue-500" },
  { name: "SAS Risk", count: 3, color: "border-l-cyan-500" },
  { name: "Datapath Permission Request", count: 2, color: "border-l-indigo-500" },
];

const LowSevAnalysis = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <Link
          to="/reports"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Report Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-1">Low Sev Trend Analysis</h1>
        <p className="text-muted-foreground mb-6">Report ID: e286f3d6</p>

        <ReportInfo
          dateRange="2026-01-01 to 2026-01-08 (8 days)"
          severity="LOW (SEV_3, SEV_4, SEV_5)"
          severityType="low"
          resolverGroups="FMA-FeaturedOffer, FMA-Business"
          totalTickets={137}
          createdAt="2026-01-15 18:44:21"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard value="137" label="Total Low Sev Tickets" />
          <StatsCard value="16" label="Open Tickets" />
          <StatsCard value="4.7h" label="SDE Hrs Saved by Auto Resolving" />
        </div>

        {/* Tickets Trend Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-1">Tickets Trend Over Time</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Daily ticket count by category - Click legend items to show/hide categories
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Total" stroke="#000" strokeWidth={2} dot />
                <Line type="monotone" dataKey="Lost Featured Offer" stroke="#ef4444" />
                <Line type="monotone" dataKey="Alarm-AutoCut" stroke="#22c55e" />
                <Line type="monotone" dataKey="SAS Risk" stroke="#06b6d4" />
                <Line type="monotone" dataKey="Policy Engine Risk" stroke="#3b82f6" />
                <Line type="monotone" dataKey="Datapath Permission Request" stroke="#6366f1" />
                <Line type="monotone" dataKey="Cradle" stroke="#a855f7" />
                <Line type="monotone" dataKey="Other" stroke="#6b7280" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Resolution Trend Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-1">Ticket Resolution Trends</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Daily breakdown of incoming, open, and resolved tickets
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Incoming" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Open" stroke="#ef4444" />
                <Line type="monotone" dataKey="Manual Resolved" stroke="#22c55e" />
                <Line type="monotone" dataKey="Auto Resolved" stroke="#a855f7" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-1">View Tickets by Category</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Click on any category to view all tickets in that category
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`flex items-center justify-between p-4 border-l-4 ${cat.color} bg-muted/30 rounded-r-lg hover:bg-muted/50 cursor-pointer transition-colors`}
              >
                <div>
                  <p className="font-medium text-foreground">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">{cat.count} tickets</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LowSevAnalysis;
