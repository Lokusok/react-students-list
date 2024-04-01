import { memo } from 'react';

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Person from '@mui/icons-material/Person';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

type TProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

function LoginActions(props: TProps) {
  return (
    <ButtonGroup sx={{ justifyContent: 'center' }} variant="soft">
      <Tooltip arrow title="Войти в аккаунт">
        <Button onClick={props.onLoginClick} startDecorator={<Person />}>
          Вход
        </Button>
      </Tooltip>

      <IconButton disabled>
        <ControlCameraIcon />
      </IconButton>

      <Tooltip arrow title="Зарегистрировать аккаунт">
        <Button onClick={props.onRegisterClick} endDecorator={<Person />}>
          Регистрация
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

export default memo(LoginActions);
