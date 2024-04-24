import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';

import CreateIcon from '@mui/icons-material/Create';

import adminImage from '@src/assets/admin.jpg';
import { Button, IconButton, Stack, Tooltip } from '@mui/joy';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { TProfile, TUserInfo } from '@src/shared/types';

type TProps = {
  profile: TProfile;
  onInfoFormSubmit: (data: TUserInfo) => void;
  isInfoSubmitDisabled?: boolean;
};

const schema = z.object({
  username: z.string(),
  bio: z.string(),
  avatar: z.any().optional(),
});

function ProfileInfo(props: TProps) {
  const { profile, onInfoFormSubmit, isInfoSubmitDisabled } = props;

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TUserInfo>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      username: profile.username,
      bio: profile.bio,
    },
  });

  const options = {
    avatar: profile.avatar || adminImage,
    isSubmitDisabled: !isValid || !isEditing || isInfoSubmitDisabled,
  };

  const handlers = {
    onFormSubmit: (data: TUserInfo) => {
      onInfoFormSubmit(data);
      setIsEditing(false);
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
          <Tooltip title={isEditing ? 'Кликни и загрузи' : null}>
            <Paper
              sx={
                isEditing
                  ? {
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
                    }
                  : {
                      py: 1,
                      px: 2,
                      borderRadius: '4px',
                      objectFit: 'cover',
                    }
              }
              elevation={5}
            >
              <Box
                component={'img'}
                sx={{ objectFit: 'cover' }}
                width={300}
                height={320}
                src={options.avatar}
                alt="Аватар пользователя"
              />
              <Box
                sx={
                  isEditing
                    ? {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }
                    : {
                        display: 'none',
                      }
                }
                {...register('avatar')}
                component={'input'}
                type="file"
                disabled={!isEditing}
                form="adminForm"
                name="avatar"
              />
            </Paper>
          </Tooltip>
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
            onSubmit={handleSubmit(handlers.onFormSubmit)}
            encType="multipart/form-data"
          >
            <Stack sx={{ mb: 1.5 }} direction="row" spacing={3}>
              <FormControl>
                <FormLabel>Имя:</FormLabel>
                <Input
                  {...register('username')}
                  name="username"
                  disabled={!isEditing}
                />
              </FormControl>

              <Tooltip title={'Логин изменять нельзя'}>
                <FormControl>
                  <FormLabel>Логин (почта):</FormLabel>
                  <Input
                    name="login"
                    defaultValue={profile.login}
                    disabled={true}
                  />
                </FormControl>
              </Tooltip>
            </Stack>

            <FormControl>
              <FormLabel>Немного о себе:</FormLabel>
              <Textarea
                {...register('bio')}
                disabled={!isEditing}
                placeholder="Введите информацию о себе"
                minRows={5}
                name="bio"
              />
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Button type="submit" disabled={options.isSubmitDisabled}>
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