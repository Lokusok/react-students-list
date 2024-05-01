import { memo } from 'react';

import { Box, Skeleton } from '@mui/material';

function FormSkeleton() {
  return (
    <>
      <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'center' }}>
        <Skeleton sx={{ transform: 'none' }} width={300} height={35}></Skeleton>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton sx={{ transform: 'none' }} width={340} height={270} />
      </Box>
    </>
  );
}

export default memo(FormSkeleton);
