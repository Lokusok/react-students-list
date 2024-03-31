import { memo, useEffect, useState } from 'react';

import AgreeModal from '../agree-modal';

import { Divider, Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import { ButtonGroup } from '@mui/joy';
import ChangeModal from '../change-modal';

import { TInputs, TStudentData } from '@src/shared/types';

type TProps = {
  student: TStudent;
  editableData: TStudentData;
  deleteStudent: () => void;
  updateStudent: () => void;
  onChange: (e: React.ChangeEvent<TInputs>) => void;
  onExtraChange: (id: string, value: string) => void;
  onAvatarChange: (val: File) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  renderSuccessSnackbar: () => React.ReactNode;
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
      props.deleteStudent();
    }
  }, [props.deleteStudent, isDeletionAgree]);

  useEffect(() => {
    setIsChangingAgree(null);
  }, [props.student]);

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

      {props.renderSuccessSnackbar()}

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
