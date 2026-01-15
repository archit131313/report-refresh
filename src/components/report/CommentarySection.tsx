import { Textarea } from "@/components/ui/textarea";

interface CommentaryField {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
}

interface CommentarySectionProps {
  fields: CommentaryField[];
}

const CommentarySection = ({ fields }: CommentarySectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {field.label}
          </label>
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            defaultValue={field.value}
            className="min-h-[100px] resize-none bg-background border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
      ))}
    </div>
  );
};

export default CommentarySection;
