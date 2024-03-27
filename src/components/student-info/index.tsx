import { memo, useEffect, useState } from 'react';

import AgreeModal from '../agree-modal';

import { Box, Divider, Modal, Stack, Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import { ButtonGroup } from '@mui/joy';
import ChangeModal from '../change-modal';

type TProps = {
  student: TStudent;
  deleteStudent: () => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '6px',
  pt: 2,
  px: 4,
  pb: 3,
};

function StudentInfo(props: TProps) {
  const { student } = props;
  const [isDeletionAgree, setIsDeletionAgree] = useState<null | boolean>(null);
  const [isChangingAgree, setIsChangingAgree] = useState<null | boolean>(null);

  const handlers = {
    handleDeleteClick: () => setIsDeletionAgree(false),
    handleChangeClick: () => setIsChangingAgree(false),
  };

  useEffect(() => {
    if (isDeletionAgree === true) {
      console.log('Удаляю студента!');
      props.deleteStudent();
    }
  }, [props.deleteStudent, isDeletionAgree]);

  return (
    <>
      <Typography component="h2" fontSize={24}>
        Информация о студенте:{' '}
        <Typography component="span" fontSize={24} fontWeight={800}>
          {student.name}
        </Typography>
      </Typography>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Typography>Имя студента: {student.name}</Typography>
      <Typography>Роль: {student.role}</Typography>
      <Typography>Примечания: {student.notes}</Typography>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <ButtonGroup spacing={2}>
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

      {isDeletionAgree === false && (
        <AgreeModal
          title={'Подтвердите удаление'}
          descr={
            <Typography>
              Подтвердите удаление студента{' '}
              <Typography component="span" fontWeight={800}>
                {student.name}
              </Typography>
            </Typography>
          }
          onReject={() => setIsDeletionAgree(null)}
          onAgree={() => setIsDeletionAgree(true)}
        />
      )}

      {isChangingAgree === false && (
        <ChangeModal
          title={'Изменить студента'}
          descr={'Обновите имеющиеся данные'}
          onReject={() => setIsChangingAgree(null)}
          onAgree={() => setIsChangingAgree(true)}
        />
      )}
    </>
  );
}

export default memo(StudentInfo);
