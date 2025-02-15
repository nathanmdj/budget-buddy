import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { Account } from '../_components/AccountTypes';

const createAccount = enhanceAction(
  async (account: Account) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('fund_accounts').insert(account);

    if (error) throw error;

    return { success: true };
  },
  {
    auth: true,
  },
);

export { createAccount };
