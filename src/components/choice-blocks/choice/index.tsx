import { memo } from 'react';

import { Box, Paper, Typography, styled } from '@mui/material';

const Image = styled('img')({
  width: 300,
  height: 300,
  objectFit: 'cover',
});

const ImageBox = styled(Box)({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0 0 0 / 0.6)',
    transition: 'opacity ease 0.3s',
  },
  '&:hover::before': {
    opacity: 0.3,
  },
});

const ImageTitle = styled(Typography)({
  position: 'absolute',
  left: '50%',
  top: '35%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontSize: 30,
  fontWeight: 800,
  width: '100%',
  textAlign: 'center',
});

const ImageIconWrapper = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '55%',
  transform: 'translate(-50%, -50%)',
});

type TProps = {
  title: string;
  imgSrc: string;
  renderIcon: (width: number, height: number) => React.ReactNode;
};

function Choice(props: TProps) {
  return (
    <Paper
      sx={{
        width: 300,
        height: 300,
        borderRadius: '6px',
        overflow: 'hidden',
      }}
      elevation={3}
    >
      <ImageBox>
        <ImageTitle>{props.title}</ImageTitle>
        <ImageIconWrapper>{props.renderIcon(50, 50)}</ImageIconWrapper>
        <Image src={props.imgSrc} />
      </ImageBox>
    </Paper>
  );
}

export default memo(Choice);
