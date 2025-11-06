import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Bell,
  Settings,
  Plus,
  TrendingDown,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const riskEvents = [
  {
    id: "RE001",
    customer: "Rajesh Kumar",
    type: "LTV Breach",
    severity: "Critical",
    time: "10 mins ago",
    status: "Open",
  },
  {
    id: "RE002",
    customer: "Priya Sharma",
    type: "Price Drop",
    severity: "High",
    time: "1 hour ago",
    status: "In Progress",
  },
  {
    id: "RE003",
    customer: "Amit Patel",
    type: "Concentration Risk",
    severity: "Medium",
    time: "2 hours ago",
    status: "Open",
  },
  {
    id: "RE004",
    customer: "Neha Gupta",
    type: "Payment Delay",
    severity: "High",
    time: "3 hours ago",
    status: "Open",
  },
  {
    id: "RE005",
    customer: "Vikram Singh",
    type: "Volatility Spike",
    severity: "Low",
    time: "5 hours ago",
    status: "Open",
  },
];

const Risk = () => {
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [isNewRuleOpen, setIsNewRuleOpen] = useState(false);

  const handleTriggerAction = (eventId: string) => {
    toast.success(`Margin call initiated for ${eventId}`);
  };

  const handleSaveRule = () => {
    toast.success("Risk rule saved successfully");
    setIsNewRuleOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-[#FEF2F2] text-[#DC2626]";
      case "High":
        return "bg-[#FFFBEB] text-[#D97706]";
      case "Medium":
        return "bg-[#EEF2FF] text-[#4F46E5]";
      default:
        return "bg-[#F3F4F6] text-[#374151]";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-[#ECFDF5] text-[#059669]";
      case "In Progress":
        return "bg-[#FFFBEB] text-[#D97706]";
      default:
        return "bg-[#FEF2F2] text-[#DC2626]";
    }
  };

  const getSystemAction = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "Margin Call Initiated";
      case "High":
        return "Communication Initiated for Additional Pledge";
      case "Medium":
        return "No action";
      case "Low":
        return "No action";
      default:
        return "No action";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Collateral Risk Managment
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage risk events in real-time
          </p>
        </div>
        <Button
          className="bg-gradient-primary hover:opacity-90"
          onClick={() => setIsNewRuleOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Risk Rule
        </Button>
      </div>

      {/* Active Alerts Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Critical Events"
          value="12"
          subtitle="Requires immediate action"
          icon={AlertTriangle}
        />
        <MetricCard
          title="High Priority"
          value="28"
          subtitle="Needs attention"
          icon={TrendingDown}
        />
        <MetricCard
          title="Pending Actions"
          value="45"
          subtitle="Awaiting manager review"
          icon={Clock}
        />
      </div>

      {/* Recent Templates */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Recent Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              "Price Drop Alert",
              "LTV Breach Protocol",
              "Overdue Escalation",
            ].map((template, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="justify-start text-sm"
              >
                {template}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Events Dashboard */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Live Risk Events
            </CardTitle>
            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Event ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Risk Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Severity
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    System Action
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Manager Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {riskEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                      {event.id}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {event.customer}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {event.type}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge
                        className={`${getSeverityColor(
                          event.severity
                        )} font-medium`}
                      >
                        {event.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {event.time}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge
                        className={`${getStatusColor(
                          event.status
                        )} font-medium`}
                      >
                        {event.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {getSystemAction(event.severity)}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTriggerAction(event.id)}
                        disabled={event.status === "Resolved"}
                      >
                        Take Action
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New Risk Rule Modal */}
      <Dialog open={isNewRuleOpen} onOpenChange={setIsNewRuleOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Risk Trigger Configuration
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Trigger Type</Label>
                <Select defaultValue="price_drop">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_drop">
                      Collateral Price Drop
                    </SelectItem>
                    <SelectItem value="ltv_breach">LTV Breach</SelectItem>
                    <SelectItem value="delinquency">
                      Payment Delinquency
                    </SelectItem>
                    <SelectItem value="volatility">Volatility Spike</SelectItem>
                    <SelectItem value="concentration">
                      Concentration Limit
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Threshold Value</Label>
                <Input type="number" placeholder="15" defaultValue="15" />
              </div>

              <div className="space-y-2">
                <Label>Time Window (Days)</Label>
                <Input type="number" placeholder="5" defaultValue="5" />
              </div>

              <div className="space-y-2">
                <Label>Severity Level</Label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border bg-accent/5 p-4">
              <h3 className="font-semibold text-foreground">
                Automated Actions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="sms"
                    className="h-4 w-4 rounded border-border"
                    defaultChecked
                  />
                  <Label htmlFor="sms" className="cursor-pointer">
                    Send SMS to Customer
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="email"
                    className="h-4 w-4 rounded border-border"
                    defaultChecked
                  />
                  <Label htmlFor="email" className="cursor-pointer">
                    Send Email Alert
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="margin"
                    className="h-4 w-4 rounded border-border"
                  />
                  <Label htmlFor="margin" className="cursor-pointer">
                    Initiate Margin Call
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="team"
                    className="h-4 w-4 rounded border-border"
                    defaultChecked
                  />
                  <Label htmlFor="team" className="cursor-pointer">
                    Notify Risk Team
                  </Label>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleSaveRule}
            >
              Save Risk Rule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Risk;
