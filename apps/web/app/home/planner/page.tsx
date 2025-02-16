import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { PageHeader } from '@kit/ui/page';
import { PageBody } from '@kit/ui/page';

import { ClientBudgetPlanner } from './_components/ClientBudgetPlanner';
import type { BudgetCategory, BudgetPlan } from './_components/types';

export default async function BudgetPlannerPage() {
  const supabase = getSupabaseServerClient();
  const { data: rawPlans } = await supabase.from('budget_plans').select('*');
  const currentMonth = new Date().toLocaleString('en-US', {
    month: 'long',
  });
  const currentYear = new Date().getFullYear();
  //sort plans by year and month
  const sortedPlans =
    rawPlans?.sort((a, b) => {
      if (a.year === b.year) {
        return a.month.localeCompare(b.month);
      }
      return a.year - b.year;
    }) ?? [];

  const plans = sortedPlans?.map((plan) => ({
    id: plan.id,
    month: plan.month,
    year: plan.year,
    income: plan.income,
    categories: (plan.categories as BudgetCategory[]) ?? [],
  })) as BudgetPlan[] | null;

  const selectedPlan =
    plans?.find(
      (plan) => plan.month === currentMonth && plan.year === currentYear,
    ) ?? null;

  return (
    <>
      <PageHeader title={'Budget Planner'} description={''} />
      <PageBody className={'mb-20 p-2'}>
        <ClientBudgetPlanner
          initialPlans={plans}
          initialSelectedPlan={selectedPlan}
        />
      </PageBody>
    </>
  );
}
