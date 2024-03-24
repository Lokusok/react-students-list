import { memo } from 'react';
import HeaderSkeleton from './header-skeleton';
import StudentsSkeleton from './students-skeleton';
import { Divider } from '@mui/material';

function MainSkeleton() {
  return (
    <>
      <HeaderSkeleton />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <StudentsSkeleton />
    </>
  );
}

export default memo(MainSkeleton);
