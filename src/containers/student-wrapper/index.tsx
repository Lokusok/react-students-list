import { observer } from 'mobx-react-lite';

import StudentInfo from '@src/components/student-info';

import { Typography } from '@mui/material';

import { useStores } from '@src/hooks/use-stores';

import makeStudentReadable from '@src/utils/make-student-readable';

type TProps = {
  id: string | number;
};

function StudentWrapper(props: TProps) {
  const { id } = props;

  const { studentsStore, modalsStore } = useStores();

  const student = studentsStore.students.find((s) => s.id == id);
  const studentReadable = makeStudentReadable(student as TStudent);

  const callbacks = {
    openModalChangeAgree: () => {
      if (!student) return;

      modalsStore.addActiveModal('changeAgree');
      studentsStore.setActiveStudent(student.id);
    },

    openModalDeleteAgree: () => {
      if (!student) return;

      modalsStore.addActiveModal('deleteAgree');
      studentsStore.setActiveStudent(student.id);
    },
  };

  return (
    <>
      {student && (
        <StudentInfo
          student={studentReadable}
          onDeleteBtnClick={callbacks.openModalDeleteAgree}
          onChangeBtnClick={callbacks.openModalChangeAgree}
        />
      )}
      {!student && <Typography>Информации о студенте не найдено...</Typography>}
    </>
  );
}

export default observer(StudentWrapper);
