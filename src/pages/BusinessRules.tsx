import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Play,
  Save,
  Copy,
  Archive,
  CheckCircle2,
  XCircle,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";

const BusinessRules = () => {
  const [testResult, setTestResult] = useState<any>(null);

  const handleTestRule = () => {
    // Simulate rule testing
    setTestResult({
      eligible: true,
      maxLoan: "₹15,00,000",
      ltv: "65%",
      interestRate: "8.5%",
    });
    toast.success("Rule tested successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Rules Engine</h1>
          <p className="text-muted-foreground mt-1">
            Configure and manage eligibility rules
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          New Rule
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rule Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                Visual Rule Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rule Condition */}
              <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">IF Conditions</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Condition
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Attribute</Label>
                    <Select defaultValue="credit_score">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_score">Credit Score</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="tenure">Account Tenure</SelectItem>
                        <SelectItem value="kyc_status">KYC Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Operator</Label>
                    <Select defaultValue="greater_than">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater_than">&gt; Greater Than</SelectItem>
                        <SelectItem value="less_than">&lt; Less Than</SelectItem>
                        <SelectItem value="equals">= Equals</SelectItem>
                        <SelectItem value="between">Between</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input type="number" placeholder="750" defaultValue="750" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Attribute</Label>
                    <Select defaultValue="income">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_score">Credit Score</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="tenure">Account Tenure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Operator</Label>
                    <Select defaultValue="greater_than">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater_than">&gt; Greater Than</SelectItem>
                        <SelectItem value="less_than">&lt; Less Than</SelectItem>
                        <SelectItem value="equals">= Equals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input type="number" placeholder="500000" defaultValue="500000" />
                  </div>
                </div>
              </div>

              {/* Then Actions */}
              <div className="space-y-4 rounded-lg border border-border bg-accent/5 p-4">
                <h3 className="font-semibold text-foreground">THEN Assign</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Eligibility Status</Label>
                    <Select defaultValue="eligible">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eligible">Eligible</SelectItem>
                        <SelectItem value="not_eligible">Not Eligible</SelectItem>
                        <SelectItem value="review_required">Review Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Max Loan Amount (₹)</Label>
                    <Input type="number" placeholder="2000000" defaultValue="2000000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Max LTV (%)</Label>
                    <Input type="number" placeholder="70" defaultValue="70" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input type="number" step="0.1" placeholder="8.5" defaultValue="8.5" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1" variant="outline" onClick={handleTestRule}>
                  <Play className="mr-2 h-4 w-4" />
                  Test Rule
                </Button>
                <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Rule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResult && (
            <Card className="shadow-medium border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm text-muted-foreground">Eligibility</p>
                    <p className="text-lg font-semibold text-success">Eligible</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                    <p className="text-lg font-semibold text-foreground">{testResult.maxLoan}</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm text-muted-foreground">Permitted LTV</p>
                    <p className="text-lg font-semibold text-foreground">{testResult.ltv}</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-lg font-semibold text-foreground">{testResult.interestRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Rule Repository */}
        <div className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Active Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "HNI Premium", status: "active", priority: 1 },
                { name: "Salaried Standard", status: "active", priority: 2 },
                { name: "Self-Employed", status: "active", priority: 3 },
                { name: "First-Time Borrower", status: "draft", priority: 4 },
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{rule.name}</p>
                    <p className="text-xs text-muted-foreground">Priority: {rule.priority}</p>
                  </div>
                  <Badge
                    variant={rule.status === "active" ? "default" : "secondary"}
                    className={rule.status === "active" ? "bg-success text-success-foreground" : ""}
                  >
                    {rule.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Rule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Archive className="mr-2 h-4 w-4" />
                Archive Rule
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Deactivate Rule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessRules;
