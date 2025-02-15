import { Check, Pencil, X } from 'lucide-react';

import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';

import { formatCurrency } from '~/lib/utils';

import { AccountIcon } from './AccountIcon';
import type { Account } from './AccountTypes';

interface AccountCardProps {
  account: Account;
  isEditing: boolean;
  editValue: string;
  onEdit: (id: number, balance: number) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
  onEditValueChange: (value: string) => void;
}

export function AccountCard({
  account,
  isEditing,
  editValue,
  onEdit,
  onSave,
  onCancel,
  onEditValueChange,
}: AccountCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4 pe-2 ps-4">
        <div className="flex items-center space-x-4">
          <AccountIcon type={account.type} />
          <div>
            <h2 className="font-semibold">{account.name}</h2>
            <p className="text-sm text-gray-500">{account.type}</p>
          </div>
        </div>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={editValue}
              onChange={(e) => onEditValueChange(e.target.value)}
              className="w-24"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onSave(account.id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span
              className={`font-semibold ${account.balance < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {formatCurrency(account.balance)}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(account.id, account.balance)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
