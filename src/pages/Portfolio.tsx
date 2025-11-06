import { MetricCard } from "@/components/MetricCard";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  Download,
  Search,
  AlertTriangle,
  Upload,
  Sparkles,
} from "lucide-react";
import { RupeeIcon } from "@/components/RupeeIcon";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { toast } from "sonner";

const assetComposition = [
  { name: "Equities", value: 45, color: "#60A5FA" },
  { name: "Mutual Funds", value: 30, color: "#A855F7" },
  { name: "Bonds", value: 15, color: "#14B8A6" },
  { name: "ETFs", value: 7, color: "#FB923C" },
  { name: "Gold", value: 3, color: "#3B82F6" },
];

const assets = [
  {
    isin: "INE002A01018",
    name: "Reliance Industries",
    type: "Equity",
    value: "₹8,55,000",
    valueNumeric: 855000,
    pledged: "₹6,85,000",
    pledgedNumeric: 6850000,
    outstanding: "₹3,08,250",
    outstandingNumeric: 3082500,
    ltv: "45.0%",
    movement: "+2.3%",
    status: "Healthy",
  },
  {
    isin: "INE040A01034",
    name: "HDFC Bank",
    type: "Equity",
    value: "₹8,75,000",
    valueNumeric: 875000,
    pledged: "₹7,00,000",
    pledgedNumeric: 7000000,
    outstanding: "₹3,15,000",
    outstandingNumeric: 3150000,
    ltv: "45.0%",
    movement: "+1.2%",
    status: "Healthy",
  },
  {
    isin: "MF12345678",
    name: "SBI Bluechip Fund",
    type: "Mutual Fund",
    value: "₹9,00,000",
    valueNumeric: 900000,
    pledged: "₹7,20,000",
    pledgedNumeric: 7200000,
    outstanding: "₹3,24,000",
    outstandingNumeric: 3240000,
    ltv: "45.0%",
    movement: "+0.8%",
    status: "Healthy",
  },
  {
    isin: "INE467B01029",
    name: "TCS Limited",
    type: "Equity",
    value: "₹8,65,000",
    valueNumeric: 865000,
    pledged: "₹6,92,000",
    pledgedNumeric: 6920000,
    outstanding: "₹3,11,400",
    outstandingNumeric: 3114000,
    ltv: "45.0%",
    movement: "+3.1%",
    status: "Healthy",
  },
  {
    isin: "INE009A01021",
    name: "Infosys",
    type: "Equity",
    value: "₹8,80,000",
    valueNumeric: 880000,
    pledged: "₹7,04,000",
    pledgedNumeric: 7040000,
    outstanding: "₹3,16,800",
    outstandingNumeric: 3168000,
    ltv: "45.0%",
    movement: "+1.2%",
    status: "Healthy",
  },
];

const Portfolio = () => {
  // Calculate portfolio metrics based on formula: Total Outstanding / Pledged Value = Average LTV
  const totalOutstanding = assets.reduce((sum, asset) => sum + asset.outstandingNumeric, 0);
  const totalPledged = assets.reduce((sum, asset) => sum + asset.pledgedNumeric, 0);
  const averageLTV = ((totalOutstanding / totalPledged) * 100).toFixed(1);

  // Calculate at-risk assets (LTV > 50%) as percentage
  const atRiskCount = assets.filter(asset => parseFloat(asset.ltv) > 50).length;
  const atRiskPercentage = ((atRiskCount / assets.length) * 100).toFixed(1);

  // Calculate portfolio concentration risk (highest single asset percentage)
  const totalMarketValue = assets.reduce((sum, asset) => sum + asset.valueNumeric, 0);
  const concentrations = assets.map(asset => (asset.valueNumeric / totalMarketValue) * 100);
  const maxConcentration = Math.max(...concentrations).toFixed(1);

  // Format total outstanding
  const totalOutstandingFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 1,
  }).format(totalOutstanding / 10000000) + "M";

  // Format total pledged
  const totalPledgedFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 1,
  }).format(totalPledged / 10000000) + "M";

  const pledgedPercentage = ((totalPledged / (totalOutstanding + totalPledged)) * 100).toFixed(1);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
    fill,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontWeight: 500, fontSize: "14px" }}
      >
        {`${name}: ${value}%`}
      </text>
    );
  };

  const getLtvBadgeColor = (ltv: string, status: string) => {
    if (status === "At-risk") {
      return "bg-[#FEF2F2] text-[#DC2626]";
    }
    return "bg-[#F3F4F6] text-[#374151]";
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === "Healthy") {
      return "bg-[#ECFDF5] text-[#059669]";
    } else if (status === "At-risk") {
      return "bg-[#FFFBEB] text-[#D97706]";
    }
    return "bg-[#F3F4F6] text-[#374151]";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Portfolio Metrics
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze asset composition and portfolio health
          </p>
        </div>
        <Button variant="outline" onClick={() => toast.success("Generating portfolio report...")}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Portfolio Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Total Outstanding Exposure"
          value={totalOutstandingFormatted}
          subtitle="Across all assets"
          icon={RupeeIcon}
          trend={{ value: "5.2%", isPositive: true }}
        />
        <MetricCard
          title="Pledged Value"
          value={totalPledgedFormatted}
          subtitle={`${pledgedPercentage}% of total exposure`}
          icon={TrendingUp}
        />
        <MetricCard
          title="Average LTV"
          value={`${averageLTV}%`}
          subtitle="Outstanding / Pledged Value"
          icon={PieChartIcon}
        />
        <MetricCard
          title="At-Risk Assets"
          value={`${atRiskPercentage}%`}
          subtitle="LTV > 50%"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Portfolio Concentration Risk"
          value={`${maxConcentration}%`}
          subtitle="Max single asset exposure"
          icon={PieChartIcon}
        />
      </div>

      {/* Asset Composition */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card animate className="shadow-medium">
          <CardHeader>
            <CardTitle>Asset Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card animate className="shadow-medium">
          <CardHeader>
            <CardTitle>Top Holdings by Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Reliance Industries", value: 18, amount: "₹12.5M" },
                { name: "TCS Limited", value: 14, amount: "₹9.2M" },
                { name: "HDFC Bank", value: 13, amount: "₹8.75M" },
                { name: "Infosys", value: 10, amount: "₹6.4M" },
                { name: "SBI Bluechip Fund", value: 8, amount: "₹5.6M" },
              ].map((holding, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {holding.name}
                    </span>
                    <span className="text-muted-foreground">
                      {holding.amount}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${holding.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers by name, ID, or ISIN..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Import functionality coming soon!")}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Exporting portfolio data...")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90" onClick={() => toast.info("AI is analyzing portfolio metrics...")}>
            <Sparkles className="mr-2 h-4 w-4" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* Asset Table */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Asset Details & LTV Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    ISIN
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Asset Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Market Value
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Pledged Value
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Outstanding
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    LTV
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Movement
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                      {asset.isin}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {asset.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {asset.type}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-foreground">
                      {asset.value}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-muted-foreground">
                      {asset.pledged}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-foreground">
                      {asset.outstanding}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      <Badge
                        className={`${getLtvBadgeColor(
                          asset.ltv,
                          asset.status
                        )} font-medium`}
                      >
                        {asset.ltv}
                      </Badge>
                    </td>
                    <td
                      className={`py-3 px-4 text-sm text-right font-medium ${
                        asset.movement.startsWith("+")
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {asset.movement}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge
                        className={`${getStatusBadgeColor(
                          asset.status
                        )} font-medium`}
                      >
                        {asset.status}
                      </Badge>
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
    </div>
  );
};

export default Portfolio;
