import { Skeleton } from '@mui/material';

import Panel from '@src/components/panel';

function PanelSkeleton() {
  return (
    <Panel
      renderLeft={() => (
        <Skeleton animation="wave" variant={'rounded'} height={245} />
      )}
      renderRight={() => (
        <Skeleton animation="wave" variant={'rounded'} height={500} />
      )}
    />
  );
}

export default PanelSkeleton;
