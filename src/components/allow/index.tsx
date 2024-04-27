import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/joy';

import getNoun from '@src/utils/get-noun';

type TProps = {
  status: 'pending' | 'fulfilled' | 'rejected';
};

function Allow(props: TProps) {
  const { status } = props;

  const navigate = useNavigate();
  const [timeout, setTimeout] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => setTimeout(timeout - 1), 1000);
    return () => clearInterval(interval);
  }, [timeout]);

  if (timeout === 0) {
    navigate('/');
  }

  return (
    <>
      <Box>
        {status === 'pending' && (
          <Typography>Идёт процесс подтверждения...</Typography>
        )}

        {status === 'fulfilled' && (
          <Typography>
            Успех! Перенаправление через {timeout}{' '}
            {getNoun(timeout, 'секунду', 'секунды', 'секунд')}.
          </Typography>
        )}

        {status === 'rejected' && (
          <Typography>Ошибка при подтверждении аккаунта</Typography>
        )}
      </Box>
    </>
  );
}

export default memo(Allow);
