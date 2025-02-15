export type Account = {
  id: string;
  account_id: string;
  name: string;
  type:
    | 'bank'
    | 'e-wallet'
    | 'savings'
    | 'investment'
    | 'cash'
    | 'card'
    | 'other';
  balance: number;
  created_at: string | null;
  updated_at: string | null;
};

export const initialAccounts: Account[] = [
  {
    id: '1',
    account_id: 'acc_1',
    name: 'Main Checking',
    type: 'bank',
    balance: 2500,
    created_at: null,
    updated_at: null,
  },
  {
    id: '2',
    account_id: 'acc_2',
    name: 'Savings',
    type: 'savings',
    balance: 10000,
    created_at: null,
    updated_at: null,
  },
  {
    id: '3',
    account_id: 'acc_3',
    name: 'Credit Card',
    type: 'card',
    balance: -500,
    created_at: null,
    updated_at: null,
  },
  {
    id: '4',
    account_id: 'acc_4',
    name: 'Investment Fund',
    type: 'investment',
    balance: 5000,
    created_at: null,
    updated_at: null,
  },
];
