import {
  BanknoteIcon,
  CreditCard,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react';

import type { Account } from './AccountTypes';

interface AccountIconProps {
  type: Account['type'];
}

export function AccountIcon({ type }: AccountIconProps) {
  switch (type) {
    case 'checking':
    case 'cash':
      return <Wallet className="h-5 w-5 text-green-500" />;
    case 'card':
      return <CreditCard className="h-5 w-5 text-red-500" />;
    case 'savings':
      return <PiggyBank className="h-5 w-5 text-blue-500" />;
    case 'investment':
      return <Landmark className="h-5 w-5 text-purple-500" />;
    default:
      return <BanknoteIcon className="h-5 w-5 text-gray-500" />;
  }
}
