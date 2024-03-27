import ApiService from '@src/api';
import { selectorFamily } from 'recoil';

export const addStudentMutation = selectorFamily({
  key: 'addStudentMutation',
  get: (student: TStudent) => async () => {
    try {
      const response = await ApiService.addStudent(student);
      console.log('@', response);
    } catch (e) {
      console.log('Ошибка при добавлении пользователя');
    }
  },
});
