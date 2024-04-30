import React from 'react';

import { Typography, TypographyProps } from '@mui/joy';

type TProps = {
  children: React.ReactNode;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: number;
  fontWeight?: number;
} & TypographyProps;

function Title(props: TProps) {
  const {
    children,
    component = 'h1',
    fontSize = 26,
    fontWeight = 700,
    ...anotherProps
  } = props;

  return (
    <Typography
      {...anotherProps}
      component={component}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </Typography>
  );
}

export default Title;
