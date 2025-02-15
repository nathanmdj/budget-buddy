'use server';

import type { BudgetPlan } from '../_components/types';

// TODO: Replace with actual database operations
const initialPlans: BudgetPlan[] = [
  {
    id: 1,
    month: 'January',
    year: 2025,
    income: 5000,
    categories: [
      { id: 1, name: 'Housing', allocated: 1000, spent: 950 },
      { id: 2, name: 'Food', allocated: 500, spent: 400 },
      { id: 3, name: 'Transportation', allocated: 200, spent: 150 },
      { id: 4, name: 'Utilities', allocated: 300, spent: 280 },
      { id: 5, name: 'Entertainment', allocated: 200, spent: 180 },
    ],
  },
];

export async function getBudgetPlans() {
  // TODO: Implement database fetch
  return initialPlans;
}

export async function createBudgetPlan(plan: Omit<BudgetPlan, 'id'>) {
  // TODO: Implement database creation
  const id = Math.max(...initialPlans.map((p) => p.id), 0) + 1;
  const newPlan = { ...plan, id };
  initialPlans.push(newPlan);
  return newPlan;
}

export async function updateBudgetPlan(plan: BudgetPlan) {
  // TODO: Implement database update
  const index = initialPlans.findIndex((p) => p.id === plan.id);
  if (index !== -1) {
    initialPlans[index] = plan;
    return plan;
  }
  throw new Error('Plan not found');
}

export async function deleteBudgetPlan(id: number) {
  // TODO: Implement database deletion
  const index = initialPlans.findIndex((p) => p.id === id);
  if (index !== -1) {
    initialPlans.splice(index, 1);
    return true;
  }
  return false;
}
