import ApiService from '@src/api';

import { makeAutoObservable, runInAction, spy } from 'mobx';

import { AxiosError } from 'axios';

import { TCountRoles, TStudentData } from '@src/shared/types';

import { TViewStrategies } from './types';
import student from '@src/app/student';

export class StudentsStore {
  isLoading: boolean = false;
  isFetchingDelete: boolean = false;
  isFetchingUpdate: boolean = false;
  error: string = '';

  activeStudents: string[] = [];
  students: TStudent[] = [];
  activeRole: string = '';

  totalPages: number = 1;
  currentPage: number = 1;

  viewStrategy: TViewStrategies = 'grid';
  countRoles: TCountRoles | {} = {};

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Сбросить ошибки
   */
  resetErrors() {
    this.error = '';
  }

  /**
   * Инициализация параметров из URL
   */
  initParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('viewStrategy')) {
      this.setViewStrategy(params.get('viewStrategy') as TViewStrategies);
    } else if (this.viewStrategy) {
      this.setParams({ viewStrategy: this.viewStrategy });
    }

    if (params.get('role')) this.setActiveRole(params.get('role')!.normalize());
    else if (this.activeRole) this.setParams({ role: this.activeRole });

    if (params.get('page')) this.setCurrentPage(Number(params.get('page')));
    else if (this.currentPage) this.setParams({ page: this.currentPage });
  }

  /**
   * Синхронизация полей стора и URL
   */
  setParams(recordParams: Record<string, string | boolean | number>) {
    const params = new URLSearchParams(window.location.search);

    loopLabel: for (const key in recordParams) {
      const paramVal = recordParams[key];

      switch (key) {
        case 'viewStrategy':
          this.setViewStrategy(paramVal as TViewStrategies);
          break;
        case 'role':
          this.setActiveRole(String(paramVal));
          if (String(paramVal) === '') {
            params.delete(key);
            continue loopLabel;
          }
          break;
        case 'page':
          this.setCurrentPage(Number(paramVal));
          break;
      }

      params.set(key, String(paramVal));
    }

    const url = window.location.pathname + '?' + params.toString();
    window.history.pushState({}, '', url);
  }

  /**
   * Запрос за студентами
   */
  async fetchStudents() {
    this.isLoading = true;

    try {
      const params = {
        page: this.currentPage,
        limit: 6,
      };
      const { students, totalPages, countRoles } =
        await ApiService.getStudentsByRole(this.activeRole, params);

      runInAction(() => {
        this.totalPages = totalPages;
        this.students = students;
        this.error = '';
        this.countRoles = countRoles;
      });
    } catch (err) {
      if (err instanceof Error) {
        return runInAction(() => {
          this.error = err.message;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при запросе студентов';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /**
   * Создание студента и добавление в стейт
   */
  async createStudent(student: FormData) {
    this.isLoading = true;

    try {
      await ApiService.addStudent(student);

      this.fetchStudents();
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при создании студента';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /**
   * Удалить студента
   */
  async deleteStudent(id: string) {
    this.isLoading = true;

    try {
      await ApiService.deleteStudent(id);
      this.fetchStudents();
      runInAction(() => {
        this.error = '';
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при удалении студента';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /**
   * Удалить сразу нескольких студентов
   */
  async deleteStudents(ids: string[]) {
    this.isFetchingDelete = true;

    try {
      await ApiService.deleteStudents(ids);
      this.fetchStudents();
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при удалении студентов';
      });
    } finally {
      runInAction(() => {
        this.isFetchingDelete = false;
      });
    }
  }

  /**
   * Обновить студента
   */
  async updateStudent(id: string, newStudentData: TStudentData) {
    this.isFetchingUpdate = true;
    this.activeStudents = [...this.activeStudents, id];

    try {
      await ApiService.updateStudent(id, newStudentData);
      runInAction(() => {
        this.students = this.students.map((student) => {
          if (student.id === id) return { id, ...newStudentData } as TStudent;
          return student;
        });
        this.error = '';
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при обновлении студента';
      });
    } finally {
      runInAction(() => {
        this.activeStudents = this.activeStudents.filter(
          (existId) => existId !== id
        );
        this.isFetchingUpdate = Boolean(this.activeStudents.length);
      });
    }
  }

  /**
   * Добавить студента в избранное
   */

  /**
   * Установить активную роль
   */
  setActiveRole(role: string) {
    this.activeRole = role;
  }

  /**
   * Установить текущую активную страницу
   */
  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  /**
   * Добавить студента в стейт
   */
  addStudent(student: TStudent) {
    this.students.push(student);
  }

  /**
   * Установка стратегии отображения данных
   */
  setViewStrategy(viewStrategy: TViewStrategies) {
    this.viewStrategy = viewStrategy;
  }

  /**
   * Установка активного студента
   */
  setActiveStudent(studentId: string) {
    this.activeStudents = [...this.activeStudents, studentId];
  }
}

spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`);
  }
});

const studentsStore = new StudentsStore();

export default studentsStore;
