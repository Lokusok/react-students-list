import { memo } from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

import InfoIcon from '@mui/icons-material/Info';

type TProps = {
  isOpen: boolean;
  setIsOpen?: (val: boolean) => void;
  onClose?: () => void;
  buttonText?: string;
  bodyText?: string;
  onUnmount?: () => void;
};

function InfoSnackbar(props: TProps) {
  return (
    <>
      <Snackbar
        variant="soft"
        color="primary"
        open={props.isOpen}
        onClose={() =>
          props.setIsOpen ? props.setIsOpen(false) : props.onClose?.()
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<InfoIcon />}
        onUnmount={props.onUnmount}
        endDecorator={
          <Button
            onClick={() =>
              props.setIsOpen ? props.setIsOpen(false) : props.onClose?.()
            }
            size="sm"
            variant="soft"
            color="primary"
          >
            {props.buttonText || 'Понятно'}
          </Button>
        }
      >
        {props.bodyText || 'Информация о событии'}
      </Snackbar>
    </>
  );
}

export default memo(InfoSnackbar);
