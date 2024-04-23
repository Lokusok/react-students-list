import { memo } from 'react';

import { Grid, Skeleton } from '@mui/material';

function HeaderSkeleton() {
  return (
    <Grid container rowGap={{ xs: '15px' }} justifyContent={'space-between'}>
      <Grid
        item
        sx={{
          display: { xs: 'flex', lg: 'block' },
          justifyContent: 'center',
        }}
        xs={12}
        md={6}
        lg={'auto'}
      >
        <Skeleton
          animation="wave"
          height={35}
          width={300}
          variant={'rounded'}
        />
      </Grid>

      <Grid
        item
        sx={{
          display: { xs: 'flex', lg: 'block' },
          justifyContent: 'center',
        }}
        xs={12}
        md={6}
        lg={'auto'}
      >
        <Skeleton
          animation="wave"
          height={35}
          width={250}
          variant={'rounded'}
        />
      </Grid>

      <Grid
        item
        sx={{
          display: { xs: 'flex', lg: 'block' },
          justifyContent: 'center',
        }}
        xs={12}
        lg={'auto'}
      >
        <Skeleton
          animation="wave"
          height={35}
          width={300}
          variant={'rounded'}
        />
      </Grid>
    </Grid>
  );
}

export default memo(HeaderSkeleton);
