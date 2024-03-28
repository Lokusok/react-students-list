import { observer } from 'mobx-react-lite';

import Total from '@src/components/total';
import studentsStore from '@src/store/students-mobx';

function TotalObserver() {
  return <Total totals={studentsStore.rolesCount} />;
}

export default observer(TotalObserver);
