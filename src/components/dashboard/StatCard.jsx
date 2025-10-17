import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = "default",
  trend 
}) {
  const variantStyles = {
    default: "border-border bg-card",
    success: "border-success/20 bg-success-light/50",
    warning: "border-warning/20 bg-warning-light/50", 
    destructive: "border-destructive/20 bg-destructive/5"
  };

  return (
    <Card className={cn("shadow-card hover:shadow-lg transition-all duration-300", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-foreground">{value}</h3>
              {trend && (
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-lg",
            variant === "success" && "bg-success text-success-foreground",
            variant === "warning" && "bg-warning text-warning-foreground",
            variant === "destructive" && "bg-destructive text-destructive-foreground",
            variant === "default" && "bg-primary text-primary-foreground"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
