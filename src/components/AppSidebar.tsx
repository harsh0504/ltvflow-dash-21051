import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  TrendingUp,
  AlertTriangle,
  User,
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
  SidebarHeader,
} from "@/components/ui/sidebar";
import KotakLogo from "@/assets/Kotak Logo.svg";

const menuItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Business Rules",
    url: "/business-rules",
    icon: Settings,
  },
  {
    title: "Portfolio Metrics",
    url: "/portfolio",
    icon: TrendingUp,
  },
  {
    title: "Risk Management",
    url: "/risk",
    icon: AlertTriangle,
  },
  {
    title: "Customer Portal",
    url: "/customer",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src={KotakLogo} alt="Kotak Logo" className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">LAS Dashboard</h2>
            <p className="text-xs text-sidebar-foreground/60">Loan Against Securities</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "nav-active"
                          : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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
