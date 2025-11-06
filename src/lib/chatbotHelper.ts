import { dashboardData } from "./dashboardData";
import { mockCustomers, getPortfolioMetrics } from "@/data/mockData";

// Intelligent chatbot response generator based on dashboard context
export function getChatbotResponse(userInput: string): string {
  const input = userInput.toLowerCase().trim();

  // Greetings
  if (input.match(/^(hello|hi|hey|good morning|good afternoon|good evening)/)) {
    return `Hello! I'm your LAS assistant. I have access to all your dashboard data. You can ask me about:
- Loan status and payments
- Portfolio metrics and holdings
- Risk alerts and events
- Collateral information
- Recent activity
- Business rules

What would you like to know?`;
  }

  // Help
  if (input.includes("help") || input === "?") {
    return `I can help you with:

**Overview**: Total outstanding, active loans, portfolio yield, NPA rate
**Portfolio**: Asset composition, top holdings, LTV ratios
**Risk**: Critical events, alerts, pending actions
**Loan Details**: Your loan status, EMI, outstanding balance
**Collateral**: Pledged assets, market values, breakdown
**Trends**: Disbursement patterns, repayment trends

Try asking specific questions like:
- "What's my loan status?"
- "Show me portfolio breakdown"
- "Any critical risk events?"
- "What's my next EMI?"`;
  }

  // Loan Status
  if (input.match(/loan status|my loan|loan details|loan info/)) {
    const loan = dashboardData.customer.loanAmount;
    const balance = dashboardData.customer.outstandingBalance;
    const emi = dashboardData.customer.nextEMI;
    const status = dashboardData.customer.status;

    return `**Your Loan Status:**

Status: ${status}
Original Amount: ${loan.value} (disbursed on ${loan.disbursedDate})
Outstanding Balance: ${balance.value} (${balance.percentage}% remaining)
Next EMI: ${emi.amount} due on ${emi.dueDate}

Your account is in good standing with all payments on time.`;
  }

  // Portfolio queries
  if (input.match(/portfolio|assets|holdings|investments/)) {
    const portfolio = dashboardData.portfolio;
    const composition = portfolio.assetComposition;

    return `**Portfolio Overview:**

Total Value: ${portfolio.totalValue.value} (${portfolio.totalValue.trend.isPositive ? '+' : ''}${portfolio.totalValue.trend.value})
Pledged: ${portfolio.pledgedValue.value} (${portfolio.pledgedValue.percentage})
Average LTV: ${portfolio.averageLTV.value}
At-Risk Assets: ${portfolio.atRiskAssets.value} (${portfolio.atRiskAssets.subtitle})

**Asset Breakdown:**
${composition.map(asset => `• ${asset.name}: ${asset.value}%`).join('\n')}

**Top 3 Holdings:**
${portfolio.topHoldings.slice(0, 3).map((h, i) => `${i + 1}. ${h.name}: ${h.amount}`).join('\n')}`;
  }

  // LTV specific
  if (input.match(/ltv|loan.to.value|loan to value/)) {
    const ltv = dashboardData.customer.collateral.currentLTV;
    const avgLTV = dashboardData.portfolio.averageLTV.value;
    const atRisk = dashboardData.portfolio.atRiskAssets.value;

    return `**LTV Information:**

Your Current LTV: ${ltv}
Portfolio Average LTV: ${avgLTV}
At-Risk Assets (LTV > 70%): ${atRisk}

Your LTV is in the safe zone (0-60%). The recommended maximum is 70%. You're well within safe limits.`;
  }

  // Collateral
  if (input.match(/collateral|pledged|security|assets pledged/)) {
    const collateral = dashboardData.customer.collateral;

    return `**Collateral Summary:**

Pledged Value: ${collateral.pledgedValue}
Current Market Value: ${collateral.marketValue}
Current LTV: ${collateral.currentLTV}

**Breakdown:**
• Equities: ${collateral.breakdown.equities.value} (${collateral.breakdown.equities.percentage}%)
• Mutual Funds: ${collateral.breakdown.mutualFunds.value} (${collateral.breakdown.mutualFunds.percentage}%)
• Bonds: ${collateral.breakdown.bonds.value} (${collateral.breakdown.bonds.percentage}%)

Status: Healthy - Your collateral value is strong.`;
  }

  // Risk queries
  if (input.match(/risk|alert|critical|warning|events/)) {
    const risk = dashboardData.risk;
    const criticalEvents = risk.events.filter(e => e.severity === "Critical");

    return `**Risk Dashboard:**

Critical Events: ${risk.criticalEvents}
High Priority Alerts: ${risk.highPriorityAlerts}
Pending Actions: ${risk.pendingActions}

**Recent Critical Events:**
${criticalEvents.length > 0
  ? criticalEvents.map(e => `• ${e.id}: ${e.customer} - ${e.type} (${e.time})`).join('\n')
  : 'No critical events currently'}

${risk.criticalEvents > 0 ? 'Please review the Risk Management page for immediate action.' : 'All systems operating normally.'}`;
  }

  // EMI / Payment
  if (input.match(/emi|payment|pay|due|next payment/)) {
    const emi = dashboardData.customer.nextEMI;
    const transactions = dashboardData.customer.transactions;
    const lastPayment = transactions.find(t => t.type === "EMI Payment");

    return `**EMI Information:**

Next EMI: ${emi.amount}
Due Date: ${emi.dueDate}
Last Payment: ${lastPayment?.amount} on ${lastPayment?.date}

All previous EMIs paid on time. Your payment history is excellent.`;
  }

  // Recent Activity
  if (input.match(/recent|activity|latest|what.*happened|transactions/)) {
    const activity = dashboardData.recentActivity;

    return `**Recent Activity:**

${activity.map(a =>
  `${a.customer}: ${a.type.toUpperCase()} - ${a.amount} (${a.time})`
).join('\n')}

Would you like details on any specific transaction?`;
  }

  // Outstanding
  if (input.match(/outstanding|balance|owe|remaining|left to pay/)) {
    const balance = dashboardData.customer.outstandingBalance;
    const original = dashboardData.customer.loanAmount;
    const paid = original.rawValue - balance.rawValue;

    return `**Outstanding Balance:**

Current Balance: ${balance.value}
Progress: ${balance.percentage}% remaining
Already Paid: ₹${(paid / 100000).toFixed(2)}L

You've repaid ${(100 - balance.percentage).toFixed(2)}% of your loan. Keep up the great work.`;
  }

  // Metrics / Overview
  if (input.match(/metrics|overview|dashboard|summary|stats|statistics/)) {
    const overview = dashboardData.overview;

    return `**Dashboard Overview:**

Total Outstanding: ${overview.totalOutstanding.value} (${overview.totalOutstanding.trend.isPositive ? '+' : ''}${overview.totalOutstanding.trend.value})
Active Loans: ${overview.activeLoans.value} (${overview.activeLoans.subtitle})
Portfolio Yield: ${overview.portfolioYield.value} (${overview.portfolioYield.subtitle})
NPA Rate: ${overview.npaRate.value} (${overview.npaRate.subtitle})

Overall, the portfolio is performing well with strong growth indicators.`;
  }

  // Top holdings
  if (input.match(/top holding|best perform|major invest|biggest asset/)) {
    const holdings = dashboardData.portfolio.topHoldings;

    return `**Top 5 Holdings by Value:**

${holdings.map((h, i) => `${i + 1}. ${h.name}: ${h.amount} (${h.value}% of portfolio)`).join('\n')}

These assets represent your largest investments and contribute most to your portfolio value.`;
  }

  // Disbursement trends
  if (input.match(/disbursement|trend|monthly|growth|pattern/)) {
    const latest = dashboardData.disbursement[dashboardData.disbursement.length - 1];
    const firstMonth = dashboardData.disbursement[0];

    return `**Disbursement Trends (Last 6 Months):**

Latest Month (${latest.month}):
   • Disbursed: ₹${latest.disbursed / 100}L
   • Repaid: ₹${latest.repaid / 100}L

Growth: From ₹${firstMonth.disbursed / 100}L in ${firstMonth.month} to ₹${latest.disbursed / 100}L in ${latest.month}

The portfolio shows consistent growth with healthy repayment rates.`;
  }

  // DPD / Overdue
  if (input.match(/dpd|overdue|days past due|late payment|delinquent/)) {
    const dpd = dashboardData.dpd;
    const total = dpd.reduce((sum, d) => sum + d.count, 0);

    return `**Days Past Due (DPD) Distribution:**

${dpd.map(d => `${d.category}: ${d.count} loans`).join('\n')}

Total loans with DPD: ${total}
Most are in early stages (0-30 days): ${dpd[0].count} loans

The portfolio maintains good payment discipline overall.`;
  }

  // Specific customers - search in mockCustomers
  const customerMatch = input.match(/rajesh|priya|amit|sneha|vikram|ananya|arjun|meera/i);
  if (customerMatch) {
    const searchName = customerMatch[0];
    const customer = mockCustomers.find(c => c.name.toLowerCase().includes(searchName.toLowerCase()));

    if (customer) {
      return `**Customer Information: ${customer.name}**

Customer ID: ${customer.id}
Loan Amount: ${customer.loanAmount}
Outstanding Balance: ${customer.outstandingBalance}
LTV: ${customer.ltv}
Status: ${customer.status}
Risk Category: ${customer.riskCategory}
Next Payment: ${customer.nextPayment} (Due: ${new Date(customer.dueDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })})
Interest Rate: ${customer.interestRate}%
Tenure: ${customer.tenure} months

The customer account is ${customer.status.toLowerCase()}.`;
    }
  }

  // Customer list queries
  if (input.match(/how many customers|total customers|customer count|list customers|all customers/)) {
    const metrics = getPortfolioMetrics();
    const atRisk = mockCustomers.filter(c => c.status === "At Risk").length;

    return `**Customer Summary:**

Total Customers: ${metrics.totalCustomers}
Active Customers: ${metrics.activeCustomers}
At-Risk Customers: ${atRisk}

Total Outstanding: ${metrics.totalOutstanding}
Total Loan Amount: ${metrics.totalLoanAmount}

Would you like details about any specific customer?`;
  }

  // At-risk customers
  if (input.match(/at risk|risky|problem|high risk/)) {
    const atRiskCustomers = mockCustomers.filter(c => c.status === "At Risk" || c.riskCategory === "High Risk");

    if (atRiskCustomers.length > 0) {
      return `**At-Risk Customers:**

${atRiskCustomers.map(c =>
  `• ${c.name} (${c.id}): LTV ${c.ltv}, Outstanding ${c.outstandingBalance}, Status: ${c.status}`
).join('\n')}

These customers require immediate attention.`;
    } else {
      return "No customers are currently at risk. All accounts are in good standing.";
    }
  }

  // Default intelligent response
  return `I understand you're asking about "${userInput}".

I have access to complete dashboard data including:
• Loan details and EMI information
• Portfolio metrics and asset composition
• Risk alerts and events
• Collateral values and LTV ratios
• Recent transactions and activity

Could you rephrase your question or try asking:
- "What's my portfolio value?"
- "Show risk alerts"
- "When is my next EMI?"
- "What's my LTV?"

Type "help" to see all available queries.`;
}
