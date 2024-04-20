import { memo } from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import DangerousIcon from '@mui/icons-material/Dangerous';

type TProps = {
  isOpen: boolean;
  setIsOpen?: (val: boolean) => void;
  onClose?: () => void;
  buttonText?: string;
  bodyText?: string;
  onUnmount?: () => void;
};

function SuccessSnackbar(props: TProps) {
  return (
    <>
      <Snackbar
        variant="soft"
        color="danger"
        open={props.isOpen}
        onClose={() =>
          props.setIsOpen ? props.setIsOpen(false) : props.onClose?.()
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<DangerousIcon />}
        onUnmount={props.onUnmount}
        endDecorator={
          <Button
            onClick={() =>
              props.setIsOpen ? props.setIsOpen(false) : props.onClose?.()
            }
            size="sm"
            variant="soft"
            color="danger"
          >
            {props.buttonText || 'Понятно'}
          </Button>
        }
      >
        {props.bodyText || 'Произошла ошибка...'}
      </Snackbar>
    </>
  );
}

export default memo(SuccessSnackbar);
