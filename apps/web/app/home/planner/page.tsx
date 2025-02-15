import { PageHeader } from '@kit/ui/page';
import { PageBody } from '@kit/ui/page';

import { ClientBudgetPlanner } from './_components/ClientBudgetPlanner';
import { getBudgetPlans } from './server/actions';

export default async function BudgetPlannerPage() {
  const plans = await getBudgetPlans();
  const initialPlan = plans[0] ?? null;

  return (
    <>
      <PageHeader title={'Budget Planner'} description={''} />
      <PageBody className={'mb-20 p-2'}>
        <ClientBudgetPlanner
          initialPlans={plans}
          initialSelectedPlan={initialPlan}
        />
      </PageBody>
    </>
  );
}
