import { memo } from 'react';

import { Link } from 'react-router-dom';

import { Box, Grid, Skeleton } from '@mui/material';
import Choice from './choice';

import {
  TChoiceProps,
  TChoiceItem,
} from '@src/containers/choice-blocks-wrapper/types';

type TProps = {
  isDisabled?: boolean;
};

function ChoiceBlocks(props: TChoiceProps & TProps) {
  console.log({ isDisabled: props.isDisabled });

  const helpers = {
    getHref: (item: TChoiceItem) => {
      if (props.isDisabled) return '';
      else return item.href || '';
    },
  };

  return (
    <Box sx={{ mt: 15 }}>
      <Grid justifyContent={'center'} container spacing={3}>
        {props.items.map((item) => (
          <>
            {Boolean(item) ? (
              <Grid key={item.title} item>
                <Box
                  sx={{
                    opacity: props.isDisabled ? 0.5 : 1,
                    pointerEvents: props.isDisabled ? 'none' : 'all',
                  }}
                  component={Link}
                  to={helpers.getHref(item)}
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
              <Grid item>
                <Skeleton
                  animation="wave"
                  width={300}
                  height={300}
                  variant="rounded"
                />
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </Box>
  );
}

export default memo(ChoiceBlocks);
