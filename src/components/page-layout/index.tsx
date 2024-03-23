import React, { memo } from 'react';

import { Box, Container } from '@mui/material';

type TProps = {
  head?: React.ReactNode;
  children: React.ReactNode;
};

function PageLayout(props: TProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <Box sx={{ p: 3 }}>{props.head}</Box>
        <Box sx={{ mt: 3 }}>{props.children}</Box>
      </Container>
    </Box>
  );
}

export default memo(PageLayout);
