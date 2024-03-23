import { memo, useEffect, useState } from 'react';

import Input from '../input';

import { Box, InputLabel, Paper, Typography, Button, Stack } from '@mui/material';
import Select from '../select';
import Textarea from '../textarea';

type TInputs = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function NewForm() {
  const [data, setData] = useState({
    'child-name': '',
    'child-role': 'default',
    'child-notes': '',
  });
  const [avatar, setAvatar] = useState<File | null | undefined>(null);

  const handlers = {
    onChange: (e: React.ChangeEvent<TInputs>) => {
      setData((prevData) => ({
        ...prevData,
        [e.target.id]: e.target.value,
      }));
    },

    onSelectChange: (id: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    },

    onChangeAvatar: (e: React.ChangeEvent<HTMLInputElement>) => {
      setAvatar(e.target.files?.item(0));
    },
  };

  const options = {
    isDisabled: Object.keys(data).some((key) => {
      const value = data[key as keyof typeof data];

      if (key === 'child-role' && value === 'default') return true;
      return value === '';
    }),
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography gutterBottom fontWeight={900} fontSize={20}>
        Добавить нового
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Box component="form" autoComplete="off" sx={{ width: '100%' }}>
          <Stack direction="column" spacing={2}>
            <Box>
              <InputLabel shrink htmlFor="child-name">
                Имя ученика:
              </InputLabel>
              <Input
                onChange={handlers.onChange}
                id="child-name"
                placeholder="Как зовут ученика?"
              />
            </Box>

            <Box sx={{ width: 300 }}>
              <InputLabel shrink htmlFor="child-role">
                Роли ученика:
              </InputLabel>

              <Select
                id="child-role"
                value={data['child-role']}
                onChange={handlers.onSelectChange}
              />
            </Box>

            <Box>
              <InputLabel shrink htmlFor="child-notes">
                Иные примечания:
              </InputLabel>

              <Textarea
                onChange={handlers.onChange}
                id="child-notes"
                placeholder="Трудолюбив, ..."
              />
            </Box>

            <Box>
              <InputLabel shrink htmlFor="child-notes">
                Фото (необязательно):
              </InputLabel>

              <Input onChange={handlers.onChangeAvatar} type="file" />

              {avatar && (
                <Paper sx={{ mt: 1.5, maxWidth: 300 }} elevation={3}>
                  <img width={300} src={URL.createObjectURL(avatar)} />
                </Paper>
              )}
            </Box>

            <Box>
              <Button disabled={options.isDisabled} variant="contained">
                Добавить
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(NewForm);
