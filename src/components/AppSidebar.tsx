import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Settings,
  TrendingUp,
  AlertTriangle,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import KotakLogo from "@/assets/Kotak Logo.svg";
import { sidebarAnimation, springs } from "@/lib/animations";

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
  {
    title: "Customer Portfolio Manager",
    url: "/customer-portfolio",
    icon: Users,
  },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar
      className="h-screen"
      style={{
        width: isCollapsed ? '80px' : '256px',
        transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
      }}
    >
        <SidebarHeader className="border-b border-sidebar-border p-6 relative">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center flex-shrink-0">
              <img src={KotakLogo} alt="Kotak Logo" className="h-8 w-8" />
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-semibold text-sidebar-foreground whitespace-nowrap">
                    LAS Dashboard
                  </h2>
                  <p className="text-xs text-sidebar-foreground/60 whitespace-nowrap">
                    Loan Against Securities
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-sidebar border border-sidebar-border hover:bg-sidebar shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </Button>
      </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                </motion.div>
              )}
            </AnimatePresence>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-[rgba(0,204,255,0.2)] text-white font-semibold  pl-[calc(0.75rem-4px)]"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        } ${isCollapsed ? "justify-center" : ""}`
                      }
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="whitespace-nowrap"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  );
}
