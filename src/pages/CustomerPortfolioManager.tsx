import { FloatingChatBot } from "@/components/FloatingChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Eye,
  Download,
  Upload,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AuditTrail } from "@/components/AuditTrail";
import { mockCustomers, mockApplications } from "@/data/mockData";
import { staggerConfig } from "@/lib/animations";

const CustomerPortfolioManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCustomer = (customerId: string) => {
    navigate(`/customer-portfolio/${customerId}`);
  };

  const getFunnelColor = (funnel: string) => {
    switch (funnel) {
      case "Applied":
        return "bg-[#F3F4F6] text-[#374151]";
      case "KYC":
        return "bg-[#EEF2FF] text-[#4F46E5]";
      case "Pledge":
        return "bg-[#FFFBEB] text-[#D97706]";
      case "Disbursal":
        return "bg-[#ECFDF5] text-[#059669]";
      default:
        return "bg-[#F3F4F6] text-[#374151]";
    }
  };

  const getFinancialStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
      case "Verified":
        return "bg-[#ECFDF5] text-[#059669]";
      case "Pending":
        return "bg-[#FFFBEB] text-[#D97706]";
      case "Under Review":
      case "In Progress":
        return "bg-[#EEF2FF] text-[#4F46E5]";
      default:
        return "bg-[#F3F4F6] text-[#374151]";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#ECFDF5] text-[#059669]";
      case "At Risk":
        return "bg-[#FEF2F2] text-[#DC2626]";
      default:
        return "bg-[#F3F4F6] text-[#374151]";
    }
  };

  const getLtvColor = (ltvValue: number) => {
    if (ltvValue > 70) {
      return "bg-[#FEF2F2] text-[#DC2626]";
    }
    return "bg-[#F3F4F6] text-[#374151]";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Customer Relationship Manager
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage customer applications and relationships
        </p>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90">
            <Sparkles className="mr-2 h-4 w-4" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* Assigned Users Application Funnel Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Assigned Applications
        </h2>
        <Card className="shadow-medium">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      App ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Customer Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Application Stage
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Action Required
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Application Start Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Last Communicated
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  animate="visible"
                  variants={staggerConfig.containerFast}
                >
                  {mockApplications.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={staggerConfig.item}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                        {user.id}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        {user.name}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Badge
                          className={`${getFunnelColor(
                            user.funnel
                          )} font-medium`}
                        >
                          {user.funnel}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {user.status}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {user.action}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(user.applicationDate).toLocaleDateString(
                          "en-IN",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {user.lastCommunicated}
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Take Action
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>{user.action}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Portfolio Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Customer Portfolio
        </h2>
        <Card className="shadow-medium">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Customer ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Loan Amount
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Outstanding
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      LTV
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Next Payment
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  animate="visible"
                  variants={staggerConfig.containerFast}
                >
                  {filteredCustomers.map((customer) => {
                    // Dynamically determine status based on LTV
                    const displayStatus = customer.ltvNumeric > 60 ? "At Risk" : customer.status;

                    return (
                      <motion.tr
                        key={customer.id}
                        variants={staggerConfig.item}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-foreground">
                          {customer.id}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-foreground">
                          {customer.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-foreground">
                          {customer.loanAmount}
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-semibold text-foreground">
                          {customer.outstandingBalance}
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <Badge
                            className={`${getLtvColor(
                              customer.ltvNumeric
                            )} font-medium`}
                          >
                            {customer.ltv}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge
                            className={`${getStatusColor(
                              displayStatus
                            )} font-medium`}
                          >
                            {displayStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          <div className="font-semibold text-foreground">
                            {customer.nextPayment}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(customer.dueDate).toLocaleDateString(
                              "en-IN",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCustomer(customer.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </motion.tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <AuditTrail />

      {/* Floating ChatBot */}
      <FloatingChatBot />
    </div>
  );
};

export default CustomerPortfolioManager;
