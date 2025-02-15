import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

import { formatCurrency } from '~/lib/utils';

interface TotalBalanceProps {
  balance: number;
}

export function TotalBalance({ balance }: TotalBalanceProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Total Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(balance)}
        </p>
      </CardContent>
    </Card>
  );
}
