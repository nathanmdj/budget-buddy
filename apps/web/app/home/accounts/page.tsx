'use client';

import { useState } from 'react';

import { AccountCard } from './_components/AccountCard';
import AccountList from './_components/AccountList';
import type { Account } from './_components/AccountTypes';
import { initialAccounts } from './_components/AccountTypes';
import { AddAccountDialog } from './_components/AddAccountDialog';
import { TotalBalance } from './_components/TotalBalance';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  const handleEdit = (id: number, currentBalance: number) => {
    setEditingId(id);
    setEditValue(currentBalance.toString());
  };

  const handleSave = (id: number) => {
    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? { ...account, balance: Number.parseFloat(editValue) || 0 }
          : account,
      ),
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const addNewAccount = (newAccount: Omit<Account, 'id'>) => {
    const id = Math.max(...accounts.map((a) => a.id)) + 1;
    setAccounts([...accounts, { ...newAccount, id }]);
  };

  return (
    <div className="container mx-auto max-w-2xl p-2">
      <h1 className="mb-6 text-2xl font-bold">Your Accounts</h1>

      <TotalBalance balance={totalBalance} />

      <AccountList />

      <AddAccountDialog onAddAccount={addNewAccount} />
    </div>
  );
}
