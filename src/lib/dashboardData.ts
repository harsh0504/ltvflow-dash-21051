// Centralized dashboard data that the chatbot can access

export const dashboardData = {
  // Overview Metrics
  overview: {
    totalOutstanding: {
      value: "₹124.5M",
      rawValue: 124500000,
      subtitle: "Across 1,234 loans",
      trend: { value: "12.5%", isPositive: true }
    },
    activeLoans: {
      value: "1,234",
      rawValue: 1234,
      subtitle: "658 new this month",
      trend: { value: "8.2%", isPositive: true }
    },
    portfolioYield: {
      value: "9.2%",
      rawValue: 9.2,
      subtitle: "Average interest rate",
      trend: { value: "0.5%", isPositive: true }
    },
    npaRate: {
      value: "1.8%",
      rawValue: 1.8,
      subtitle: "Non-performing assets",
      trend: { value: "0.3%", isPositive: false }
    }
  },

  // Disbursement Data
  disbursement: [
    { month: "Jan", disbursed: 4200, repaid: 3800 },
    { month: "Feb", disbursed: 5100, repaid: 4200 },
    { month: "Mar", disbursed: 4800, repaid: 4500 },
    { month: "Apr", disbursed: 6200, repaid: 5100 },
    { month: "May", disbursed: 7500, repaid: 6300 },
    { month: "Jun", disbursed: 8200, repaid: 7100 },
  ],

  // DPD (Days Past Due) Distribution
  dpd: [
    { category: "0-30 Days", count: 45 },
    { category: "31-60 Days", count: 12 },
    { category: "61-90 Days", count: 5 },
    { category: "90+ Days", count: 2 },
  ],

  // Recent Activity
  recentActivity: [
    { type: "disbursement", amount: "₹2.5L", customer: "Rajesh Kumar", time: "2 hours ago", isPositive: true },
    { type: "repayment", amount: "₹1.8L", customer: "Priya Sharma", time: "4 hours ago", isPositive: true },
    { type: "alert", amount: "LTV Breach", customer: "Amit Patel", time: "6 hours ago", isPositive: false },
    { type: "disbursement", amount: "₹3.2L", customer: "Neha Gupta", time: "8 hours ago", isPositive: true },
  ],

  // Portfolio Metrics
  portfolio: {
    totalValue: {
      value: "₹342.5M",
      rawValue: 342500000,
      trend: { value: "5.2%", isPositive: true }
    },
    pledgedValue: {
      value: "₹218.6M",
      rawValue: 218600000,
      percentage: "63.8%"
    },
    averageLTV: {
      value: "66.4%",
      rawValue: 66.4
    },
    atRiskAssets: {
      value: "23",
      rawValue: 23,
      subtitle: "LTV > 70%"
    },
    assetComposition: [
      { name: "Equities", value: 45, color: "hsl(var(--primary))" },
      { name: "Mutual Funds", value: 30, color: "hsl(var(--secondary))" },
      { name: "Bonds", value: 15, color: "hsl(var(--accent))" },
      { name: "ETFs", value: 7, color: "hsl(var(--success))" },
      { name: "Other", value: 3, color: "hsl(var(--muted-foreground))" },
    ],
    topHoldings: [
      { name: "Reliance Industries", value: 18, amount: "₹12.5M" },
      { name: "TCS Limited", value: 14, amount: "₹9.2M" },
      { name: "HDFC Bank", value: 13, amount: "₹8.75M" },
      { name: "Infosys", value: 10, amount: "₹6.4M" },
      { name: "SBI Bluechip Fund", value: 8, amount: "₹5.6M" },
    ]
  },

  // Risk Management
  risk: {
    criticalEvents: 12,
    highPriorityAlerts: 28,
    pendingActions: 45,
    events: [
      { id: "RE001", customer: "Rajesh Kumar", type: "LTV Breach", severity: "Critical", time: "10 mins ago", status: "Open" },
      { id: "RE002", customer: "Priya Sharma", type: "Price Drop", severity: "High", time: "1 hour ago", status: "In Progress" },
      { id: "RE003", customer: "Amit Patel", type: "Concentration Risk", severity: "Medium", time: "2 hours ago", status: "Open" },
      { id: "RE004", customer: "Neha Gupta", type: "Payment Delay", severity: "High", time: "3 hours ago", status: "Resolved" },
      { id: "RE005", customer: "Vikram Singh", type: "Volatility Spike", severity: "Low", time: "5 hours ago", status: "Open" },
    ]
  },

  // Customer Data
  customer: {
    name: "Rajesh Kumar",
    loanAmount: {
      value: "₹20,00,000",
      rawValue: 2000000,
      disbursedDate: "Jan 15, 2024"
    },
    outstandingBalance: {
      value: "₹17,35,000",
      rawValue: 1735000,
      percentage: 86.75
    },
    nextEMI: {
      amount: "₹45,000",
      rawValue: 45000,
      dueDate: "Jul 15, 2024"
    },
    status: "Active",
    collateral: {
      pledgedValue: "₹28,50,000",
      marketValue: "₹33,50,000",
      currentLTV: "51.8%",
      breakdown: {
        equities: { value: "₹18,50,000", percentage: 55 },
        mutualFunds: { value: "₹12,00,000", percentage: 36 },
        bonds: { value: "₹3,00,000", percentage: 9 }
      }
    },
    transactions: [
      { date: "2024-06-15", type: "EMI Payment", amount: "₹45,000", status: "Completed" },
      { date: "2024-05-15", type: "EMI Payment", amount: "₹45,000", status: "Completed" },
      { date: "2024-04-20", type: "Collateral Added", amount: "₹2,00,000", status: "Completed" },
      { date: "2024-04-15", type: "EMI Payment", amount: "₹45,000", status: "Completed" },
    ]
  }
};
