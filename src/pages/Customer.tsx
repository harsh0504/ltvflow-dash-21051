import { useState } from "react";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  Calendar,
  Bell,
  Download,
  Plus,
  CreditCard,
  Lock,
  Unlock,
  ArrowUpCircle,
  XCircle,
  Zap,
  RefreshCw,
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
import { mockCustomers, getTransactionsByCustomerId } from "@/data/mockData";
import { toast } from "sonner";

// Using CUS001 - Rajesh Kumar Sharma as the logged-in customer
const customer = mockCustomers[0];
const transactions = getTransactionsByCustomerId(customer.id);

// Collateral performance data based on market value growth
const collateralData = [
  { date: "Jan", value: 3350 },
  { date: "Feb", value: 3420 },
  { date: "Mar", value: 3510 },
  { date: "Apr", value: 3650 },
  { date: "May", value: 3700 },
  { date: "Jun", value: 3850 },
];

const Customer = () => {
  // State for OTP modal and drawing power
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp] = useState("123456"); // Hardcoded OTP
  const [currentDrawingPower, setCurrentDrawingPower] = useState(
    customer.marketValueNumeric * 0.5
  );
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date());

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

  // Format Drawing Power
  const drawingPower = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(currentDrawingPower);

  // Last updated timestamp
  const lastUpdated = lastUpdatedTime.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleRefresh = () => {
    setIsOtpModalOpen(true);
  };

  const handleOtpSubmit = () => {
    if (otpInput === generatedOtp) {
      // Generate new random drawing power (between 40% and 60% of market value)
      const randomPercentage = 0.4 + Math.random() * 0.2;
      const newDrawingPower = customer.marketValueNumeric * randomPercentage;
      setCurrentDrawingPower(newDrawingPower);
      setLastUpdatedTime(new Date());
      setIsOtpModalOpen(false);
      setOtpInput("");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customer Portal</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back {customer.name.split(" ")[0]},
        </p>
      </div>

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
              {repaidPercentage.toFixed(1)}% utilised{" "}
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
              @ 8.5% interest rate
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 text-purple-500 hover:text-purple-700 transition-colors" />
              </Button>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
                <Zap className="h-4 w-4 text-purple-600" />
              </div>
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
                  ₹21,18,000 (55%)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mutual Funds</span>
                <span className="font-medium text-foreground">
                  ₹13,86,000 (36%)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bonds</span>
                <span className="font-medium text-foreground">
                  ₹3,46,000 (9%)
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

      {/* Quick Actions */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              onClick={() => toast.info("Redirecting to payment gateway...")}
            >
              <CreditCard className="mr-3 h-5 w-5 text-[#FF9900]" />
              <div className="text-left">
                <p className="font-semibold">Pay Bill</p>
                <p className="text-sm text-muted-foreground">
                  Make payment now
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              onClick={() =>
                toast.success("Collateral release request initiated")
              }
            >
              <Unlock className="mr-3 h-5 w-5 text-[#0099FF]" />
              <div className="text-left">
                <p className="font-semibold">Release Collateral</p>
                <p className="text-sm text-muted-foreground">Unpledge assets</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              onClick={() => toast.info("Opening collateral pledge form...")}
            >
              <Plus className="mr-3 h-5 w-5 text-[#00CC66]" />
              <div className="text-left">
                <p className="font-semibold">Add Collateral</p>
                <p className="text-sm text-muted-foreground">
                  Pledge more assets
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              onClick={() =>
                toast.success("Top-up loan request submitted for review")
              }
            >
              <ArrowUpCircle className="mr-3 h-5 w-5 text-[#9933FF]" />
              <div className="text-left">
                <p className="font-semibold">Top-Up Loan</p>
                <p className="text-sm text-muted-foreground">Increase amount</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              onClick={() =>
                toast.info(
                  "Foreclosure request initiated. Our team will contact you shortly."
                )
              }
            >
              <XCircle className="mr-3 h-5 w-5 text-[#FF3333]" />
              <div className="text-left">
                <p className="font-semibold">Foreclosure</p>
                <p className="text-sm text-muted-foreground">
                  Close loan early
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.success("Downloading transaction statement...")
              }
            >
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

      {/* Floating ChatBot */}
      <FloatingChatBot />

      {/* OTP Modal */}
      <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify OTP to Refresh Drawing Power</DialogTitle>
            <DialogDescription>
              Enter the OTP to update your drawing power with the latest market
              values.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && otpInput.length === 6) {
                    handleOtpSubmit();
                  }
                }}
                maxLength={6}
                className="text-sm text-left flex items-center placeholder:text-sm placeholder:text-left placeholder:text-muted-foreground/50"
              />
              <p className="text-sm text-muted-foreground text-left mt-2">
                OTP for demo:{" "}
                <span className="font-mono font-semibold text-foreground">
                  {generatedOtp}
                </span>
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsOtpModalOpen(false);
                setOtpInput("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleOtpSubmit}
              disabled={otpInput.length !== 6}
              className="bg-gradient-primary hover:opacity-90"
            >
              Verify & Refresh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customer;
