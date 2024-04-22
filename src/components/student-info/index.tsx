import { memo, useEffect, useState } from 'react';

import { Box, Divider, Grid, Typography } from '@mui/material';

import Button from '@mui/joy/Button';
import { ButtonGroup } from '@mui/joy';
import ChangeModal from '../change-modal';

import { TInputs, TStudentData } from '@src/shared/types';

import studentImage from '@src/assets/student.jpg';

type TProps = {
  student: TStudent;
  editableData: TStudentData;
  updateStudent: () => void;
  onChange: (e: React.ChangeEvent<TInputs>) => void;
  onExtraChange: (id: string, value: string) => void;
  onAvatarChange: (val: File) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDeleteBtnClick: (studentId: string) => void;
};

function StudentInfo(props: TProps) {
  const { student, onDeleteBtnClick } = props;
  const [isChangingAgree, setIsChangingAgree] = useState<null | boolean>(null);

  const handlers = {
    handleDeleteClick: () => onDeleteBtnClick(student.id),
    handleChangeClick: () => setIsChangingAgree(false),
  };

  const options = {
    avatar: props.student.avatar ?? studentImage,
  };

  useEffect(() => {
    setIsChangingAgree(null);
  }, [props.student]);

  return (
    <>
      <Typography
        component="h2"
        fontSize={24}
        sx={{ textAlign: { xs: 'center', md: 'start' } }}
      >
        Информация о студенте:{' '}
        <Typography component="span" fontSize={24} fontWeight={800}>
          {student.name}
        </Typography>
      </Typography>

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
            sx={{ borderRadius: '4px' }}
            width={300}
            src={options.avatar}
            alt={props.student.name}
          ></Box>
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

      {isChangingAgree === false && (
        <ChangeModal
          studentData={props.editableData}
          onReject={() => setIsChangingAgree(null)}
          onAgree={() => setIsChangingAgree(true)}
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          onExtraChange={props.onExtraChange}
          onAvatarChange={props.onAvatarChange}
        />
      )}
    </>
  );
}

export default memo(StudentInfo);
