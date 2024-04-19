import { TStudentData, TUserRegister } from '@src/shared/types';
import axios, { AxiosError } from 'axios';

// export const studentsApi = axios.create({
//   baseURL: 'http://localhost:3000/students',
// });

export const studentsApi = axios.create({
  baseURL: '/api/students',
});

export const sessionApi = axios.create({
  baseURL: '/api/session',
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
  static async getStudentsByRole(
    role: string,
    params: TParams
  ): Promise<{ students: TStudent[]; totalPages: number }> {
    const correctSystemPage = params.page - 1;
    const response = await studentsApi.get<{
      result: TStudent[];
      totalPages: number;
    }>('/', {
      params: {
        role,
        offset: correctSystemPage * params.limit,
        limit: params.limit,
      },
    });

    return {
      students: response.data.result,
      totalPages: response.data.totalPages,
    };
  }

  /**
   * Добавление студента
   * @param student {Object}
   */
  static async addStudent(student: FormData) {
    try {
      return await studentsApi.post('/', student);
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data);
      }

      throw new Error('Ошибка при добавлении.');
    }
  }

  /**
   * Удаление студента по id
   * @param id {string}
   */
  static async deleteStudent(id: string) {
    try {
      return await studentsApi.delete(`/${id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data);
      }

      throw new Error('Ошибка при удалении.');
    }
  }

  /**
   * Обновление студента
   * @param id {String}
   * @param newStudentData {Object}
   */
  static async updateStudent(id: string, newStudentData: TStudentData) {
    // return studentsApi.put(`/${id}`, newStudentData);
    try {
      return await studentsApi.put(`/${id}`, newStudentData);
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data);
      }

      throw new Error('Ошибка при изменении');
    }
  }

  /**
   * Регистрация пользователя
   * @param userData {TUserRegister}
   */
  static async registerUser(userData: TUserRegister) {
    try {
      const response = await sessionApi.post('/register', userData);
      console.log('Success: ', response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default ApiService;
