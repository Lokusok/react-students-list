import { Skeleton } from '@mui/material';

import Panel from '@src/components/panel';

function PanelSkeleton() {
  return (
    <Panel
      renderLeft={() => <Skeleton variant={'rounded'} height={200} />}
      renderRight={() => <Skeleton variant={'rounded'} height={500} />}
    />
  );
}

export default PanelSkeleton;
