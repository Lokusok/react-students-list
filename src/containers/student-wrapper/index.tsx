import { observer } from 'mobx-react-lite';

import StudentInfo from '@src/components/student-info';

import { Typography } from '@mui/material';

import useStores from '@src/hooks/use-stores';

import makeStudentReadable from '@src/utils/make-student-readable';

type TProps = {
  id: string | number;
};

function StudentWrapper(props: TProps) {
  const { id } = props;

  const { studentsStore, modalsStore, snackbarsStore } = useStores();

  const student = studentsStore.students.find((s) => s.id == id);
  const studentReadable = makeStudentReadable(student as TStudent);

  const fetchingParams = {
    isWaitingUpdate: studentsStore.isWaitingUpdate,
    activeStudents: studentsStore.activeStudents,
  };

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

    addToFavourite: async (student: TStudent) => {
      if (!student) return;

      const favouriteStudent: TStudent = {
        ...student,
        isFavourite: !student.isFavourite,
      };

      await studentsStore.updateStudent(student.id, favouriteStudent);

      if (!studentsStore.error) {
        return snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Студент обновлён',
        });
      }

      snackbarsStore.setErrorSnack({
        buttonText: 'Понятно',
        bodyText: 'Произошла ошибка...',
      });
    },
  };

  const options = {
    isFavouriteBtnDisabled:
      fetchingParams.isWaitingUpdate &&
      fetchingParams.activeStudents.includes(student!.id),
  };

  return (
    <>
      {student && (
        <StudentInfo
          student={studentReadable}
          onDeleteBtnClick={callbacks.openModalDeleteAgree}
          onChangeBtnClick={callbacks.openModalChangeAgree}
          onFavouriteBtnClick={callbacks.addToFavourite}
          isFavouriteBtnDisabled={options.isFavouriteBtnDisabled}
        />
      )}
      {!student && <Typography>Информации о студенте не найдено...</Typography>}
    </>
  );
}

export default observer(StudentWrapper);
