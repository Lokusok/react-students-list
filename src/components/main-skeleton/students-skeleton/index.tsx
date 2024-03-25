import { memo } from 'react';

import AdaptiveGrid from '@src/components/adaptive-grid';

import { Skeleton } from '@mui/material';

function StudentsSkeleton() {
  const renders = {
    skeletonItem: () => (
      <Skeleton variant="rounded" width={'80%'} height={230} />
    ),
  };

  return (
    <AdaptiveGrid
      renderItem={renders.skeletonItem}
      items={Array(6).fill(null)}
    />
  );
}

export default memo(StudentsSkeleton);
