import { memo } from 'react';

import AdaptiveGrid from '@src/components/adaptive-grid';

import { Skeleton } from '@mui/material';

function GridSkeleton() {
  const renders = {
    skeletonItem: () => (
      <Skeleton
        animation="wave"
        sx={{ transform: 'none' }}
        variant="rounded"
        width={290}
        height={270}
      />
    ),
  };

  return (
    <AdaptiveGrid
      renderItem={renders.skeletonItem}
      items={Array(6).fill(null)}
    />
  );
}

export default memo(GridSkeleton);
