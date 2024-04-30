import { memo } from 'react';

import { Skeleton, Grid, Box, Divider } from '@mui/material';

type TProps = {
  gridSkeleton: () => React.ReactNode;
};

function ProfileSkeleton(props: TProps) {
  const { gridSkeleton } = props;

  return (
    <>
      <Box>
        <Skeleton variant="rounded" height={30} width={300} />
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Grid container rowGap="25px" columnGap="20px">
        <Grid item xs={12} lg={3.5}>
          <Skeleton
            sx={{ transform: 'none', maxWidth: '330px' }}
            height={330}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Skeleton sx={{ transform: 'none' }} height={330} />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Skeleton variant="rounded" height={30} width={300} />
      </Box>

      {gridSkeleton?.()}
    </>
  );
}

export default memo(ProfileSkeleton);
