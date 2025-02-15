'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Progress } from '@kit/ui/progress';

import type { BudgetPlan } from './types';
import { formatCurrency } from './types';

export function BudgetOverview({ plan }: { plan: BudgetPlan }) {
  const totalBudget = plan.categories.reduce(
    (sum, category) => sum + category.allocated,
    0,
  );
  const totalSpent = plan.categories.reduce(
    (sum, category) => sum + category.spent,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Income:</span>
            <span className="font-semibold">{formatCurrency(plan.income)}</span>
          </div>
          <div className="flex justify-between">
            <span>Budgeted:</span>
            <span className="font-semibold">{formatCurrency(totalBudget)}</span>
          </div>
          <div className="flex justify-between">
            <span>Spent:</span>
            <span className="font-semibold">{formatCurrency(totalSpent)}</span>
          </div>
        </div>
        <Progress value={(totalSpent / plan.income) * 100} className="mt-4" />
      </CardContent>
    </Card>
  );
}
