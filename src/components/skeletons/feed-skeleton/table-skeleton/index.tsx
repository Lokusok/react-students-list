import { memo } from 'react';

import Skeleton from '@mui/material/Skeleton';

function TableSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" height={400} />
    </>
  );
}

export default memo(TableSkeleton);
