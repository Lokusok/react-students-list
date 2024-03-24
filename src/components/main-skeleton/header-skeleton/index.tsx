import { memo } from 'react';

import { Skeleton, Stack } from '@mui/material';

function HeaderSkeleton() {
  return (
    <Stack flexWrap={'wrap'} justifyContent={['space-between']} direction="row">
      <Skeleton height={35} width={250} variant={'rounded'} />
      <Skeleton height={35} width={250} variant={'rounded'} />
    </Stack>
  );
}

export default memo(HeaderSkeleton);
