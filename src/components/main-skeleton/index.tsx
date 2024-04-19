import { memo } from 'react';

import ChoiceBlocks from '../choice-blocks';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function MainSkeleton() {
  const choices = Array(2).fill(null);

  return (
    <>
      <ChoiceBlocks items={choices} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Skeleton variant="rounded" width={280} height={36} />
      </Box>
    </>
  );
}

export default memo(MainSkeleton);
