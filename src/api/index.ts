import axios from 'axios';

import {
  TCountRoles,
  TProfile,
  TUserLogin,
  TUserMainLogin,
  TUserRegister,
} from '@src/shared/types';

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
  ): Promise<{
    students: TStudent[];
    totalPages: number;
    countRoles: TCountRoles;
  }> {
    const correctSystemPage = params.page - 1;
    const response = await studentsApi.get<{
      result: TStudent[];
      totalPages: number;
      countRoles: TCountRoles;
    }>('', {
      params: {
        role,
        offset: correctSystemPage * params.limit,
        limit: params.limit,
      },
    });

    return {
      students: response.data.result,
      totalPages: response.data.totalPages,
      countRoles: response.data.countRoles,
    };
  }

  /**
   * Добавление студента
   * @param student {Object}
   */
  static async addStudent(student: FormData) {
    try {
      return await studentsApi.post('', student);
    } catch (err) {
      throw err;
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
      throw err;
    }
  }

  static async deleteStudents(ids: string[]) {
    try {
      return await studentsApi.delete('', {
        data: {
          ids: ids,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Обновление студента
   * @param id {String}
   * @param newStudentData {Object}
   */
  static async updateStudent(
    id: string,
    newStudentData: FormData
  ): Promise<TStudent> {
    try {
      const response = await studentsApi.put<TStudent>(
        `/${id}`,
        newStudentData
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Регистрация пользователя
   * @param userData {TUserRegister}
   */
  static async registerUser(userData: TUserRegister) {
    try {
      const response = await sessionApi.post('/register', userData);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Логинизация пользователя
   * @param userData {TUserLogin}
   */
  static async loginUser(userData: TUserLogin) {
    try {
      const response = await sessionApi.post('/login', userData);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Аутентификация пользователя
   */
  static async remind() {
    try {
      const response = await sessionApi.post('/remind');
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Выйти из аккаунта
   */
  static async logout() {
    try {
      await sessionApi.post('/logout');
    } catch (err) {
      throw err;
    }
  }

  /**
   * Изменить информацию об аккаунте
   */
  static async changeUserInfo(userInfo: FormData): Promise<TProfile> {
    try {
      const response = await sessionApi.post<TProfile>('/change', userInfo);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Сделать пользователя подтверждённым
   */
  static async allowUser(userId: string) {
    try {
      await sessionApi.post('/allow', {
        id: userId,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Подтвердить пароль пользователя
   */
  static async confirmPassword(userId: string, password: string) {
    try {
      await sessionApi.post('/confirm', {
        id: userId,
        password,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Удалить пользователя
   */
  static async deleteUser(userId: string, password: string) {
    try {
      await sessionApi.delete('/delete', {
        data: {
          id: userId,
          password,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Начать процесс сброса пароля
   */
  static async startRestorePassword(email: string) {
    try {
      await sessionApi.post('/start_password_restore', {
        email,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Сбросить пароль
   */
  static async resetPassword(data: TUserMainLogin) {
    try {
      await sessionApi.post('/password_reset', {
        login: data.login,
        password: data.password,
      });
    } catch (err) {
      throw err;
    }
  }
}

export default ApiService;
