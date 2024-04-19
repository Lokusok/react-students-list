import { memo } from 'react';

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Person from '@mui/icons-material/Person';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';

type TProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick?: () => void;
  isLogined?: boolean;
  isDisabled?: boolean;
};

function LoginActions(props: TProps) {
  if (props.isLogined) {
    return (
      <ButtonGroup sx={{ justifyContent: 'center' }} variant="soft">
        <Tooltip arrow title="Выйти из аккаунта?">
          <Button onClick={props.onLogoutClick} startDecorator={<LogoutIcon />}>
            Выйти из аккаунта
          </Button>
        </Tooltip>
      </ButtonGroup>
    );
  }

  return (
    <>
      <ButtonGroup sx={{ justifyContent: 'center' }} variant="soft">
        <Tooltip arrow title="Войти в аккаунт">
          <Button
            disabled={props.isDisabled}
            onClick={props.onLoginClick}
            startDecorator={<LockOpenIcon />}
          >
            Вход
          </Button>
        </Tooltip>

        <IconButton disabled>
          <ControlCameraIcon />
        </IconButton>

        <Tooltip arrow title="Зарегистрировать аккаунт">
          <Button
            disabled={props.isDisabled}
            onClick={props.onRegisterClick}
            endDecorator={<Person />}
          >
            Регистрация
          </Button>
        </Tooltip>
      </ButtonGroup>
    </>
  );
}

export default memo(LoginActions);
