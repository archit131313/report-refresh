import { useState } from "react";
import { BarChart3, Eye, Download, Calendar, AlertCircle, TrendingDown, Search, Filter, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";

const reports = [
  {
    id: "41cb455f",
    createdAt: "1/16/2026, 10:54 AM",
    resolverGroup: "FMA-FeaturedOffer",
    startDate: "2025-12-29",
    endDate: "2025-12-29",
    highSeverity: 0,
    lowSeverity: 9,
    status: "COMPLETED",
  },
  {
    id: "26f40d0d",
    createdAt: "1/16/2026, 12:19 AM",
    resolverGroup: "FMA-FeaturedOffer",
    startDate: "2025-12-29",
    endDate: "2025-12-29",
    highSeverity: 0,
    lowSeverity: 9,
    status: "COMPLETED",
  },
  {
    id: "e286f3d6",
    createdAt: "1/15/2026, 6:44 PM",
    resolverGroup: "FMA-FeaturedOffer",
    startDate: "2026-01-01",
    endDate: "2026-01-08",
    highSeverity: 1,
    lowSeverity: 137,
    status: "COMPLETED",
  },
];

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.resolverGroup.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === "all" || report.resolverGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground">View and manage all generated reports</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reports by ID or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 rounded-xl border-border/50 bg-card shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[200px] h-12 rounded-xl border-border/50 bg-card shadow-sm">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="FMA-FeaturedOffer">FMA-FeaturedOffer</SelectItem>
              <SelectItem value="FMA-Business">FMA-Business</SelectItem>
              <SelectItem value="FMA-Product">FMA-Product</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Report List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Link key={report.id} to={`/reports/${report.id}`}>
              <Card className="group p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur-sm">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/10">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground text-lg">Report ID: {report.id}</h3>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Created {report.createdAt}</p>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-medium">
                        {report.resolverGroup}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted" onClick={(e) => e.preventDefault()}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted" onClick={(e) => e.preventDefault()}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center ml-2 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5 uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5" />
                      Start Date
                    </div>
                    <p className="font-semibold text-foreground">{report.startDate}</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5 uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5" />
                      End Date
                    </div>
                    <p className="font-semibold text-foreground">{report.endDate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50/50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center gap-1.5 text-xs text-red-600 mb-1.5 uppercase tracking-wide">
                      <AlertCircle className="w-3.5 h-3.5" />
                      High Severity
                    </div>
                    <p className="font-bold text-2xl text-red-600">{report.highSeverity}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50/50 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 mb-1.5 uppercase tracking-wide">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Low Severity
                    </div>
                    <p className="font-bold text-2xl text-amber-600">{report.lowSeverity}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No reports found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
