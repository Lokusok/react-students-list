import { memo } from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

type TProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  buttonText?: string;
  bodyText?: string;
  onUnmount?: () => void;
};

function SuccessSnackbar(props: TProps) {
  return (
    <>
      <Snackbar
        variant="soft"
        color="success"
        open={props.isOpen}
        onClose={() => props.setIsOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        onUnmount={props.onUnmount}
        endDecorator={
          <Button
            onClick={() => props.setIsOpen(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            {props.buttonText || 'Понятно'}
          </Button>
        }
      >
        {props.bodyText || 'Событие успешно завершено!'}
      </Snackbar>
    </>
  );
}

export default memo(SuccessSnackbar);
