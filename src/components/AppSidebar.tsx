import { NavLink } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import KotakLogo from "@/assets/Kotak Logo.svg";
import { useSidebarState } from "@/contexts/SidebarContext";

const menuItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolio Metrics",
    url: "/portfolio",
    icon: TrendingUp,
  },
  {
    title: "Collateral Risk Managment",
    url: "/risk",
    icon: AlertTriangle,
  },
  {
    title: "Business Rules",
    url: "/business-rules",
    icon: Settings,
  },
  // {
  //   title: "Customer Portal",
  //   url: "/customer",
  //   icon: User,
  // },
  {
    title: "Customer Relationship Manager",
    url: "/customer-portfolio",
    icon: Users,
  },
];

export function AppSidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebarState();

  return (
    <aside
      className="h-screen flex-shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300"
      style={{
        width: isCollapsed ? "80px" : "280px",
      }}
    >
      <div className="border-b border-sidebar-border p-6 relative">
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
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-2">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-2 mb-2"
              >
                <div className="text-xs font-medium text-sidebar-foreground/70">
                  Main Menu
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[rgba(0,204,255,0.2)] text-white font-semibold pl-[calc(0.75rem-4px)]"
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
                        className="leading-tight"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
