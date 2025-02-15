import { getSupabaseServerClient } from '@kit/supabase/server-client';

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
    <div className="container mx-auto max-w-2xl p-2">
      <h1 className="mb-6 text-2xl font-bold">Your Accounts</h1>

      <TotalBalance balance={totalBalance} />

      <AccountList accounts={data} />
      <AddAccountDialog />
    </div>
  );
}
