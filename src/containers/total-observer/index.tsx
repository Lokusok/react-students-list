import { memo } from 'react';

import { useRecoilValue } from 'recoil';

import { rolesCountSelector } from '@src/store/students/selectors';
import Total from '@src/components/total';

function TotalObserver() {
  const totals = useRecoilValue(rolesCountSelector);

  return <Total totals={totals} />;
}

export default memo(TotalObserver);
