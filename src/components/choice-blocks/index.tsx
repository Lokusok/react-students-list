import { memo } from 'react';

import { Link } from 'react-router-dom';

import { Box, Grid } from '@mui/material';
import Choice from './choice';

import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Groups2Icon from '@mui/icons-material/Groups2';

import feedImg from '@src/assets/feed.jpg';
import panelImg from '@src/assets/panel.jpg';

function ChoiceBlocks() {
  return (
    <Box sx={{ mt: 15 }}>
      <Grid justifyContent={'center'} container spacing={3}>
        <Grid item>
          <Box
            component={Link}
            to="/feed"
            state={{ from: window.location.pathname }}
          >
            <Choice
              title={'Лента студентов'}
              imgSrc={feedImg}
              renderIcon={(width, height) => (
                <DynamicFeedIcon sx={{ width, height }} />
              )}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box
            component={Link}
            to="/panel"
            state={{ from: window.location.pathname }}
          >
            <Choice
              title={'Управление'}
              imgSrc={panelImg}
              renderIcon={(width, height) => (
                <Groups2Icon sx={{ width, height }} />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(ChoiceBlocks);
