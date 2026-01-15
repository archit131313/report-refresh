import { User, MapPin, Shield, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OncallData {
  location: string;
  primary: string;
  secondary: string;
}

interface OncallInfoProps {
  data: OncallData[];
}

const OncallInfo = ({ data }: OncallInfoProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Primary Oncalls */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Primary Oncalls
          </h3>
          <Badge variant="secondary" className="text-xs">Active</Badge>
        </div>
        <div className="grid gap-3">
          {data.map((item) => (
            <div 
              key={item.location} 
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.location}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.primary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Secondary Oncalls */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">
            Secondary Oncalls
          </h3>
          <Badge variant="outline" className="text-xs">Backup</Badge>
        </div>
        <div className="grid gap-3">
          {data.map((item) => (
            <div 
              key={item.location} 
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-muted-foreground/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center ring-2 ring-border">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.location}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.secondary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OncallInfo;
