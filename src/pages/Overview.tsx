import { MetricCard } from "@/components/MetricCard";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { RupeeIcon } from "@/components/RupeeIcon";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const disbursementData = [
  { month: "Jan", disbursed: 4200, repaid: 3800 },
  { month: "Feb", disbursed: 5100, repaid: 4200 },
  { month: "Mar", disbursed: 4800, repaid: 4500 },
  { month: "Apr", disbursed: 6200, repaid: 5100 },
  { month: "May", disbursed: 7500, repaid: 6300 },
  { month: "Jun", disbursed: 8200, repaid: 7100 },
];

const riskData = [
  { category: "0-7 Days", count: 45 },
  { category: "8-15 Days", count: 38 },
  { category: "16-30 Days", count: 52 },
  { category: "31-45 Days", count: 28 },
  { category: "46-60 Days", count: 15 },
  { category: "61-75 Days", count: 19 },
  { category: "76-90 Days", count: 8 },
  { category: "90+ Days", count: 12 },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your loan portfolio and key metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Outstanding"
          value="₹124.5M"
          subtitle="Across 1,234 loans"
          icon={RupeeIcon}
          trend={{ value: "12.5%", isPositive: true }}
        />
        <MetricCard
          title="Active Loans"
          value="1,234"
          subtitle="658 new this month"
          icon={Users}
          trend={{ value: "8.2%", isPositive: true }}
        />
        <MetricCard
          title="Portfolio Yield"
          value="9.2%"
          subtitle="Average interest rate"
          icon={TrendingUp}
          trend={{ value: "0.5%", isPositive: true }}
        />
        <MetricCard
          title="NPA Rate"
          value="1.8%"
          subtitle="Non-performing assets"
          icon={AlertCircle}
          trend={{ value: "0.3%", isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Disbursement vs Repayment Trends
              <span className="text-sm font-normal text-muted-foreground">Last 6 months</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={disbursementData}>
                <defs>
                  <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRepaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="disbursed"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorDisbursed)"
                  name="Disbursed (₹ Lakhs)"
                />
                <Area
                  type="monotone"
                  dataKey="repaid"
                  stroke="hsl(var(--secondary))"
                  fillOpacity={1}
                  fill="url(#colorRepaid)"
                  name="Repaid (₹ Lakhs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              DPD Distribution
              <span className="text-sm font-normal text-muted-foreground">Days Past Due</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="count" fill="hsl(var(--accent))" name="Number of Loans" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "disbursement", amount: "₹2.5L", customer: "Rajesh Kumar", time: "2 hours ago", isPositive: true },
              { type: "repayment", amount: "₹1.8L", customer: "Priya Sharma", time: "4 hours ago", isPositive: true },
              { type: "alert", amount: "LTV Breach", customer: "Amit Patel", time: "6 hours ago", isPositive: false },
              { type: "disbursement", amount: "₹3.2L", customer: "Neha Gupta", time: "8 hours ago", isPositive: true },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    activity.isPositive ? "bg-success/10" : "bg-destructive/10"
                  }`}>
                    {activity.isPositive ? (
                      <ArrowUpRight className={`h-5 w-5 ${activity.isPositive ? "text-success" : "text-destructive"}`} />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.customer}</p>
                    <p className="text-sm text-muted-foreground">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{activity.amount}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating ChatBot */}
      <FloatingChatBot />
    </div>
  );
};

export default Overview;
