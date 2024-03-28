import { memo } from 'react';

import { Link } from 'react-router-dom';

import { Box, Grid, Skeleton } from '@mui/material';
import Choice from './choice';

type TItem = {
  title: string;
  imgSrc: string;
  renderIcon: (width: number, height: number) => React.ReactNode;
  href?: string;
};

type TProps = {
  items: Array<TItem>;
};

function ChoiceBlocks(props: TProps) {
  return (
    <Box sx={{ mt: 15 }}>
      <Grid justifyContent={'center'} container spacing={3}>
        {props.items.map((item) => (
          <>
            {Boolean(item) ? (
              <Grid key={item.title} item>
                <Box
                  component={Link}
                  to={item.href || ''}
                  state={{ from: window.location.pathname }}
                >
                  <Choice
                    title={item.title}
                    imgSrc={item.imgSrc}
                    renderIcon={item.renderIcon}
                  />
                </Box>
              </Grid>
            ) : (
              <Skeleton
                animation="wave"
                width={300}
                height={300}
                variant="rounded"
              />
            )}
          </>
        ))}
      </Grid>
    </Box>
  );
}

export default memo(ChoiceBlocks);
