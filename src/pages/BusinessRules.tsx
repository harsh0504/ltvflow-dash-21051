import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Copy,
  Archive,
  CheckCircle2,
  Settings2,
  Clock,
  User,
  FileEdit,
  Trash2,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface Condition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

interface ConditionGroup {
  id: string;
  logic: 'AND' | 'OR';
  conditions: Condition[];
}

interface AuditEntry {
  id: string;
  action: 'created' | 'updated' | 'activated' | 'deactivated';
  changedBy: string;
  timestamp: string;
  changes: string;
}

interface Rule {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'inactive';
  priority: number;
  description: string;
  groups: ConditionGroup[];
  actions: {
    eligibility: string;
    maxLoan: string;
    maxLTV: string;
    interestRate: string;
  };
  auditTrail: AuditEntry[];
}

const BusinessRules = () => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New rule form state
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');
  const [newRulePriority, setNewRulePriority] = useState('5');
  const [groups, setGroups] = useState<ConditionGroup[]>([
    {
      id: '1',
      logic: 'AND',
      conditions: [
        { id: '1-1', attribute: 'credit_score', operator: 'greater_than', value: '' },
      ]
    }
  ]);
  const [eligibility, setEligibility] = useState('eligible');
  const [maxLoan, setMaxLoan] = useState('');
  const [maxLTV, setMaxLTV] = useState('');
  const [interestRate, setInterestRate] = useState('');

  // Sample rules data with audit trail
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'HNI Premium',
      status: 'active',
      priority: 1,
      description: 'High Net Worth Individual eligibility criteria for premium loan products',
      groups: [
        {
          id: '1',
          logic: 'AND',
          conditions: [
            { id: '1-1', attribute: 'credit_score', operator: 'greater_than', value: '750' },
            { id: '1-2', attribute: 'income', operator: 'greater_than', value: '1500000' },
            { id: '1-3', attribute: 'age', operator: 'between', value: '25-60' },
          ]
        }
      ],
      actions: {
        eligibility: 'eligible',
        maxLoan: '₹50,00,000',
        maxLTV: '80%',
        interestRate: '7.5%',
      },
      auditTrail: [
        {
          id: 'a1',
          action: 'updated',
          changedBy: 'Rajesh Kumar',
          timestamp: '2025-11-04 14:30:00',
          changes: 'Updated max LTV from 75% to 80%',
        },
        {
          id: 'a2',
          action: 'updated',
          changedBy: 'Priya Sharma',
          timestamp: '2025-10-15 10:15:00',
          changes: 'Updated minimum income from ₹10L to ₹15L',
        },
        {
          id: 'a3',
          action: 'created',
          changedBy: 'Amit Singh',
          timestamp: '2025-09-01 09:00:00',
          changes: 'Initial rule creation',
        },
      ]
    },
    {
      id: '2',
      name: 'Salaried Standard',
      status: 'active',
      priority: 2,
      description: 'Standard eligibility for salaried employees',
      groups: [
        {
          id: '1',
          logic: 'AND',
          conditions: [
            { id: '1-1', attribute: 'credit_score', operator: 'greater_than', value: '650' },
            { id: '1-2', attribute: 'income', operator: 'greater_than', value: '500000' },
            { id: '1-3', attribute: 'employment', operator: 'equals', value: 'Salaried' },
          ]
        }
      ],
      actions: {
        eligibility: 'eligible',
        maxLoan: '₹20,00,000',
        maxLTV: '65%',
        interestRate: '9.0%',
      },
      auditTrail: [
        {
          id: 'b1',
          action: 'activated',
          changedBy: 'Neha Gupta',
          timestamp: '2025-10-20 11:45:00',
          changes: 'Rule activated after review',
        },
        {
          id: 'b2',
          action: 'created',
          changedBy: 'Vikram Reddy',
          timestamp: '2025-10-18 16:30:00',
          changes: 'Initial rule creation',
        },
      ]
    },
    {
      id: '3',
      name: 'Self-Employed',
      status: 'active',
      priority: 3,
      description: 'Eligibility criteria for self-employed individuals',
      groups: [
        {
          id: '1',
          logic: 'AND',
          conditions: [
            { id: '1-1', attribute: 'credit_score', operator: 'greater_than', value: '700' },
            { id: '1-2', attribute: 'income', operator: 'greater_than', value: '800000' },
            { id: '1-3', attribute: 'employment', operator: 'equals', value: 'Self-Employed' },
          ]
        }
      ],
      actions: {
        eligibility: 'eligible',
        maxLoan: '₹15,00,000',
        maxLTV: '60%',
        interestRate: '9.5%',
      },
      auditTrail: [
        {
          id: 'c1',
          action: 'updated',
          changedBy: 'Sanjay Patel',
          timestamp: '2025-11-01 13:20:00',
          changes: 'Updated interest rate from 10% to 9.5%',
        },
        {
          id: 'c2',
          action: 'created',
          changedBy: 'Kavita Desai',
          timestamp: '2025-08-15 12:00:00',
          changes: 'Initial rule creation',
        },
      ]
    },
    {
      id: '4',
      name: 'First-Time Borrower',
      status: 'draft',
      priority: 4,
      description: 'Special criteria for first-time loan applicants',
      groups: [
        {
          id: '1',
          logic: 'AND',
          conditions: [
            { id: '1-1', attribute: 'credit_score', operator: 'greater_than', value: '680' },
            { id: '1-2', attribute: 'income', operator: 'greater_than', value: '600000' },
            { id: '1-3', attribute: 'age', operator: 'greater_equal', value: '21' },
          ]
        }
      ],
      actions: {
        eligibility: 'review_required',
        maxLoan: '₹10,00,000',
        maxLTV: '55%',
        interestRate: '10.0%',
      },
      auditTrail: [
        {
          id: 'd1',
          action: 'updated',
          changedBy: 'Rahul Mehta',
          timestamp: '2025-11-03 15:00:00',
          changes: 'Updated max loan amount from ₹8L to ₹10L',
        },
        {
          id: 'd2',
          action: 'created',
          changedBy: 'Anita Joshi',
          timestamp: '2025-10-25 09:30:00',
          changes: 'Draft rule created for review',
        },
      ]
    },
  ]);

  const handleRuleClick = (rule: Rule) => {
    setSelectedRule(rule);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'draft':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'text-blue-600';
      case 'updated':
        return 'text-amber-600';
      case 'activated':
        return 'text-green-600';
      case 'deactivated':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatAttributeName = (attribute: string) => {
    const names: Record<string, string> = {
      credit_score: 'Credit Score',
      income: 'Income',
      age: 'Age',
      tenure: 'Account Tenure',
      kyc_status: 'KYC Status',
      employment: 'Employment Type',
    };
    return names[attribute] || attribute;
  };

  const formatOperator = (operator: string) => {
    const operators: Record<string, string> = {
      greater_than: '>',
      less_than: '<',
      equals: '=',
      not_equals: '≠',
      greater_equal: '≥',
      less_equal: '≤',
      between: 'between',
      contains: 'contains',
    };
    return operators[operator] || operator;
  };

  // Condition management functions
  const addCondition = (groupId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: [
            ...group.conditions,
            {
              id: `${groupId}-${group.conditions.length + 1}`,
              attribute: 'credit_score',
              operator: 'greater_than',
              value: ''
            }
          ]
        };
      }
      return group;
    }));
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.filter(c => c.id !== conditionId)
        };
      }
      return group;
    }).filter(group => group.conditions.length > 0));
  };

  const updateCondition = (groupId: string, conditionId: string, field: keyof Condition, value: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.map(c =>
            c.id === conditionId ? { ...c, [field]: value } : c
          )
        };
      }
      return group;
    }));
  };

  const updateGroupLogic = (groupId: string, logic: 'AND' | 'OR') => {
    setGroups(groups.map(group =>
      group.id === groupId ? { ...group, logic } : group
    ));
  };

  const addGroup = () => {
    setGroups([
      ...groups,
      {
        id: String(groups.length + 1),
        logic: 'AND',
        conditions: [
          { id: `${groups.length + 1}-1`, attribute: 'credit_score', operator: 'greater_than', value: '' }
        ]
      }
    ]);
  };

  const handleNewRule = () => {
    setIsCreateOpen(true);
    // Reset form
    setNewRuleName('');
    setNewRuleDescription('');
    setNewRulePriority('5');
    setGroups([
      {
        id: '1',
        logic: 'AND',
        conditions: [
          { id: '1-1', attribute: 'credit_score', operator: 'greater_than', value: '' },
        ]
      }
    ]);
    setEligibility('eligible');
    setMaxLoan('');
    setMaxLTV('');
    setInterestRate('');
  };

  const handleSaveRule = () => {
    if (!newRuleName.trim()) {
      toast.error('Please enter a rule name');
      return;
    }

    const newRule: Rule = {
      id: String(rules.length + 1),
      name: newRuleName,
      description: newRuleDescription,
      status: 'draft',
      priority: parseInt(newRulePriority),
      groups: groups,
      actions: {
        eligibility: eligibility,
        maxLoan: maxLoan ? `₹${parseInt(maxLoan).toLocaleString('en-IN')}` : '₹0',
        maxLTV: maxLTV ? `${maxLTV}%` : '0%',
        interestRate: interestRate ? `${interestRate}%` : '0%',
      },
      auditTrail: [
        {
          id: 'new-1',
          action: 'created',
          changedBy: 'Current User',
          timestamp: new Date().toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          changes: 'Initial rule creation',
        }
      ]
    };

    setRules([...rules, newRule]);
    setIsCreateOpen(false);
    toast.success('Rule created successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Rules</h1>
          <p className="text-muted-foreground mt-1">
            View and manage loan eligibility rules
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={handleNewRule}>
          <Plus className="mr-2 h-4 w-4" />
          New Rule
        </Button>
      </div>

      {/* Rules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <Card
            key={rule.id}
            className="shadow-medium hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleRuleClick(rule)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rule.description}
                  </p>
                </div>
                <Badge className={`${getStatusColor(rule.status)} border`}>
                  {rule.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="font-medium">{rule.priority}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Max Loan</span>
                  <span className="font-medium">{rule.actions.maxLoan}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-medium">{rule.actions.interestRate}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {rule.groups[0].conditions.length} condition{rule.groups[0].conditions.length !== 1 ? 's' : ''} • {rule.auditTrail.length} audit entries
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rule Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedRule?.name}</span>
              <Badge className={`${getStatusColor(selectedRule?.status || '')} border`}>
                {selectedRule?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {selectedRule?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedRule && (
            <div className="space-y-6 mt-4">
              {/* Rule Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-primary" />
                    Rule Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedRule.groups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      {group.conditions.map((condition, idx) => (
                        <div
                          key={condition.id}
                          className="flex items-center gap-3 py-2 px-3 bg-muted/30 rounded-lg"
                        >
                          {idx === 0 && (
                            <Badge variant="outline" className="text-xs">
                              {group.logic}
                            </Badge>
                          )}
                          {idx > 0 && (
                            <span className="text-xs text-muted-foreground px-2">
                              {group.logic}
                            </span>
                          )}
                          <div className="flex-1 flex items-center gap-2 text-sm">
                            <span className="font-medium">
                              {formatAttributeName(condition.attribute)}
                            </span>
                            <span className="text-muted-foreground">
                              {formatOperator(condition.operator)}
                            </span>
                            <span className="font-semibold text-primary">
                              {condition.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-sm text-muted-foreground">Eligibility Status</p>
                      <p className="text-base font-semibold text-foreground capitalize">
                        {selectedRule.actions.eligibility.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                      <p className="text-base font-semibold text-foreground">
                        {selectedRule.actions.maxLoan}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-sm text-muted-foreground">Max LTV</p>
                      <p className="text-base font-semibold text-foreground">
                        {selectedRule.actions.maxLTV}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-base font-semibold text-foreground">
                        {selectedRule.actions.interestRate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audit Trail */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileEdit className="h-4 w-4 text-amber-600" />
                    Audit Trail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedRule.auditTrail.map((entry) => (
                      <div
                        key={entry.id}
                        className="relative pl-8 pb-4 border-l-2 border-border last:border-l-0 last:pb-0"
                      >
                        <div
                          className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-background ${
                            entry.action === 'created'
                              ? 'bg-blue-500'
                              : entry.action === 'updated'
                              ? 'bg-amber-500'
                              : entry.action === 'activated'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`${getActionColor(entry.action)} text-xs capitalize`}
                            >
                              {entry.action}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {entry.changes}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{entry.changedBy}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{entry.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="outline" className="flex-1">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
                <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Rule
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create New Rule Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Rule</DialogTitle>
            <DialogDescription>
              Define eligibility criteria and actions for loan applications
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">Rule Name *</Label>
                    <Input
                      id="rule-name"
                      placeholder="e.g., Premium Customer Rule"
                      value={newRuleName}
                      onChange={(e) => setNewRuleName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                      id="priority"
                      type="number"
                      placeholder="5"
                      value={newRulePriority}
                      onChange={(e) => setNewRulePriority(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of this rule"
                    value={newRuleDescription}
                    onChange={(e) => setNewRuleDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-primary" />
                  Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  {groups.map((group, groupIdx) => (
                    <div key={group.id} className="space-y-2">
                      {group.conditions.map((condition, condIdx) => (
                        <div key={condition.id} className="flex items-center gap-3 py-2">
                          {/* Drag Handle */}
                          <div className="flex flex-col gap-0.5 cursor-move text-muted-foreground/40 hover:text-muted-foreground/60">
                            <div className="w-1 h-1 rounded-full bg-current"></div>
                            <div className="w-1 h-1 rounded-full bg-current"></div>
                            <div className="w-1 h-1 rounded-full bg-current"></div>
                            <div className="w-1 h-1 rounded-full bg-current"></div>
                            <div className="w-1 h-1 rounded-full bg-current"></div>
                            <div className="w-1 h-1 rounded-full bg-current"></div>
                          </div>

                          {/* Logic Toggle */}
                          {condIdx === 0 && groupIdx === 0 ? (
                            <Select
                              value={group.logic}
                              onValueChange={(value: 'AND' | 'OR') => updateGroupLogic(group.id, value)}
                            >
                              <SelectTrigger className="w-20 h-9 rounded-full border-border/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AND">And</SelectItem>
                                <SelectItem value="OR">Or</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="w-20 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">{group.logic}</span>
                            </div>
                          )}

                          {/* Condition Fields */}
                          <div className="flex-1 flex items-center gap-3">
                            <Select
                              value={condition.attribute}
                              onValueChange={(value) => updateCondition(group.id, condition.id, 'attribute', value)}
                            >
                              <SelectTrigger className="h-9 rounded-full border-border/50 min-w-[200px]">
                                <SelectValue placeholder="Select attribute" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit_score">Credit Score</SelectItem>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="tenure">Account Tenure</SelectItem>
                                <SelectItem value="kyc_status">KYC Status</SelectItem>
                                <SelectItem value="age">Age</SelectItem>
                                <SelectItem value="employment">Employment Type</SelectItem>
                              </SelectContent>
                            </Select>

                            <Select
                              value={condition.operator}
                              onValueChange={(value) => updateCondition(group.id, condition.id, 'operator', value)}
                            >
                              <SelectTrigger className="h-9 rounded-full border-border/50 min-w-[180px]">
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="greater_than">Greater Than</SelectItem>
                                <SelectItem value="less_than">Less Than</SelectItem>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="not_equals">Not Equals</SelectItem>
                                <SelectItem value="greater_equal">Greater or Equal</SelectItem>
                                <SelectItem value="less_equal">Less or Equal</SelectItem>
                                <SelectItem value="between">Between</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                              </SelectContent>
                            </Select>

                            <Input
                              className="h-9 rounded-full border-border/50 max-w-[150px]"
                              placeholder="Value"
                              value={condition.value}
                              onChange={(e) => updateCondition(group.id, condition.id, 'value', e.target.value)}
                            />
                          </div>

                          {/* Delete Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeCondition(group.id, condition.id)}
                            className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            disabled={group.conditions.length === 1 && groups.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Add Condition Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addCondition(groups[0].id)}
                    className="text-primary hover:text-primary hover:bg-primary/5 h-9 px-0"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add condition
                  </Button>

                  {/* Add Rule/Group Button */}
                  <div className="pt-2 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addGroup}
                      className="h-9 rounded-full"
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add rule group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Then Assign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Eligibility Status</Label>
                    <Select value={eligibility} onValueChange={setEligibility}>
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
                    <Input
                      type="number"
                      placeholder="2000000"
                      value={maxLoan}
                      onChange={(e) => setMaxLoan(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max LTV (%)</Label>
                    <Input
                      type="number"
                      placeholder="70"
                      value={maxLTV}
                      onChange={(e) => setMaxLTV(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="8.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-primary hover:opacity-90"
                onClick={handleSaveRule}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessRules;
