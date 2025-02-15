import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Card, CardContent } from '@kit/ui/card';
import { Progress } from '@kit/ui/progress';

import { formatCurrency } from '~/lib/utils';

import TotalBalance from './total-balance';

export default async function Summary() {
  // These would typica lly come from your state management or API
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from('fund_accounts').select('*');

  if (error) {
    throw error;
  }

  const totalBalance = data.reduce((acc, account) => acc + account.balance, 0);

  const monthlyBudget = 2000;
  const spent = 1500;
  const remaining = monthlyBudget - spent;
  const percentSpent = (spent / monthlyBudget) * 100;
  const lastMonthSpent = 1800;

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
          <h2 className="mb-2 text-xl font-semibold">Monthly Budget</h2>
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
                {formatCurrency(monthlyBudget)}
              </p>
            </div>
          </div>
          <Progress value={percentSpent} className="mb-2 h-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Spent: {formatCurrency(spent)}</span>
            <span>{percentSpent.toFixed(0)}%</span>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-gray-600">Last month: </span>
            <span
              className={
                spent < lastMonthSpent ? 'text-green-600' : 'text-red-600'
              }
            >
              {formatCurrency(lastMonthSpent)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
