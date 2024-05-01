import { memo } from 'react';

import { Box, Skeleton } from '@mui/material';

function AllowSkeleton() {
  return (
    <>
      <Box sx={{ mb: 1.5 }}>
        <Skeleton sx={{ transform: 'none', maxWidth: '620px' }} height={40} />
      </Box>

      <Box>
        <Skeleton sx={{ transform: 'none', maxWidth: '420px' }} height={30} />
      </Box>
    </>
  );
}

export default memo(AllowSkeleton);
