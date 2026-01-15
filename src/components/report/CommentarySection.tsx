import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Sparkles, AlertTriangle, Trophy } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CommentaryField {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
}

interface CommentarySectionProps {
  fields: CommentaryField[];
}

const getFieldIcon = (id: string): LucideIcon => {
  if (id.includes('highlight')) return Sparkles;
  if (id.includes('lowlight') || id.includes('blocker')) return AlertTriangle;
  if (id.includes('win')) return Trophy;
  return MessageSquare;
};

const getFieldColor = (id: string): string => {
  if (id.includes('highlight') || id.includes('win')) return 'text-success';
  if (id.includes('lowlight') || id.includes('blocker')) return 'text-warning';
  return 'text-primary';
};

const CommentarySection = ({ fields }: CommentarySectionProps) => {
  // Use single column for single field, 2 columns for multiple
  const gridCols = fields.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';
  
  return (
    <div className={`grid ${gridCols} gap-6`}>
      {fields.map((field) => {
        const Icon = getFieldIcon(field.id);
        const iconColor = getFieldColor(field.id);
        
        return (
          <div 
            key={field.id} 
            className="group"
          >
            <label
              htmlFor={field.id}
              className="flex items-center gap-2 text-sm font-medium text-foreground mb-3"
            >
              <Icon className={`w-4 h-4 ${iconColor}`} />
              {field.label}
            </label>
            <div className="relative">
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                defaultValue={field.value}
                className="min-h-[120px] resize-none bg-background border-border rounded-xl transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 group-hover:border-muted-foreground/30"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentarySection;
