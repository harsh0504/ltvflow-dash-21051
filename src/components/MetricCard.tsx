import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, LucideProps } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon | ((props: LucideProps) => JSX.Element);
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) {
  return (
    <Card animate className="shadow-soft hover:shadow-medium transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-muted-foreground leading-[135%]">
          {title}
        </CardTitle>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground leading-[120%] tracking-[-0.02em]">{value}</div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 leading-[150%]">{subtitle}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            <span
              className={`text-base font-medium leading-[150%] ${
                trend.isPositive ? "text-success" : "text-destructive"
              }`}
            >
              {trend.isPositive ? "+" : ""}{trend.value}
            </span>
            <span className="text-sm text-muted-foreground leading-[150%]">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
