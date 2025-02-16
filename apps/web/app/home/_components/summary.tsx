import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Card, CardContent } from '@kit/ui/card';
import { Progress } from '@kit/ui/progress';

import { formatCurrency } from '~/lib/utils';

import TotalBalance from './total-balance';

export default async function Summary() {
  // These would typica lly come from your state management or API
  const supabase = getSupabaseServerClient();
  const currentMonth = new Date().toLocaleString('en-US', {
    month: 'long',
  });
  const currentYear = new Date().getFullYear();
  const { data, error } = await supabase.from('fund_accounts').select('*');
  const { data: budgetPlans } = await supabase.from('budget_plans').select('*');

  if (error) {
    throw error;
  }
  const filteredBudgetPlans = Array.isArray(budgetPlans)
    ? budgetPlans.filter(
        (plan) => plan.month === currentMonth && plan.year === currentYear,
      ).length > 0
      ? budgetPlans.filter(
          (plan) => plan.month === currentMonth && plan.year === currentYear,
        )
      : budgetPlans.slice(0, 1)
    : [];
  const totalBalance = data.reduce((acc, account) => acc + account.balance, 0);

  const budgeted = filteredBudgetPlans.reduce((acc, plan) => {
    const categories = (plan.categories as { allocated: number }[]) ?? [];
    return (
      acc + categories.reduce((sum, category) => sum + category.allocated, 0)
    );
  }, 0);

  const spent = filteredBudgetPlans.reduce((acc, plan) => {
    const categories = (plan.categories as { spent: number }[]) ?? [];
    return acc + categories.reduce((sum, category) => sum + category.spent, 0);
  }, 0);

  const remaining = budgeted - spent;
  const percentSpent = (spent / (budgeted || 1)) * 100;

  const getStatusColor = (percentSpent: number) => {
    if (percentSpent < 75) return 'text-green-600';
    if (percentSpent < 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 p-2">
      <TotalBalance totalBalance={totalBalance} />
      <Card className="bg-white">
        <CardContent className="pt-6">
          <h2 className="mb-2 text-xl font-semibold">
            {filteredBudgetPlans[0]?.month} Budget
          </h2>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p
                className={`text-2xl font-bold ${getStatusColor(percentSpent)}`}
              >
                {formatCurrency(remaining)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-xl font-semibold">
                {formatCurrency(budgeted)}
              </p>
            </div>
          </div>
          <Progress value={percentSpent} className="mb-2 h-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Spent: {formatCurrency(spent)}</span>
            <span>{percentSpent.toFixed(0)}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
