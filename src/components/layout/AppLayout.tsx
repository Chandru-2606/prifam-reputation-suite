import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "./Navbar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
  userRole?: "super-admin" | "admin";
}

export function AppLayout({ children, userRole = "admin" }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}