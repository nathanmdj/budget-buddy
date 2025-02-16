'use client';

import { useMemo } from 'react';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

import type { BudgetCategory } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
];

export function BudgetChart({
  categories,
  income,
}: {
  categories: BudgetCategory[];
  income: number;
}) {
  const totalBudget = categories.reduce(
    (sum, category) => sum + category.allocated,
    0,
  );

  const categoriesWithUnallocated = useMemo(() => {
    const unallocatedAmount = income - totalBudget;
    if (unallocatedAmount <= 0) return categories;

    return [
      ...categories,
      {
        id: categories.length + 1,
        name: 'Unallocated',
        allocated: unallocatedAmount,
        spent: 0,
      },
    ];
  }, [categories, income, totalBudget]);

  const chartData = useMemo(() => {
    return {
      labels: categoriesWithUnallocated.map((category) => category.name),
      datasets: [
        {
          data: categoriesWithUnallocated.map((category) => category.allocated),
          backgroundColor: CHART_COLORS,
        },
      ],
    };
  }, [categoriesWithUnallocated]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-[calc(100%-1rem)]">
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
}
