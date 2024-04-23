import { memo } from 'react';

import { Divider } from '@mui/material';

import HeaderSkeleton from './header-skeleton';
import GridSkeleton from './grid-skeleton';

function FeedSkeleton() {
  return (
    <>
      <HeaderSkeleton />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <GridSkeleton />
    </>
  );
}

export default memo(FeedSkeleton);
