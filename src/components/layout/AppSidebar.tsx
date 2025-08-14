import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Upload,
  Settings,
  FileText,
  Home,
  Shield,
  Cog,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: "super-admin" | "admin";
}

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Reviews", url: "/reviews", icon: FileText },
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "User Management", url: "/user-management", icon: Users },
  { title: "Site Configuration", url: "/configuration", icon: Cog },
  { title: "Settings", url: "/settings", icon: Settings },
];

const superAdminMenuItems = [
  { title: "Dashboard", url: "/super-admin", icon: Home },
  { title: "Admin Management", url: "/admin-management", icon: Users },
  { title: "User Management", url: "/user-management", icon: Users },
  { title: "Site Configuration", url: "/configuration", icon: Cog },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = userRole === "super-admin" ? superAdminMenuItems : adminMenuItems;
  const isCollapsed = state === "collapsed";
  
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">Prifam</h1>
                <p className="text-xs text-muted-foreground">Reputation Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-6 py-2">
            {userRole === "super-admin" ? "Super Admin" : "Main"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <NavLink 
                       to={item.url} 
                       className={getNavCls}
                       onClick={() => console.log("Navigating to:", item.url, item.title)}
                     >
                       <item.icon className="h-4 w-4" />
                       {!isCollapsed && <span>{item.title}</span>}
                     </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}