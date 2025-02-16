'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Progress } from '@kit/ui/progress';

import { formatCurrency } from '~/lib/utils';

import type { BudgetCategory } from './types';

export function CategoryList({ categories }: { categories: BudgetCategory[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id}>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-semibold">{category.name}</span>
                <span className="text-sm">
                  {formatCurrency(category.spent)} /{' '}
                  {formatCurrency(category.allocated)}
                </span>
              </div>
              <Progress value={(category.spent / category.allocated) * 100} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
