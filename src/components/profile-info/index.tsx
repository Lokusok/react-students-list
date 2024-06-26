import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Divider, Grid, Paper } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';

import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import adminImage from '@src/assets/admin.jpg';
import { Button, IconButton, Stack, Typography } from '@mui/joy';
import { Tooltip } from '@mui/material';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { TProfile, TUserInfo } from '@src/shared/types';

import makeStudentReadable from '@src/utils/make-student-readable';

import Title from '../title';
import StudentCard from '../student-card';
import AdaptiveGrid from '../adaptive-grid';

type TProps = {
  students: TStudent[];
  profile: TProfile;
  onInfoFormSubmit: (data: TUserInfo) => void;
  isInfoSubmitDisabled?: boolean;
  onDeleteBtnClick?: () => void;
  onRestorePasswordClick?: () => void;
};

const schema = z.object({
  username: z.string(),
  bio: z.string(),
  avatar: z.any().optional(),
});

function ProfileInfo(props: TProps) {
  const {
    profile,
    students,
    onInfoFormSubmit,
    isInfoSubmitDisabled,
    onDeleteBtnClick,
    onRestorePasswordClick,
  } = props;

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
  } = useForm<TUserInfo>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      username: profile.username,
      bio: profile.bio,
    },
  });

  const avatarVal = watch('avatar');

  const options = {
    avatar: profile.avatar || adminImage,
    isSubmitDisabled: !isValid || !isEditing || isInfoSubmitDisabled,
  };

  const handlers = {
    onFormSubmit: (data: TUserInfo) => {
      onInfoFormSubmit(data);
      setIsEditing(false);
      reset();
    },
    onDeleteBtnClick: () => {
      onDeleteBtnClick?.();
    },
    onRestorePasswordClick: () => {
      onRestorePasswordClick?.();
    },
  };

  const callbacks = {
    toggleEditingMode: () => {
      const nextEditingMode = !isEditing;
      setIsEditing(nextEditingMode);

      if (!nextEditingMode) {
        reset();
      }
    },
  };

  const renders = {
    studentItem: (student: TStudent) => {
      return <StudentCard student={makeStudentReadable(student)} />;
    },
  };

  return (
    <>
      <Title component="h2">Профиль администратора</Title>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Grid container rowGap="25px" columnGap="20px">
        <Grid item sx={{ display: 'flex' }} xs={12} lg={3.45}>
          <Tooltip
            open={Boolean(avatarVal)}
            title={
              avatarVal
                ? 'Аватар будет изменён после отправки формы'
                : isEditing
                ? 'Кликни и загрузи'
                : null
            }
          >
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
                      opacity: avatarVal ? 0.3 : 1,
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
                sx={{ objectFit: 'cover', width: { xs: 250, md: 300 } }}
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

        <Grid item xs={12} lg={6.5}>
          <Stack
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Title component={'h3'} fontSize={20}>
              Информация об администраторе
            </Title>

            <IconButton
              onClick={callbacks.toggleEditingMode}
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
            <Box
              sx={{
                display: 'flex',
                rowGap: '10px',
                flexWrap: 'wrap',
                mb: 1.5,
                columnGap: '20px',
              }}
            >
              <FormControl>
                <FormLabel>Имя:</FormLabel>
                <Input
                  {...register('username')}
                  name="username"
                  placeholder="Ваше имя"
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
            </Box>

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

            <Stack
              sx={{ mt: 2 }}
              direction="row"
              flexWrap="wrap"
              gap="15px"
              justifyContent="space-between"
            >
              <Button type="submit" disabled={options.isSubmitDisabled}>
                Сохранить
              </Button>

              <Stack direction="row" spacing={0.5}>
                {onRestorePasswordClick && (
                  <Button
                    onClick={handlers.onRestorePasswordClick}
                    startDecorator={<SettingsBackupRestoreIcon />}
                    color="neutral"
                    variant="outlined"
                  >
                    Восстановить пароль
                  </Button>
                )}

                {onDeleteBtnClick && (
                  <Tooltip title="Удалить аккаунт">
                    <IconButton
                      onClick={handlers.onDeleteBtnClick}
                      color="danger"
                      variant="outlined"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2.5, mb: 2.5 }} />

      <Title sx={{ mb: 2 }} component="h4">
        Избранные студенты
      </Title>

      {students.length > 0 ? (
        <AdaptiveGrid
          renderItem={renders.studentItem}
          items={students}
          keyProp={'id'}
        />
      ) : (
        <Typography sx={{ color: 'gray' }}>
          Нет студентов в избранном...
        </Typography>
      )}
    </>
  );
}

export default memo(ProfileInfo);
