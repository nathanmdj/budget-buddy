import { AccountCard } from './AccountCard';
import type { Account } from './AccountTypes';

const AccountList = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="space-y-4">
      {accounts
        ?.sort((a, b) => b.balance - a.balance)
        .map((account) => <AccountCard key={account.id} account={account} />)}
    </div>
  );
};

export default AccountList;
