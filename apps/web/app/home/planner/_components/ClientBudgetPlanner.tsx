'use client';

import { useState } from 'react';

import {
  createBudgetPlan,
  deleteBudgetPlan,
  updateBudgetPlan,
} from '../server/actions';
import { BudgetChart } from './BudgetChart';
import { BudgetOverview } from './BudgetOverview';
import { BudgetPlanManager } from './BudgetPlanManager';
import { CategoryList } from './CategoryList';
import type { BudgetPlan } from './types';

type Props = {
  initialPlans: BudgetPlan[];
  initialSelectedPlan: BudgetPlan | null;
};

export function ClientBudgetPlanner({
  initialPlans,
  initialSelectedPlan,
}: Props) {
  const [plans, setPlans] = useState<BudgetPlan[]>(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState<BudgetPlan | null>(
    initialSelectedPlan,
  );

  const handleSelectPlan = (id: number) => {
    const plan = plans.find((p) => p.id === id) ?? null;
    setSelectedPlan(plan);
  };

  const handleCreatePlan = async (newPlan: Omit<BudgetPlan, 'id'>) => {
    const createdPlan = await createBudgetPlan(newPlan);
    setPlans([...plans, createdPlan]);
    setSelectedPlan(createdPlan);
  };

  const handleUpdatePlan = async (updatedPlan: BudgetPlan) => {
    await updateBudgetPlan(updatedPlan);
    setPlans(
      plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)),
    );
    setSelectedPlan(updatedPlan);
  };

  const handleDeletePlan = async (id: number) => {
    await deleteBudgetPlan(id);
    setPlans(plans.filter((plan) => plan.id !== id));
    if (selectedPlan?.id === id) {
      setSelectedPlan(plans[0] ?? null);
    }
  };

  return (
    <div className="space-y-8">
      <BudgetPlanManager
        plans={plans}
        selectedPlan={selectedPlan}
        onSelectPlan={handleSelectPlan}
        onCreatePlan={handleCreatePlan}
        onUpdatePlan={handleUpdatePlan}
        onDeletePlan={handleDeletePlan}
      />

      {selectedPlan && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BudgetOverview plan={selectedPlan} />
          <BudgetChart categories={selectedPlan.categories} />
          <div className="lg:col-span-2">
            <CategoryList categories={selectedPlan.categories} />
          </div>
        </div>
      )}
    </div>
  );
}
