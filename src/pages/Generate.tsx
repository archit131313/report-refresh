import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/layout/DashboardLayout";

const resolverGroups = [
  "FMA-FeaturedOffer",
  "FMA-Business",
  "FMA-Product",
  "fma-fos-primary",
];

const Generate = () => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("2025-12-21");
  const [endDate, setEndDate] = useState("2026-01-20");

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group)
        ? prev.filter((g) => g !== group)
        : [...prev, group]
    );
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Generate Report</h1>
        <p className="text-muted-foreground mb-8">
          Create AI-powered analysis for all severity levels
        </p>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-4 block">
              Resolver Groups (select one or more)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {resolverGroups.map((group) => (
                <div key={group} className="flex items-center gap-3">
                  <Checkbox
                    id={group}
                    checked={selectedGroups.includes(group)}
                    onCheckedChange={() => toggleGroup(group)}
                  />
                  <Label htmlFor={group} className="text-sm font-normal cursor-pointer">
                    {group}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate" className="text-sm font-medium mb-2 block">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-sm font-medium mb-2 block">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button className="mt-4">Generate Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Generate;
