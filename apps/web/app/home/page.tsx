import { PageBody, PageHeader } from '@kit/ui/page';

import Summary from './_components/summary';
import TransactionList from './_components/transactions';

export default function HomePage() {
  return (
    <>
      <PageHeader title={'Dashboard'} description={''} className={'hidden'} />

      <PageBody className={'mb-20'}>
        <Summary />
        <TransactionList />
      </PageBody>
    </>
  );
}
