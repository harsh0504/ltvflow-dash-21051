import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Bell,
  Download,
  Plus,
  CreditCard,
  Lock,
  Unlock,
  ArrowUpCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const collateralData = [
  { date: "Jan", value: 2800 },
  { date: "Feb", value: 3200 },
  { date: "Mar", value: 2950 },
  { date: "Apr", value: 3400 },
  { date: "May", value: 3100 },
  { date: "Jun", value: 3350 },
];

const transactions = [
  { date: "2024-06-15", type: "EMI Payment", amount: "₹45,000", status: "Completed" },
  { date: "2024-05-15", type: "EMI Payment", amount: "₹45,000", status: "Completed" },
  { date: "2024-04-20", type: "Collateral Added", amount: "₹2,00,000", status: "Completed" },
  { date: "2024-04-15", type: "EMI Payment", amount: "₹45,000", status: "Completed" },
];

const Customer = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Portal</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Rajesh Kumar
        </p>
      </div>

      {/* Loan Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loan Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹20,00,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              Disbursed on Jan 15, 2024
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Balance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹17,35,000</div>
            <Progress value={86.75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">86.75% remaining</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next EMI
            </CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹45,000</div>
            <p className="text-xs text-muted-foreground mt-1">Due on Jul 15, 2024</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all border-success/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loan Status
            </CardTitle>
            <Bell className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <Badge className="bg-success text-success-foreground">Active</Badge>
            <p className="text-xs text-muted-foreground mt-2">All payments on time</p>
          </CardContent>
        </Card>
      </div>

      {/* Collateral Summary and Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Collateral Summary</CardTitle>
              <Badge variant="outline" className="border-success text-success">
                Healthy
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3">
                <p className="text-sm text-muted-foreground">Pledged Value</p>
                <p className="text-xl font-semibold text-foreground">₹28,50,000</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-sm text-muted-foreground">Current Market Value</p>
                <p className="text-xl font-semibold text-foreground">₹33,50,000</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current LTV</span>
                <span className="font-semibold text-foreground">51.8%</span>
              </div>
              <div className="relative h-8 w-full rounded-full bg-muted overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="h-full bg-success" style={{ width: "60%" }}></div>
                  <div className="h-full bg-warning" style={{ width: "20%" }}></div>
                  <div className="h-full bg-destructive" style={{ width: "20%" }}></div>
                </div>
                <div
                  className="absolute top-0 h-full w-1 bg-foreground"
                  style={{ left: "51.8%" }}
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
                <span className="font-medium text-foreground">₹18,50,000 (55%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mutual Funds</span>
                <span className="font-medium text-foreground">₹12,00,000 (36%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bonds</span>
                <span className="font-medium text-foreground">₹3,00,000 (9%)</span>
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
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                  name="Value (₹ in '000s)"
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
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start h-auto py-4 bg-gradient-primary hover:opacity-90">
              <CreditCard className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-semibold">Repay EMI</p>
                <p className="text-xs opacity-90">Make payment now</p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto py-4">
              <Unlock className="mr-3 h-5 w-5 text-secondary" />
              <div className="text-left">
                <p className="font-semibold">Release Collateral</p>
                <p className="text-xs text-muted-foreground">Unpledge assets</p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto py-4">
              <Plus className="mr-3 h-5 w-5 text-accent" />
              <div className="text-left">
                <p className="font-semibold">Add Collateral</p>
                <p className="text-xs text-muted-foreground">Pledge more assets</p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto py-4">
              <ArrowUpCircle className="mr-3 h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-semibold">Top-Up Loan</p>
                <p className="text-xs text-muted-foreground">Increase amount</p>
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
            <Button variant="outline" size="sm">
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction Type</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-muted-foreground">{txn.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{txn.type}</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-foreground">{txn.amount}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="border-success text-success">
                        {txn.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customer;
