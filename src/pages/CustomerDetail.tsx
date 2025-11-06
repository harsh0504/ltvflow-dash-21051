import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Calendar,
  Bell,
  Download,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { RupeeIcon } from "@/components/RupeeIcon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuditTrail } from "@/components/AuditTrail";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, getTransactionsByCustomerId } from "@/data/mockData";
import { toast } from "sonner";

const collateralData = [
  { date: "Jan", value: 2800 },
  { date: "Feb", value: 3200 },
  { date: "Mar", value: 2950 },
  { date: "Apr", value: 3400 },
  { date: "May", value: 3100 },
  { date: "Jun", value: 3350 },
];

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const customer = getCustomerById(customerId || "");

  const currentDrawingPower = customer ? customer.marketValueNumeric * 0.5 : 0;
  const lastUpdatedTime = new Date();

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/customer-portfolio")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
        <Card className="shadow-medium">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Customer not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const transactions = getTransactionsByCustomerId(customer.id);
  const paidAmount = customer.loanAmountNumeric - customer.outstandingNumeric;
  const repaidPercentage = (paidAmount / customer.loanAmountNumeric) * 100;
  const disbursedDate = new Date(customer.disbursedDate).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
  const dueDate = new Date(customer.dueDate).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const drawingPower = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(currentDrawingPower);

  const lastUpdated = lastUpdatedTime.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/customer-portfolio")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Button>
      </div>

      {/* Customer Header with Profile */}
      <Card className="shadow-medium bg-gradient-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {customer.name}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Customer ID: {customer.id}
                  </p>
                </div>
                <Badge className="bg-[#ECFDF5] text-[#059669] font-medium">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{customer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">PAN: {customer.pan}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  KYC Information
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">KYC Status:</span>
                    <p className="font-medium text-success">
                      {customer.kycStatus}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Verification Date:
                    </span>
                    <p className="font-medium text-foreground">
                      {new Date(customer.verificationDate).toLocaleDateString(
                        "en-IN",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Risk Category:
                    </span>
                    <p className="font-medium text-foreground">
                      {customer.riskCategory}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loan Amount
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <RupeeIcon className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {customer.loanAmount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Disbursed on {disbursedDate}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Balance
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {customer.outstandingBalance}
            </div>
            <div className="mt-2">
              <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                  style={{ width: `${repaidPercentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {repaidPercentage.toFixed(1)}% repaid •{" "}
              {customer.outstandingBalance} remaining
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Bill
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {customer.nextPayment}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Due on {dueDate}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              @{customer.interestRate}% interest
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loan Status
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <Bell className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <Badge
              className={`font-medium ${
                customer.status === "Active"
                  ? "bg-[#ECFDF5] text-[#059669]"
                  : "bg-[#FEF2F2] text-[#DC2626]"
              }`}
            >
              {customer.status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              All payments on time
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Drawing Power
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
              <Zap className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">
              {drawingPower}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated on {lastUpdated}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collateral Summary and Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Collateral Summary</CardTitle>
              <Badge
                className={`font-medium ${
                  customer.ltvNumeric <= 60
                    ? "bg-[#ECFDF5] text-[#059669]"
                    : customer.ltvNumeric <= 70
                    ? "bg-[#FFFBEB] text-[#D97706]"
                    : "bg-[#FEF2F2] text-[#DC2626]"
                }`}
              >
                {customer.ltvNumeric <= 60
                  ? "Healthy"
                  : customer.ltvNumeric <= 70
                  ? "Caution"
                  : "At Risk"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3">
                <p className="text-sm text-muted-foreground">Pledged Value</p>
                <p className="text-xl font-semibold text-foreground">
                  {customer.pledgedValue}
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-sm text-muted-foreground">
                  Current Market Value
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {customer.marketValue}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current LTV</span>
                <span className="font-semibold text-foreground">
                  {customer.ltv}
                </span>
              </div>
              <div className="relative h-8 w-full rounded-full bg-muted overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div
                    className="h-full bg-success"
                    style={{ width: "60%" }}
                  ></div>
                  <div
                    className="h-full bg-warning"
                    style={{ width: "10%" }}
                  ></div>
                  <div
                    className="h-full bg-destructive"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <div
                  className="absolute top-0 h-full w-1 bg-foreground"
                  style={{ left: `${customer.ltvNumeric}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-10 w-10 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-foreground border-2 border-background"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Safe (0-60%)</span>
                <span>Caution (60-70%)</span>
                <span>Risk (70%+)</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Equities</span>
                <span className="font-medium text-foreground">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(customer.marketValueNumeric * 0.55)}{" "}
                  (55%)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mutual Funds</span>
                <span className="font-medium text-foreground">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(customer.marketValueNumeric * 0.36)}{" "}
                  (36%)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bonds</span>
                <span className="font-medium text-foreground">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(customer.marketValueNumeric * 0.09)}{" "}
                  (9%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Collateral Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={collateralData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00CC66" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#00CC66" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00CC66"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  name="Value (₹ in '000s)"
                  dot={{ fill: "#00CC66", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <Button variant="outline" size="sm" onClick={() => toast.success("Downloading transaction statement...")}>
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Transaction Type
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(txn.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {txn.type}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-foreground">
                      {txn.amount}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge
                        className={`font-medium ${
                          txn.status === "Completed"
                            ? "bg-[#ECFDF5] text-[#059669]"
                            : txn.status === "Pending"
                            ? "bg-[#FFFBEB] text-[#D97706]"
                            : "bg-[#FEF2F2] text-[#DC2626]"
                        }`}
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                      {txn.referenceNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <AuditTrail />

      {/* Floating ChatBot */}
      <FloatingChatBot />
    </div>
  );
};

export default CustomerDetail;
