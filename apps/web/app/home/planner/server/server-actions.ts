'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import type { BudgetCategory, BudgetPlan } from '../_components/types';

const createBudgetPlan = enhanceAction(
  async (plan: Omit<BudgetPlan, 'id'>) => {
    const client = getSupabaseServerClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await client
      .from('budget_plans')
      .insert({
        ...plan,
        account_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create budget plan');

    return {
      id: data.id,
      month: data.month,
      year: data.year,
      income: data.income,
      categories: (data.categories as BudgetCategory[]) ?? [],
    } satisfies BudgetPlan;
  },
  { auth: true },
);

const updateBudgetPlan = enhanceAction(
  async (plan: BudgetPlan) => {
    const client = getSupabaseServerClient();
    const { error } = await client
      .from('budget_plans')
      .update(plan)
      .eq('id', plan.id);

    if (error) throw error;

    revalidateBudgetPlanPage();

    return { success: true };
  },
  { auth: true },
);

export { createBudgetPlan, updateBudgetPlan };

function revalidateBudgetPlanPage() {
  revalidatePath('/home/planner', 'page');
}
