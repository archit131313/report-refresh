import { User } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Primary Oncalls
        </h3>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.location} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.location}</p>
                <p className="text-sm font-medium text-foreground">{item.primary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Secondary Oncalls
        </h3>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.location} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.location}</p>
                <p className="text-sm font-medium text-foreground">{item.secondary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OncallInfo;
