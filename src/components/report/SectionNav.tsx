import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface SectionNavProps {
  sections: Section[];
}

const SectionNav = ({ sections }: SectionNavProps) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-4 z-40 bg-card/95 backdrop-blur-md border border-border rounded-xl py-2 px-3 mb-8 shadow-lg">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionNav;
