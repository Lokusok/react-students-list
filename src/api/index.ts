import { TStudentData } from '@src/shared/types';
import axios from 'axios';

export const studentsApi = axios.create({
  baseURL: 'http://localhost:3000/students',
});

type TParams = {
  page: number;
  limit: number;
};

/**
 * Сервис взаимодействия с апи
 */
class ApiService {
  /**
   * Получение студента по его роли
   * @param role {String} Роль студента
   * @param params {Object} Параметры запроса
   */
  static getStudentsByRole(role: string, params: TParams) {
    return studentsApi.get('/', {
      params: {
        role,
        _page: params.page,
        _per_page: params.limit,
      },
    });
  }

  /**
   * Добавление студента
   * @param student {Object}
   */
  static addStudent(student: TStudent) {
    return studentsApi.post('/', student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Удаление студента по id
   * @param id {string}
   */
  static deleteStudent(id: string) {
    return studentsApi.delete(`/${id}`);
  }

  /**
   * Обновление студента
   * @param id {String}
   * @param newStudentData {Object}
   */
  static updateStudent(id: string, newStudentData: TStudentData) {
    return studentsApi.put(`/${id}`, newStudentData);
  }
}

export default ApiService;
