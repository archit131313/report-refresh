import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
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
    <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border py-3 px-4 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 shadow-nav">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "nav-link whitespace-nowrap flex-shrink-0",
                activeSection === section.id && "nav-link-active"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SectionNav;
