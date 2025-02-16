'use client';

import { useMemo } from 'react';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

import type { BudgetCategory } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  '#FF6384', // Bright Pink
  '#36A2EB', // Blue
  '#FFCE56', // Yellow
  '#4BC0C0', // Teal
  '#9966FF', // Purple
  '#FF9F40', // Orange
  '#33CC99', // Green
  '#FF6666', // Coral
  '#6699FF', // Light Blue
  '#CC99FF', // Lavender
  '#FFCC99', // Peach
  '#66CCCC', // Aqua
  '#FF99CC', // Pink
  '#99CC33', // Lime Green
  '#CC66FF', // Violet
  '#FFCC66', // Gold
  '#66CC99', // Mint
  '#CC9966', // Tan
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
      {
        id: categories.length + 1,
        name: 'Unallocated',
        allocated: unallocatedAmount,
        spent: 0,
      },
      ...categories,
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
