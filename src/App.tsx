import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Reports from "./pages/Reports";
import LowSevAnalysis from "./pages/reports/LowSevAnalysis";
import HighSevAnalysis from "./pages/reports/HighSevAnalysis";
import OldestTickets from "./pages/reports/OldestTickets";
import ServiceHealth from "./pages/reports/ServiceHealth";
import PipelineHealth from "./pages/reports/PipelineHealth";
import RiskSummary from "./pages/reports/RiskSummary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/low-sev" element={<LowSevAnalysis />} />
          <Route path="/reports/high-sev" element={<HighSevAnalysis />} />
          <Route path="/reports/oldest-tickets" element={<OldestTickets />} />
          <Route path="/reports/service-health" element={<ServiceHealth />} />
          <Route path="/reports/pipeline-health" element={<PipelineHealth />} />
          <Route path="/reports/risk-summary" element={<RiskSummary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
