import { memo } from 'react';

import { Box, Divider, Grid } from '@mui/material';

import { Button, ButtonGroup, Typography } from '@mui/joy';

import Title from '../title';

import studentImage from '@src/assets/student.jpg';

type TProps = {
  student: TStudent;
  onDeleteBtnClick: (studentId: string) => void;
  onChangeBtnClick: (studentId: string) => void;
};

function StudentInfo(props: TProps) {
  const { student, onDeleteBtnClick, onChangeBtnClick } = props;

  const handlers = {
    handleDeleteClick: () => onDeleteBtnClick(student.id),
    handleChangeClick: () => onChangeBtnClick(student.id),
  };

  const options = {
    avatar: props.student.avatar ?? studentImage,
  };

  return (
    <>
      <Title
        component="h2"
        fontSize={24}
        sx={{ textAlign: { xs: 'center', md: 'start' } }}
      >
        Информация о студенте:{' '}
        <Typography component="span" fontSize={24} fontWeight={800}>
          {student.name}
        </Typography>
      </Title>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Grid
        container
        rowGap={'20px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'flex', md: 'block' } }}
          justifyContent={'center'}
        >
          <Box>
            <Typography>
              Имя студента:{' '}
              <Typography component={'span'} fontWeight={900}>
                {student.name}
              </Typography>
            </Typography>
            <Typography>
              Возраст:{' '}
              <Typography component={'span'} fontWeight={900}>
                {student.age}
              </Typography>
            </Typography>
            <Typography>
              Роль:{' '}
              <Typography component={'span'} fontWeight={900}>
                {student.role}
              </Typography>
            </Typography>
            <Typography>
              Примечания:{' '}
              <Typography component={'span'} fontWeight={900}>
                {student.notes || 'Отсутствуют'}
              </Typography>
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: { xs: 'flex', md: 'block' } }}
          justifyContent={'center'}
        >
          <Box
            component={'img'}
            sx={{ borderRadius: '4px', objectFit: 'cover' }}
            width={300}
            height={300}
            src={options.avatar}
            alt={props.student.name}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <ButtonGroup
        sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}
        spacing={2}
      >
        <Button
          variant="solid"
          color="danger"
          onClick={handlers.handleDeleteClick}
        >
          Удалить студента
        </Button>
        <Button
          variant="solid"
          color="primary"
          onClick={handlers.handleChangeClick}
        >
          Изменить
        </Button>
      </ButtonGroup>
    </>
  );
}

export default memo(StudentInfo);
