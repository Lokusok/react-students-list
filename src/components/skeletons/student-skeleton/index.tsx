import { memo } from 'react';

import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import { Skeleton } from '@mui/material';

function StudentSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" height={25} width={420} />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Grid
        container
        rowGap={'20px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'flex', md: 'block' } }}
          justifyContent={'center'}
        >
          <Stack direction={'column'} rowGap={'10px'}>
            <Skeleton variant="rounded" height={15} width={200} />
            <Skeleton variant="rounded" height={15} width={150} />
            <Skeleton variant="rounded" height={15} width={170} />
            <Skeleton variant="rounded" height={15} width={220} />
          </Stack>
        </Grid>

        <Skeleton sx={{ transform: 'none' }} width={'300px'} height={'300px'} />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Stack direction="row" columnGap={'17px'}>
        <Skeleton variant="rounded" height={33} width={175} />
        <Skeleton variant="rounded" height={33} width={115} />
      </Stack>
    </>
  );
}

export default memo(StudentSkeleton);
