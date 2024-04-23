import { Link, useLocation } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { Box, Button, IconButton } from '@mui/material';

import ThemeToggler from '@src/components/theme-toggler';
import { navigation } from '@src/shared/data/navigation';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useStores } from '@src/hooks/use-stores';
import { Tooltip } from '@mui/joy';

type TProps = {
  isProfileVisible?: boolean;
};

function NavigationDesktop(props: TProps) {
  const { isProfileVisible } = props;

  const { sessionStore } = useStores();

  const location = useLocation();

  const options = {
    isDisabled: !sessionStore.profile,
  };

  const additionalStyles = {
    link: options.isDisabled
      ? {
          opacity: options.isDisabled ? 0.3 : 1,
          pointerEvents: options.isDisabled ? 'none' : 'all',
        }
      : {},
  };

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navigation.map((item) => (
        <Button
          component={Link}
          to={options.isDisabled ? '' : item.path}
          key={item.name}
          sx={{
            color: '#fff',
            opacity: location.pathname === item.path ? 0.65 : 1,
            ...additionalStyles.link,
          }}
          state={{ from: window.location.pathname }}
        >
          {item.name}
        </Button>
      ))}

      {isProfileVisible && (
        <Box
          component={Link}
          sx={{
            pointerEvents: location.pathname === '/profile' ? 'none' : 'all',
            opacity: location.pathname === '/profile' ? 0.5 : 1,
          }}
          to="/profile"
        >
          <Tooltip title="Профиль">
            <IconButton disabled={location.pathname === '/profile'}>
              <AccountCircleIcon style={{ color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <ThemeToggler />
    </Box>
  );
}

export default observer(NavigationDesktop);
