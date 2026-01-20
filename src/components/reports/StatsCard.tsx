import { Card } from "@/components/ui/card";

interface StatsCardProps {
  value: string | number;
  label: string;
  variant?: "default" | "highlight";
}

const StatsCard = ({ value, label, variant = "default" }: StatsCardProps) => {
  return (
    <Card
      className={`p-6 ${
        variant === "highlight" ? "bg-amber-50 border-amber-100" : ""
      }`}
    >
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  );
};

export default StatsCard;
