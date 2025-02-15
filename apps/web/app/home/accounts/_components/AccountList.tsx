import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';

import { AccountCard } from './AccountCard';
import type { Account } from './AccountTypes';

const AccountList = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const client = useSupabase();
  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const { data, error } = await client.from('fund_accounts').select('*');
      if (error) throw error;
      return data as Account[];
    },
  });

  const handleEdit = (id: number, currentBalance: number) => {
    setEditingId(id);
    setEditValue(currentBalance.toString());
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {accounts?.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          isEditing={false}
          editValue={''}
          onEdit={() => {}}
          onSave={() => {}}
          onCancel={() => {}}
          onEditValueChange={() => {}}
        />
      ))}
    </div>
  );
};

export default AccountList;
