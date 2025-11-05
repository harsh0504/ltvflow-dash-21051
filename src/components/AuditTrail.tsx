import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const auditEvents = [
  {
    timestamp: "2024-07-10 14:32:15",
    user: "admin@kotak.com",
    action: "Customer Data Updated",
    status: "Success",
  },
  {
    timestamp: "2024-07-10 13:15:42",
    user: "manager@kotak.com",
    action: "LTV Threshold Modified",
    status: "Success",
  },
  {
    timestamp: "2024-07-10 11:20:30",
    user: "system",
    action: "Automated Risk Check",
    status: "Completed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Success":
    case "Completed":
      return "bg-[#ECFDF5] text-[#059669]";
    case "Pending":
      return "bg-[#FFFBEB] text-[#D97706]";
    case "Failed":
      return "bg-[#FEF2F2] text-[#DC2626]";
    default:
      return "bg-[#F3F4F6] text-[#374151]";
  }
};

export const AuditTrail = () => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Recent Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {auditEvents.map((event, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{event.action}</p>
                <p className="text-xs text-muted-foreground">
                  {event.user} • {event.timestamp}
                </p>
              </div>
              <Badge className={`${getStatusColor(event.status)} font-medium`}>
                {event.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
