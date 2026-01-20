import { NavLink, useLocation } from "react-router-dom";
import { Home, LayoutGrid, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/generate", label: "Generate", icon: LayoutGrid },
  { path: "/reports", label: "Reports", icon: FileText },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-card border-r border-border flex flex-col shadow-sm">
      <div className="p-6 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
        <h1 className="text-xl font-bold text-foreground tracking-tight">FMA</h1>
        <p className="text-sm text-muted-foreground">Ops Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 opacity-70" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">Version 2.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
