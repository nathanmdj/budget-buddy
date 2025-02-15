'use client';

import { useState } from 'react';

import { Card, CardContent } from '@kit/ui/card';

import { formatCurrency } from '~/lib/utils';

import { AccountIcon } from './AccountIcon';
import type { Account } from './AccountTypes';
import { UpdateAccountDialog } from './UpdateAccountDialog';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UpdateAccountDialog
        account={account}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Card onClick={() => setIsOpen(true)}>
        <CardContent className="flex items-center justify-between py-4 pe-2 ps-4">
          <div className="flex items-center space-x-4">
            <AccountIcon type={account.type} />
            <div>
              <h2 className="font-semibold">{account.name}</h2>
              <p className="text-sm text-gray-500">{account.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`font-semibold ${account.balance < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {formatCurrency(account.balance)}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
