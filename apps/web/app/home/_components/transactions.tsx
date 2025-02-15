import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

const transactions = [
  { id: 1, type: 'expense', description: 'Groceries', amount: 75.5 },
  { id: 2, type: 'income', description: 'Salary', amount: 2000.0 },
  { id: 3, type: 'expense', description: 'Dinner', amount: 45.0 },
  { id: 4, type: 'income', description: 'Freelance work', amount: 500.0 },
  { id: 5, type: 'expense', description: 'Gas', amount: 30.0 },
];

const TransactionItem = ({
  transaction,
}: {
  transaction: (typeof transactions)[0];
}) => (
  <li className="flex items-center justify-between py-2">
    <div className="flex items-center">
      {transaction.type === 'expense' ? (
        <ArrowDownCircle className="mr-2 h-5 w-5 text-red-500" />
      ) : (
        <ArrowUpCircle className="mr-2 h-5 w-5 text-green-500" />
      )}
      <span>{transaction.description}</span>
    </div>
    <span
      className={
        transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
      }
    >
      ${transaction.amount.toFixed(2)}
    </span>
  </li>
);

export default function TransactionList() {
  const incomeTransactions = transactions.filter((t) => t.type === 'income');
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Last Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ul className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="income">
              <ul className="divide-y divide-gray-200">
                {incomeTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="expenses">
              <ul className="divide-y divide-gray-200">
                {expenseTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
