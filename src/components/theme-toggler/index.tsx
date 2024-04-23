import React, { memo } from 'react';

import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { Tooltip } from '@mui/joy';

type TProps = {
  lightColor?: string;
  darkColor?: string;
};

function ThemeToggler(props: TProps) {
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    // prevent server-side rendering mismatch
    // because `mode` is undefined on the server.
    return null;
  }

  return (
    <Tooltip title="Сменить тему">
      <IconButton
        data-testid="theme-toggler"
        onClick={() => {
          setMaterialMode(mode === 'dark' ? 'light' : 'dark');
          setJoyMode(mode === 'dark' ? 'light' : 'dark');
        }}
      >
        {mode === 'dark' ? (
          <DarkMode
            data-testid="theme-light"
            style={{ color: props.darkColor || 'white' }}
          />
        ) : (
          <LightMode
            data-testid="theme-dark"
            style={{ color: props.lightColor || 'white' }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default memo(ThemeToggler);
