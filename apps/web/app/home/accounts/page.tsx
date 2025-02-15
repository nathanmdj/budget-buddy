import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { PageBody, PageHeader } from '@kit/ui/page';

import AccountList from './_components/AccountList';
import { AddAccountDialog } from './_components/AddAccountDialog';
import { TotalBalance } from './_components/TotalBalance';

export default async function AccountsPage() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from('fund_accounts').select('*');

  if (error) {
    throw error;
  }

  const totalBalance = data.reduce((acc, account) => acc + account.balance, 0);

  return (
    <>
      <PageHeader title={'Your Accounts'} description={''} />
      <PageBody className={'p-2'}>
        <TotalBalance balance={totalBalance} />

        <AccountList accounts={data} />
        <AddAccountDialog />
      </PageBody>
    </>
  );
}
