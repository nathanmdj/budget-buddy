'use client';

import { useState } from 'react';

import { createBudgetPlan, updateBudgetPlan } from '../server/server-actions';
import { BudgetChart } from './BudgetChart';
import { BudgetOverview } from './BudgetOverview';
import { BudgetPlanManager } from './BudgetPlanManager';
import { CategoryList } from './CategoryList';
import type { BudgetPlan } from './types';

type Props = {
  initialPlans: BudgetPlan[] | null;
  initialSelectedPlan: BudgetPlan | null;
};

export function ClientBudgetPlanner({
  initialPlans,
  initialSelectedPlan,
}: Props) {
  const [plans, setPlans] = useState<BudgetPlan[]>(initialPlans ?? []);
  const [selectedPlan, setSelectedPlan] = useState<BudgetPlan | null>(
    initialSelectedPlan,
  );

  const handleSelectPlan = (id: string) => {
    const plan = plans.find((p) => p.id === id) ?? null;
    setSelectedPlan(plan);
  };

  const handleCreatePlan = async (newPlan: Omit<BudgetPlan, 'id'>) => {
    const createdPlan = await createBudgetPlan(newPlan);
    setPlans((prev) => [...prev, createdPlan] as BudgetPlan[]);
    setSelectedPlan(createdPlan as BudgetPlan);
  };

  const handleUpdatePlan = async (updatedPlan: BudgetPlan) => {
    await updateBudgetPlan(updatedPlan);
    setPlans(
      plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)),
    );
    setSelectedPlan(updatedPlan);
  };

  return (
    <div className="space-y-8">
      <BudgetPlanManager
        plans={plans}
        selectedPlan={selectedPlan}
        onSelectPlan={handleSelectPlan}
        onCreatePlan={handleCreatePlan}
        onUpdatePlan={handleUpdatePlan}
      />

      {selectedPlan && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BudgetOverview plan={selectedPlan} />
          <BudgetChart
            categories={selectedPlan.categories}
            income={selectedPlan.income}
          />
          <div className="lg:col-span-2">
            <CategoryList categories={selectedPlan.categories} />
          </div>
        </div>
      )}
    </div>
  );
}
