'use client';

import { startTransition } from 'react';

import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

import { deleteAccount, updateAccount } from '../server/server-actions';
import { Account } from './AccountTypes';

export function UpdateAccountDialog({
  account,
  isOpen,
  setIsOpen,
}: {
  account: Account;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
        </DialogHeader>
        <CreateFundAccountForm
          account={account}
          onSubmit={(data) => {
            startTransition(() => {
              const promise = updateAccount(data);

              toast.promise(() => promise, {
                loading: 'Updating account...',
                success: 'Account updated successfully',
                error: 'Failed to update account',
              });

              setIsOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function CreateFundAccountForm({
  onSubmit,
  account,
}: {
  onSubmit: (data: Account) => void;
  account: Account;
}) {
  const form = useForm<Account>({
    defaultValues: {
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="e-wallet">E-Wallet</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" className="w-[80%]">
            Update
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-[20%]"
            onClick={() => {
              startTransition(() => {
                const promise = deleteAccount(account.id);

                toast.promise(() => promise, {
                  loading: 'Deleting account...',
                  success: 'Account deleted successfully',
                  error: 'Failed to delete account',
                });
              });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
