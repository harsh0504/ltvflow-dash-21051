// Centralized mock data for LAS Dashboard
// All amounts in INR, dates in YYYY-MM-DD format

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan: string;
  location: string;
  kycStatus: "Completed" | "Pending" | "In Progress";
  verificationDate: string;
  riskCategory: "Low Risk" | "Medium Risk" | "High Risk";
  loanAmount: string;
  loanAmountNumeric: number;
  outstandingBalance: string;
  outstandingNumeric: number;
  ltv: string;
  ltvNumeric: number;
  status: "Active" | "At Risk" | "Closed" | "Defaulted";
  nextPayment: string;
  nextPaymentNumeric: number;
  dueDate: string;
  disbursedDate: string;
  pledgedValue: string;
  pledgedValueNumeric: number;
  marketValue: string;
  marketValueNumeric: number;
  interestRate: number;
  tenure: number; // in months
  emiAmount: string;
  emiAmountNumeric: number;
}

export interface Application {
  id: string;
  name: string;
  funnel: "Applied" | "KYC" | "Pledge" | "Disbursal";
  status: string;
  action: string;
  financialStatus: "Verified" | "Pending" | "Under Review" | "Approved" | "In Progress" | "Rejected";
  lasLms: string;
  lastCommunicated: string;
  applicationDate: string;
  expectedAmount: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  date: string;
  type: "Bill Payment" | "Collateral Added" | "Collateral Released" | "Top-Up" | "Foreclosure" | "Late Fee";
  amount: string;
  amountNumeric: number;
  status: "Completed" | "Pending" | "Failed";
  referenceNumber: string;
}

// Mock Customers Data
export const mockCustomers: Customer[] = [
  {
    id: "CUS001",
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 98765 43210",
    pan: "ABCPK1234M",
    location: "Mumbai, Maharashtra",
    kycStatus: "Completed",
    verificationDate: "2024-01-10",
    riskCategory: "Low Risk",
    loanAmount: "₹20,00,000",
    loanAmountNumeric: 2000000,
    outstandingBalance: "₹17,35,000",
    outstandingNumeric: 1735000,
    ltv: "51.8%",
    ltvNumeric: 51.8,
    status: "Active",
    nextPayment: "₹45,000",
    nextPaymentNumeric: 45000,
    dueDate: "2024-08-15",
    disbursedDate: "2024-01-15",
    pledgedValue: "₹33,50,000",
    pledgedValueNumeric: 3350000,
    marketValue: "₹38,50,000",
    marketValueNumeric: 3850000,
    interestRate: 10.5,
    tenure: 60,
    emiAmount: "₹45,000",
    emiAmountNumeric: 45000,
  },
  {
    id: "CUS002",
    name: "Priya Deshmukh",
    email: "priya.deshmukh@email.com",
    phone: "+91 98123 45678",
    pan: "BCDPD5678N",
    location: "Pune, Maharashtra",
    kycStatus: "Completed",
    verificationDate: "2024-02-12",
    riskCategory: "Medium Risk",
    loanAmount: "₹35,00,000",
    loanAmountNumeric: 3500000,
    outstandingBalance: "₹28,90,000",
    outstandingNumeric: 2890000,
    ltv: "63.2%",
    ltvNumeric: 63.2,
    status: "Active",
    nextPayment: "₹78,000",
    nextPaymentNumeric: 78000,
    dueDate: "2024-08-20",
    disbursedDate: "2024-02-15",
    pledgedValue: "₹55,00,000",
    pledgedValueNumeric: 5500000,
    marketValue: "₹62,00,000",
    marketValueNumeric: 6200000,
    interestRate: 11.0,
    tenure: 48,
    emiAmount: "₹78,000",
    emiAmountNumeric: 78000,
  },
  {
    id: "CUS003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 99887 76655",
    pan: "CDEAP8901O",
    location: "Ahmedabad, Gujarat",
    kycStatus: "Completed",
    verificationDate: "2023-11-05",
    riskCategory: "High Risk",
    loanAmount: "₹15,00,000",
    loanAmountNumeric: 1500000,
    outstandingBalance: "₹12,50,000",
    outstandingNumeric: 1250000,
    ltv: "72.5%",
    ltvNumeric: 72.5,
    status: "At Risk",
    nextPayment: "₹32,000",
    nextPaymentNumeric: 32000,
    dueDate: "2024-08-18",
    disbursedDate: "2023-11-10",
    pledgedValue: "₹17,25,000",
    pledgedValueNumeric: 1725000,
    marketValue: "₹18,50,000",
    marketValueNumeric: 1850000,
    interestRate: 12.5,
    tenure: 60,
    emiAmount: "₹32,000",
    emiAmountNumeric: 32000,
  },
  {
    id: "CUS004",
    name: "Sneha Iyer",
    email: "sneha.iyer@email.com",
    phone: "+91 97654 32109",
    pan: "DEFSI2345P",
    location: "Bangalore, Karnataka",
    kycStatus: "Completed",
    verificationDate: "2024-04-20",
    riskCategory: "Low Risk",
    loanAmount: "₹50,00,000",
    loanAmountNumeric: 5000000,
    outstandingBalance: "₹45,00,000",
    outstandingNumeric: 4500000,
    ltv: "58.3%",
    ltvNumeric: 58.3,
    status: "Active",
    nextPayment: "₹1,05,000",
    nextPaymentNumeric: 105000,
    dueDate: "2024-08-22",
    disbursedDate: "2024-04-25",
    pledgedValue: "₹85,00,000",
    pledgedValueNumeric: 8500000,
    marketValue: "₹95,00,000",
    marketValueNumeric: 9500000,
    interestRate: 10.0,
    tenure: 60,
    emiAmount: "₹1,05,000",
    emiAmountNumeric: 105000,
  },
  {
    id: "CUS005",
    name: "Vikram Singh Rathore",
    email: "vikram.rathore@email.com",
    phone: "+91 96543 21098",
    pan: "EFGVR6789Q",
    location: "Jaipur, Rajasthan",
    kycStatus: "Completed",
    verificationDate: "2024-03-15",
    riskCategory: "Low Risk",
    loanAmount: "₹28,00,000",
    loanAmountNumeric: 2800000,
    outstandingBalance: "₹22,40,000",
    outstandingNumeric: 2240000,
    ltv: "49.2%",
    ltvNumeric: 49.2,
    status: "Active",
    nextPayment: "₹62,000",
    nextPaymentNumeric: 62000,
    dueDate: "2024-08-10",
    disbursedDate: "2024-03-20",
    pledgedValue: "₹56,00,000",
    pledgedValueNumeric: 5600000,
    marketValue: "₹64,00,000",
    marketValueNumeric: 6400000,
    interestRate: 10.75,
    tenure: 48,
    emiAmount: "₹62,000",
    emiAmountNumeric: 62000,
  },
  {
    id: "CUS006",
    name: "Ananya Chatterjee",
    email: "ananya.chatterjee@email.com",
    phone: "+91 95432 10987",
    pan: "FGHAC3456R",
    location: "Kolkata, West Bengal",
    kycStatus: "Completed",
    verificationDate: "2024-05-08",
    riskCategory: "Medium Risk",
    loanAmount: "₹18,50,000",
    loanAmountNumeric: 1850000,
    outstandingBalance: "₹16,20,000",
    outstandingNumeric: 1620000,
    ltv: "67.8%",
    ltvNumeric: 67.8,
    status: "Active",
    nextPayment: "₹41,000",
    nextPaymentNumeric: 41000,
    dueDate: "2024-08-25",
    disbursedDate: "2024-05-10",
    pledgedValue: "₹27,30,000",
    pledgedValueNumeric: 2730000,
    marketValue: "₹31,00,000",
    marketValueNumeric: 3100000,
    interestRate: 11.25,
    tenure: 48,
    emiAmount: "₹41,000",
    emiAmountNumeric: 41000,
  },
  {
    id: "CUS007",
    name: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 94321 09876",
    pan: "GHIAR7890S",
    location: "Hyderabad, Telangana",
    kycStatus: "Completed",
    verificationDate: "2023-12-20",
    riskCategory: "Low Risk",
    loanAmount: "₹42,00,000",
    loanAmountNumeric: 4200000,
    outstandingBalance: "₹31,50,000",
    outstandingNumeric: 3150000,
    ltv: "45.7%",
    ltvNumeric: 45.7,
    status: "Active",
    nextPayment: "₹92,000",
    nextPaymentNumeric: 92000,
    dueDate: "2024-08-08",
    disbursedDate: "2023-12-25",
    pledgedValue: "₹91,00,000",
    pledgedValueNumeric: 9100000,
    marketValue: "₹1,02,00,000",
    marketValueNumeric: 10200000,
    interestRate: 10.25,
    tenure: 60,
    emiAmount: "₹92,000",
    emiAmountNumeric: 92000,
  },
  {
    id: "CUS008",
    name: "Meera Kapoor",
    email: "meera.kapoor@email.com",
    phone: "+91 93210 98765",
    pan: "HIJMK4567T",
    location: "Delhi, NCR",
    kycStatus: "Completed",
    verificationDate: "2024-06-12",
    riskCategory: "Low Risk",
    loanAmount: "₹25,00,000",
    loanAmountNumeric: 2500000,
    outstandingBalance: "₹23,75,000",
    outstandingNumeric: 2375000,
    ltv: "52.4%",
    ltvNumeric: 52.4,
    status: "Active",
    nextPayment: "₹55,000",
    nextPaymentNumeric: 55000,
    dueDate: "2024-08-12",
    disbursedDate: "2024-06-15",
    pledgedValue: "₹47,50,000",
    pledgedValueNumeric: 4750000,
    marketValue: "₹53,00,000",
    marketValueNumeric: 5300000,
    interestRate: 10.50,
    tenure: 48,
    emiAmount: "₹55,000",
    emiAmountNumeric: 55000,
  },
];

// Mock Applications Data
export const mockApplications: Application[] = [
  {
    id: "APP001",
    name: "Rahul Verma",
    funnel: "KYC",
    status: "Pending Verification",
    action: "Call Customer",
    financialStatus: "Verified",
    lasLms: "LAS-2024-091",
    lastCommunicated: "2024-07-05",
    applicationDate: "2024-06-28",
    expectedAmount: "₹12,00,000",
  },
  {
    id: "APP002",
    name: "Anita Singh",
    funnel: "Pledge",
    status: "Awaiting Documents",
    action: "Share Guidelines",
    financialStatus: "Under Review",
    lasLms: "LAS-2024-092",
    lastCommunicated: "2024-07-03",
    applicationDate: "2024-06-20",
    expectedAmount: "₹22,50,000",
  },
  {
    id: "APP003",
    name: "Vikram Joshi",
    funnel: "Disbursal",
    status: "Processing",
    action: "Send Update",
    financialStatus: "Approved",
    lasLms: "LMS-2024-015",
    lastCommunicated: "2024-07-04",
    applicationDate: "2024-06-15",
    expectedAmount: "₹35,00,000",
  },
  {
    id: "APP004",
    name: "Kavita Menon",
    funnel: "Applied",
    status: "New Application",
    action: "Screen Application",
    financialStatus: "Pending",
    lasLms: "LAS-2024-093",
    lastCommunicated: "2024-07-06",
    applicationDate: "2024-07-06",
    expectedAmount: "₹8,50,000",
  },
  {
    id: "APP005",
    name: "Arjun Nair",
    funnel: "KYC",
    status: "Documents Submitted",
    action: "Verify Documents",
    financialStatus: "In Progress",
    lasLms: "LAS-2024-094",
    lastCommunicated: "2024-07-05",
    applicationDate: "2024-06-30",
    expectedAmount: "₹18,00,000",
  },
  {
    id: "APP006",
    name: "Deepak Malhotra",
    funnel: "Pledge",
    status: "Securities Evaluation",
    action: "Review Collateral",
    financialStatus: "Under Review",
    lasLms: "LAS-2024-095",
    lastCommunicated: "2024-07-04",
    applicationDate: "2024-06-22",
    expectedAmount: "₹28,00,000",
  },
];

// Mock Transactions Data
export const mockTransactions: Transaction[] = [
  // CUS001 - Rajesh Kumar Sharma
  { id: "TXN001", customerId: "CUS001", date: "2024-07-15", type: "Bill Payment", amount: "₹45,000", amountNumeric: 45000, status: "Completed", referenceNumber: "REF2024071501" },
  { id: "TXN002", customerId: "CUS001", date: "2024-06-15", type: "Bill Payment", amount: "₹45,000", amountNumeric: 45000, status: "Completed", referenceNumber: "REF2024061501" },
  { id: "TXN003", customerId: "CUS001", date: "2024-04-20", type: "Collateral Added", amount: "₹5,00,000", amountNumeric: 500000, status: "Completed", referenceNumber: "REF2024042001" },

  // CUS002 - Priya Deshmukh
  { id: "TXN004", customerId: "CUS002", date: "2024-07-20", type: "Bill Payment", amount: "₹78,000", amountNumeric: 78000, status: "Completed", referenceNumber: "REF2024072001" },
  { id: "TXN005", customerId: "CUS002", date: "2024-06-20", type: "Bill Payment", amount: "₹78,000", amountNumeric: 78000, status: "Completed", referenceNumber: "REF2024062001" },

  // CUS003 - Amit Patel
  { id: "TXN006", customerId: "CUS003", date: "2024-07-18", type: "Bill Payment", amount: "₹32,000", amountNumeric: 32000, status: "Completed", referenceNumber: "REF2024071801" },
  { id: "TXN007", customerId: "CUS003", date: "2024-06-18", type: "Bill Payment", amount: "₹32,000", amountNumeric: 32000, status: "Pending", referenceNumber: "REF2024061801" },
  { id: "TXN008", customerId: "CUS003", date: "2024-05-20", type: "Late Fee", amount: "₹500", amountNumeric: 500, status: "Completed", referenceNumber: "REF2024052001" },

  // CUS004 - Sneha Iyer
  { id: "TXN009", customerId: "CUS004", date: "2024-07-22", type: "Bill Payment", amount: "₹1,05,000", amountNumeric: 105000, status: "Completed", referenceNumber: "REF2024072201" },
  { id: "TXN010", customerId: "CUS004", date: "2024-06-22", type: "Bill Payment", amount: "₹1,05,000", amountNumeric: 105000, status: "Completed", referenceNumber: "REF2024062201" },
  { id: "TXN011", customerId: "CUS004", date: "2024-05-10", type: "Top-Up", amount: "₹10,00,000", amountNumeric: 1000000, status: "Completed", referenceNumber: "REF2024051001" },

  // CUS005 - Vikram Singh Rathore
  { id: "TXN012", customerId: "CUS005", date: "2024-07-10", type: "Bill Payment", amount: "₹62,000", amountNumeric: 62000, status: "Completed", referenceNumber: "REF2024071001" },
  { id: "TXN013", customerId: "CUS005", date: "2024-06-10", type: "Bill Payment", amount: "₹62,000", amountNumeric: 62000, status: "Completed", referenceNumber: "REF2024061001" },
  { id: "TXN014", customerId: "CUS005", date: "2024-05-10", type: "Bill Payment", amount: "₹62,000", amountNumeric: 62000, status: "Completed", referenceNumber: "REF2024051002" },
  { id: "TXN015", customerId: "CUS005", date: "2024-04-10", type: "Bill Payment", amount: "₹62,000", amountNumeric: 62000, status: "Completed", referenceNumber: "REF2024041001" },

  // CUS006 - Ananya Chatterjee
  { id: "TXN016", customerId: "CUS006", date: "2024-07-25", type: "Bill Payment", amount: "₹41,000", amountNumeric: 41000, status: "Completed", referenceNumber: "REF2024072501" },
  { id: "TXN017", customerId: "CUS006", date: "2024-06-25", type: "Bill Payment", amount: "₹41,000", amountNumeric: 41000, status: "Completed", referenceNumber: "REF2024062501" },
  { id: "TXN018", customerId: "CUS006", date: "2024-06-05", type: "Collateral Added", amount: "₹3,50,000", amountNumeric: 350000, status: "Completed", referenceNumber: "REF2024060501" },

  // CUS007 - Arjun Reddy
  { id: "TXN019", customerId: "CUS007", date: "2024-07-08", type: "Bill Payment", amount: "₹92,000", amountNumeric: 92000, status: "Completed", referenceNumber: "REF2024070801" },
  { id: "TXN020", customerId: "CUS007", date: "2024-06-08", type: "Bill Payment", amount: "₹92,000", amountNumeric: 92000, status: "Completed", referenceNumber: "REF2024060801" },
  { id: "TXN021", customerId: "CUS007", date: "2024-05-08", type: "Bill Payment", amount: "₹92,000", amountNumeric: 92000, status: "Completed", referenceNumber: "REF2024050801" },
  { id: "TXN022", customerId: "CUS007", date: "2024-03-15", type: "Collateral Released", amount: "₹8,00,000", amountNumeric: 800000, status: "Completed", referenceNumber: "REF2024031501" },
  { id: "TXN023", customerId: "CUS007", date: "2024-02-08", type: "Bill Payment", amount: "₹92,000", amountNumeric: 92000, status: "Completed", referenceNumber: "REF2024020801" },

  // CUS008 - Meera Kapoor
  { id: "TXN024", customerId: "CUS008", date: "2024-07-12", type: "Bill Payment", amount: "₹55,000", amountNumeric: 55000, status: "Completed", referenceNumber: "REF2024071201" },
  { id: "TXN025", customerId: "CUS008", date: "2024-07-01", type: "Collateral Added", amount: "₹2,50,000", amountNumeric: 250000, status: "Pending", referenceNumber: "REF2024070101" },
];

// Helper function to get customer by ID
export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

// Helper function to get transactions by customer ID
export const getTransactionsByCustomerId = (customerId: string): Transaction[] => {
  return mockTransactions.filter(txn => txn.customerId === customerId);
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to calculate portfolio metrics
export const getPortfolioMetrics = () => {
  const totalLoanAmount = mockCustomers.reduce((sum, c) => sum + c.loanAmountNumeric, 0);
  const totalOutstanding = mockCustomers.reduce((sum, c) => sum + c.outstandingNumeric, 0);
  const activeCustomers = mockCustomers.filter(c => c.status === "Active").length;
  const atRiskCustomers = mockCustomers.filter(c => c.status === "At Risk").length;
  const averageLTV = mockCustomers.reduce((sum, c) => sum + c.ltvNumeric, 0) / mockCustomers.length;

  return {
    totalLoanAmount: formatCurrency(totalLoanAmount),
    totalLoanAmountNumeric: totalLoanAmount,
    totalOutstanding: formatCurrency(totalOutstanding),
    totalOutstandingNumeric: totalOutstanding,
    activeCustomers,
    atRiskCustomers,
    totalCustomers: mockCustomers.length,
    averageLTV: averageLTV.toFixed(2) + "%",
    averageLTVNumeric: averageLTV,
  };
};
