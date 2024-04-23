import { memo, useRef, useState } from 'react';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';

import CreateIcon from '@mui/icons-material/Create';

import adminImage from '@src/assets/admin.jpg';
import { Button, IconButton, Stack, Tooltip } from '@mui/joy';

type TProps = {};

function ProfileInfo(props: TProps) {
  const [isEditing, setIsEditing] = useState(false);

  const options = {
    avatar: adminImage,
  };

  const handlers = {
    onAvatarUploadClick: async () => {
      // const files = await window.showOpenFilePicker();
      // console.log(await files[0].getFile());
      // avatarFileInputRef.current.value = await files[0].getFile();
    },

    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      console.log(formData.get('username'));
      console.log(formData.get('email'));
      console.log(formData.get('bio'));
      console.log(formData.get('avatar'));
    },
  };

  return (
    <>
      <Typography component={'h2'} fontSize={26} fontWeight={700}>
        Профиль администратора
      </Typography>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Grid container columnGap="20px">
        <Grid item>
          <Paper
            sx={{
              position: 'relative',
              py: 1,
              px: 2,
              borderRadius: '4px',
              objectFit: 'cover',
              cursor: 'pointer',
              transition: 'opacity ease 0.2s',
              '&:hover': {
                opacity: 0.8,
              },
              '&:active': {
                opacity: 0.5,
              },
            }}
            elevation={5}
          >
            <Tooltip title="Кликни и загрузи">
              <Box
                component={'img'}
                onPointerDown={handlers.onAvatarUploadClick}
                sx={{ objectFit: 'cover' }}
                width={300}
                height={320}
                src={options.avatar}
                alt="Аватар пользователя"
              />
            </Tooltip>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
              component={'input'}
              type="file"
              form="adminForm"
              name="avatar"
            />
          </Paper>
        </Grid>

        <Grid item>
          <Stack
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Typography component={'h3'} fontSize={20} fontWeight={700}>
              Информация об администраторе
            </Typography>

            <IconButton
              onClick={() => setIsEditing((e) => !e)}
              variant={isEditing ? 'solid' : 'soft'}
            >
              <CreateIcon />
            </IconButton>
          </Stack>

          <Box
            id="adminForm"
            name="adminForm"
            component={'form'}
            onSubmit={handlers.onFormSubmit}
            encType="multipart/form-data"
          >
            <Stack sx={{ mb: 1.5 }} direction="row" spacing={3}>
              <FormControl>
                <FormLabel>Имя:</FormLabel>
                <Input
                  name="username"
                  defaultValue={'Иван'}
                  disabled={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Логин (почта):</FormLabel>
                <Input
                  name="email"
                  defaultValue={'ivan@gmail.com'}
                  disabled={!isEditing}
                />
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel>Немного о себе:</FormLabel>
              <Textarea
                disabled={!isEditing}
                placeholder="Введите информацию о себе"
                minRows={5}
                name="bio"
              />
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Button type="submit" disabled={!isEditing}>
                Сохранить
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(ProfileInfo);
