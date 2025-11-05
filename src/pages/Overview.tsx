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
import { getPortfolioMetrics, mockCustomers } from "@/data/mockData";

// Realistic disbursement data (in lakhs)
const disbursementData = [
  { month: "Jan", disbursed: 200, repaid: 155 },
  { month: "Feb", disbursed: 350, repaid: 180 },
  { month: "Mar", disbursed: 280, repaid: 195 },
  { month: "Apr", disbursed: 420, repaid: 225 },
  { month: "May", disbursed: 500, repaid: 285 },
  { month: "Jun", disbursed: 420, repaid: 310 },
];

// DPD distribution based on realistic data
const riskData = [
  { category: "0-7 Days", count: 5 },
  { category: "8-15 Days", count: 2 },
  { category: "16-30 Days", count: 1 },
  { category: "31-45 Days", count: 0 },
  { category: "46-60 Days", count: 0 },
  { category: "61-75 Days", count: 0 },
  { category: "76-90 Days", count: 0 },
  { category: "90+ Days", count: 0 },
];

const Overview = () => {
  const metrics = getPortfolioMetrics();
  const averageInterestRate = (mockCustomers.reduce((sum, c) => sum + c.interestRate, 0) / mockCustomers.length).toFixed(2);
  const npaRate = ((metrics.atRiskCustomers / metrics.totalCustomers) * 100).toFixed(1);

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
          value={metrics.totalOutstanding}
          subtitle={`Across ${metrics.totalCustomers} active loans`}
          icon={RupeeIcon}
          trend={{ value: "8.3%", isPositive: true }}
        />
        <MetricCard
          title="Active Loans"
          value={metrics.activeCustomers.toString()}
          subtitle={`${metrics.atRiskCustomers} at risk`}
          icon={Users}
          trend={{ value: "5.7%", isPositive: true }}
        />
        <MetricCard
          title="Portfolio Yield"
          value={`${averageInterestRate}%`}
          subtitle="Average interest rate"
          icon={TrendingUp}
          trend={{ value: "0.3%", isPositive: true }}
        />
        <MetricCard
          title="NPA Rate"
          value={`${npaRate}%`}
          subtitle="Non-performing assets"
          icon={AlertCircle}
          trend={{ value: "0.2%", isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card animate className="shadow-medium">
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
                    <stop offset="5%" stopColor="#9933FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9933FF" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorRepaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00CC66" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00CC66" stopOpacity={0.1} />
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
                  stroke="#9933FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDisbursed)"
                  name="Disbursed (₹ Lakhs)"
                />
                <Area
                  type="monotone"
                  dataKey="repaid"
                  stroke="#00CC66"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRepaid)"
                  name="Repaid (₹ Lakhs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card animate className="shadow-medium">
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
                <Bar dataKey="count" fill="#0099FF" name="Number of Loans" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card animate className="shadow-medium">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "repayment", amount: "₹1,05,000", customer: "Sneha Iyer", time: "2 hours ago", isPositive: true },
              { type: "repayment", amount: "₹78,000", customer: "Priya Deshmukh", time: "4 hours ago", isPositive: true },
              { type: "alert", amount: "LTV Breach", customer: "Amit Patel", time: "6 hours ago", isPositive: false },
              { type: "disbursement", amount: "₹25,00,000", customer: "Meera Kapoor", time: "1 day ago", isPositive: true },
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
