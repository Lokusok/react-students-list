import { observer } from 'mobx-react-lite';

import { useLocation, useNavigate } from 'react-router-dom';

import AgreeModal from '@src/components/agree-modal';
import { Typography } from '@mui/material';

import { useStores } from '@src/hooks/use-stores';

type TProps = {
  onClose: () => void;
};

function DeleteAgreeModal(props: TProps) {
  const { onClose } = props;

  const { studentsStore, snackbarsStore } = useStores();

  const navigate = useNavigate();
  const location = useLocation();

  const student = studentsStore.students.find((s) =>
    studentsStore.activeStudents.includes(s.id)
  )!;

  const callbacks = {
    deleteStudent: async () => {
      if (!student) return;

      await studentsStore.deleteStudent(student.id);

      if (studentsStore.error) {
        return snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Ошибка при удалении студента',
        });
      }

      snackbarsStore.setSuccessSnack({
        buttonText: 'Понятно',
        bodyText: 'Студент успешно удалён!',
      });

      onClose();
      navigate(location.state.from ?? '/');
    },
  };

  return (
    <AgreeModal
      title={'Подтвердите удаление'}
      descr={
        <Typography>
          Подтвердите удаление студента{' '}
          <Typography component="span" fontWeight={800}>
            {student?.name}
          </Typography>
        </Typography>
      }
      onReject={onClose}
      onAgree={callbacks.deleteStudent}
    />
  );
}

export default observer(DeleteAgreeModal);
