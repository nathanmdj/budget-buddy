import { useState } from 'react';
import type { FormEvent } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';

import type { Account } from './AccountTypes';

interface AddAccountDialogProps {
  onAddAccount: (account: Omit<Account, 'id'>) => void;
}

export function AddAccountDialog({ onAddAccount }: AddAccountDialogProps) {
  const [newAccount, setNewAccount] = useState<Omit<Account, 'id'>>({
    name: '',
    type: 'cash',
    balance: 0,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddAccount(newAccount);
    setNewAccount({ name: '', type: 'cash', balance: 0 });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add New Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Account Name
            </label>
            <Input
              id="name"
              value={newAccount.name}
              onChange={(e) =>
                setNewAccount({ ...newAccount, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Account Type
            </label>
            <select
              id="type"
              value={newAccount.type}
              onChange={(e) =>
                setNewAccount({
                  ...newAccount,
                  type: e.target.value as Account['type'],
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="savings">Savings</option>
              <option value="investment">Investment</option>
              <option value="checking">Checking</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="balance"
              className="block text-sm font-medium text-gray-700"
            >
              Initial Balance
            </label>
            <Input
              id="balance"
              type="number"
              value={newAccount.balance}
              onChange={(e) =>
                setNewAccount({
                  ...newAccount,
                  balance: Number.parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
