import ReportHeader from "@/components/report/ReportHeader";
import SectionNav from "@/components/report/SectionNav";
import ReportCard from "@/components/report/ReportCard";
import DataTable from "@/components/report/DataTable";
import OncallInfo from "@/components/report/OncallInfo";
import CommentarySection from "@/components/report/CommentarySection";
import LatencyCard from "@/components/report/LatencyCard";

const sections = [
  { id: "oncall", label: "Oncall Info" },
  { id: "tickets", label: "Tickets Summary" },
  { id: "reviews", label: "Reviews & Escalations" },
  { id: "health", label: "Health Metrics" },
  { id: "latency", label: "Service Latency" },
  { id: "backlog", label: "Backlog" },
  { id: "commentary", label: "Commentary" },
];

const oncallData = [
  { location: "Seattle", primary: "bhavneep_bhola, jayeann_sanjabi", secondary: "bhavneej_solarship" },
  { location: "Bangalore", primary: "krithik_nsharat", secondary: "smryzne_sisengm" },
];

const ticketsColumns = [
  { key: "metric", label: "Metric", align: "left" as const },
  { key: "bangalore", label: "Bangalore", align: "center" as const },
  { key: "seattle", label: "Seattle", align: "center" as const },
  { key: "total", label: "Total", align: "right" as const },
];

const ticketsData = [
  { metric: "Incoming Sev-2", bangalore: 0, seattle: 1, total: 1 },
  { metric: "Resolved Sev-2", bangalore: 0, seattle: 1, total: 1 },
  { metric: "Incoming Low Sev (3+5)", bangalore: 94, seattle: 43, total: 137 },
  { metric: "Resolved Low Sev (Manual)", bangalore: 0, seattle: 6, total: 6 },
  { metric: "Resolved Low Sev (Auto-closed)", bangalore: 87, seattle: 34, total: 121 },
  { metric: "Open Sev-2", bangalore: 0, seattle: 0, total: 0 },
  { metric: "Open Low Sev (3-5)", bangalore: 12, seattle: 4, total: 16 },
];

const reviewsColumns = [
  { key: "type", label: "Type", align: "left" as const },
  { key: "bangalore", label: "Bangalore", align: "center" as const },
  { key: "seattle", label: "Seattle", align: "center" as const },
  { key: "total", label: "Total", align: "right" as const },
];

const reviewsData = [
  { type: "MCM Reviews", bangalore: "<", seattle: 0, total: 0 },
  { type: "CR Reviews", bangalore: "<", seattle: 0, total: 0 },
  { type: "Escalations", bangalore: "<", seattle: 0, total: 0 },
  { type: "Permissions Granted", bangalore: 0, seattle: 0, total: 0 },
];

const healthColumns = [
  { key: "metric", label: "Metric", align: "left" as const },
  { key: "bangalore", label: "Bangalore", align: "center" as const },
  { key: "seattle", label: "Seattle", align: "center" as const },
  { key: "total", label: "Total", align: "right" as const },
];

const healthData = [
  { metric: "Policy Engine Risks", bangalore: 1, seattle: 2, total: 3 },
  { metric: "SAS Risks", bangalore: 3, seattle: 2, total: 5 },
  { metric: "Shepherd - Critical Severity", bangalore: 0, seattle: 0, total: 0 },
  { metric: "Shepherd - High Severity", bangalore: 0, seattle: 0, total: 0 },
];

const incompleteColumns = [
  { key: "metric", label: "Metric", align: "left" as const },
  { key: "current", label: "Current", align: "center" as const },
  { key: "t1", label: "T-1", align: "center" as const },
  { key: "t2", label: "T-2", align: "center" as const },
  { key: "total", label: "Total", align: "right" as const },
];

const incompleteData = [
  { metric: "COE Incomplete Als", current: 0, t1: 0, t2: 0, total: "-" },
  { metric: "Long Running Modops (>180d)", current: 0, t1: 0, t2: 0, total: "-" },
];

const mbosLatencyData = [
  { region: "NA", p50: 58.78, p99: 58.22, change: "-1.28" },
  { region: "EU", p50: 43.74, p99: 86.92, change: "-2.81" },
  { region: "FE", p50: 57.79, p99: 80.96, change: "-0.83" },
];

const mosWinnersLatencyData = [
  { region: "NA", p50: 26.83, p99: 20.43, change: "-0.12" },
  { region: "EU", p50: 16.74, p99: 16.44, change: "-2.70" },
  { region: "FE", p50: 38.13, p99: 23.92, change: "+0.03" },
];

const backlogColumns = [
  { key: "oncall", label: "Oncall", align: "left" as const },
  { key: "dpfx", label: "DPFX", align: "center" as const },
  { key: "created", label: "Created", align: "center" as const },
  { key: "resolved", label: "Resolved", align: "right" as const },
];

const backlogData = [
  { oncall: "Bangalore", dpfx: 4, created: 0, resolved: 3 },
  { oncall: "Seattle", dpfx: 4, created: 0, resolved: 3 },
];

const commentaryFields = [
  { id: "handover-bangalore", label: "Handover Notes (Bangalore)", placeholder: "Enter handover notes..." },
  { id: "handover-seattle", label: "Handover Notes (Seattle)", placeholder: "Enter handover notes..." },
  { id: "highlights-bangalore", label: "Highlights (Bangalore)", placeholder: "Enter highlights..." },
  { id: "highlights-seattle", label: "Highlights (Seattle)", placeholder: "Enter highlights..." },
  { id: "lowlights-bangalore", label: "Low Lights (Bangalore)", placeholder: "Enter low lights..." },
  { id: "lowlights-seattle", label: "Low Lights (Seattle)", placeholder: "Enter low lights..." },
];

const prioritiesFields = [
  { id: "priorities", label: "Next Week Focus (Top 3 Priorities)", placeholder: "1.\n2.\n3." },
];

const blockerWinsFields = [
  { id: "blockers", label: "Blockers", placeholder: "List any blockers..." },
  { id: "wins", label: "Wins", placeholder: "List any wins..." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportHeader
          title="FOS Weekly Report Summary"
          dateRange="Week of 2026-01-06 to 2026-01-13"
          reportId="0323277"
        />
        
        <SectionNav sections={sections} />
        
        <div className="space-y-8">
          <ReportCard id="oncall" title="Oncall Information">
            <OncallInfo data={oncallData} />
          </ReportCard>

          <ReportCard id="tickets" title="Tickets Summary">
            <DataTable columns={ticketsColumns} data={ticketsData} highlightColumn="total" />
          </ReportCard>

          <ReportCard id="reviews" title="Reviews & Escalations">
            <DataTable columns={reviewsColumns} data={reviewsData} highlightColumn="total" />
          </ReportCard>

          <ReportCard
            id="health"
            title="Operational Health Metrics"
            subtitle="& Decomposed / non-ticket race-chase available"
          >
            <div className="space-y-8">
              <DataTable columns={healthColumns} data={healthData} highlightColumn="total" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Incomplete Items Tracking</h3>
                <DataTable columns={incompleteColumns} data={incompleteData} />
              </div>
            </div>
          </ReportCard>

          <ReportCard id="latency" title="Service Latency Summary">
            <div className="flex flex-col lg:flex-row gap-8">
              <LatencyCard title="MBOS P50 Latency (ms)" data={mbosLatencyData} />
              <LatencyCard title="mosWinners P50 Latency (ms)" data={mosWinnersLatencyData} />
            </div>
          </ReportCard>

          <ReportCard id="backlog" title="Backlog Management">
            <DataTable columns={backlogColumns} data={backlogData} highlightColumn="resolved" />
          </ReportCard>

          <ReportCard id="commentary" title="Commentary">
            <div className="space-y-8">
              <CommentarySection fields={commentaryFields} />
              <CommentarySection fields={prioritiesFields} />
              <CommentarySection fields={blockerWinsFields} />
            </div>
          </ReportCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
