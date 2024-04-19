import { memo } from 'react';

import { Skeleton, Stack } from '@mui/material';

function HeaderSkeleton() {
  return (
    <Stack
      flexWrap={'wrap'}
      justifyContent={{ xs: 'center', md: 'space-between' }}
      direction="row"
    >
      <Skeleton animation="wave" height={35} width={250} variant={'rounded'} />
      <Skeleton animation="wave" height={35} width={250} variant={'rounded'} />
    </Stack>
  );
}

export default memo(HeaderSkeleton);
