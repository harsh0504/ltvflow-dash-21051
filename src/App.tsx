import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PageTransition } from "@/components/PageTransition";
import Overview from "./pages/Overview";
import BusinessRules from "./pages/BusinessRules";
import Portfolio from "./pages/Portfolio";
import Risk from "./pages/Risk";
import Customer from "./pages/Customer";
import CustomerPortfolioManager from "./pages/CustomerPortfolioManager";
import CustomerDetail from "./pages/CustomerDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Overview /></PageTransition>} />
        <Route path="/business-rules" element={<PageTransition><BusinessRules /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/risk" element={<PageTransition><Risk /></PageTransition>} />
        <Route path="/customer" element={<PageTransition><Customer /></PageTransition>} />
        <Route path="/customer-portfolio" element={<PageTransition><CustomerPortfolioManager /></PageTransition>} />
        <Route path="/customer-portfolio/:customerId" element={<PageTransition><CustomerDetail /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <main className="flex-1 p-6 overflow-auto">
              <AnimatedRoutes />
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
