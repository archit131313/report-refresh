import { useState } from "react";
import { BarChart3, Eye, Download, Calendar, AlertCircle, TrendingDown, Search, Filter } from "lucide-react";
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
      <div className="p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground mb-6">View and manage all generated reports</p>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reports by ID or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
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
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">Report ID: {report.id}</h3>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Created {report.createdAt}</p>
                      <Badge variant="outline" className="bg-blue-50 text-primary border-blue-200">
                        {report.resolverGroup}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      Start Date
                    </div>
                    <p className="font-semibold">{report.startDate}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      End Date
                    </div>
                    <p className="font-semibold">{report.endDate}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center gap-1 text-xs text-red-600 mb-1">
                      <AlertCircle className="w-3 h-3" />
                      High Severity
                    </div>
                    <p className="font-semibold text-2xl text-red-600">{report.highSeverity}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="flex items-center gap-1 text-xs text-amber-600 mb-1">
                      <TrendingDown className="w-3 h-3" />
                      Low Severity
                    </div>
                    <p className="font-semibold text-2xl text-amber-600">{report.lowSeverity}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
