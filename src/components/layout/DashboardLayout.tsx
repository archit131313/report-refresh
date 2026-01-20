import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <main className="ml-[200px] min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
