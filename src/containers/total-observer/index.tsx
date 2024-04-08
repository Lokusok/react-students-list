import { observer } from 'mobx-react-lite';

import Total from '@src/components/total';

import { useStores } from '@src/store';

function TotalObserver() {
  const { studentsStore } = useStores();

  return <Total totals={studentsStore.rolesCount} />;
}

export default observer(TotalObserver);
