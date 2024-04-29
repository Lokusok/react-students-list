import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Alert, Box, Stack, Typography } from '@mui/joy';

import getNoun from '@src/utils/get-noun';
import { Divider } from '@mui/material';

type TProps = {
  status: 'pending' | 'fulfilled' | 'rejected';
  error?: string;
};

function Allow(props: TProps) {
  const { status, error } = props;

  const navigate = useNavigate();
  const [timeToRedirect, setTimeToRedirect] = useState(5);

  useEffect(() => {
    const interval = setInterval(
      () => setTimeToRedirect(timeToRedirect - 1),
      1000
    );
    return () => clearInterval(interval);
  }, [timeToRedirect]);

  if (timeToRedirect === 0 && status !== 'rejected') {
    navigate('/');
  }

  if (error && status === 'rejected') {
    return (
      <Box>
        <Alert variant="soft" color="danger" startDecorator={<ReportIcon />}>
          {Boolean(error) ? error : 'Ошибка при подтверждении аккаунта'}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box>
        {status === 'pending' && (
          <Typography>Идёт процесс подтверждения...</Typography>
        )}

        {status === 'fulfilled' && (
          <Alert
            variant="soft"
            color="success"
            startDecorator={<CheckCircleIcon />}
          >
            <Stack gap="5px" direction="column">
              <Box>
                <Typography>
                  Успех! Перенаправление через {timeToRedirect}{' '}
                  {getNoun(timeToRedirect, 'секунду', 'секунды', 'секунд')}.
                </Typography>
              </Box>

              {timeToRedirect === 0 && (
                <>
                  <Divider />
                  <Box>
                    <Typography>
                      Перенаправления не произошло? Перейдите по{' '}
                      <Typography component={Link} to="/">
                        ссылке
                      </Typography>
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>
          </Alert>
        )}
      </Box>
    </>
  );
}

export default memo(Allow);
