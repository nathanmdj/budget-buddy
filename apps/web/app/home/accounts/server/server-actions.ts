'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { Account } from '../_components/AccountTypes';

const createAccount = enhanceAction(
  async (account: Account) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('fund_accounts').insert(account);

    if (error) throw error;

    revalidateAccountsPage();

    return { success: true };
  },
  {
    auth: true,
  },
);

const updateAccount = enhanceAction(
  async (account: Account) => {
    const client = getSupabaseServerClient();

    const { error } = await client
      .from('fund_accounts')
      .update(account)
      .eq('id', account.id);

    if (error) throw error;

    revalidateAccountsPage();

    return { success: true };
  },
  {
    auth: true,
  },
);

const deleteAccount = enhanceAction(
  async (id: string) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('fund_accounts').delete().eq('id', id);

    if (error) throw error;

    revalidateAccountsPage();

    return { success: true };
  },
  { auth: true },
);

export { createAccount, updateAccount, deleteAccount };

function revalidateAccountsPage() {
  revalidatePath('/home/accounts', 'page');
}
