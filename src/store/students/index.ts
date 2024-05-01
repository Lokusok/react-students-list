import ApiService from '@src/api';

import { makeAutoObservable, runInAction, spy } from 'mobx';

import { AxiosError } from 'axios';

import { TCountRoles } from '@src/shared/types';

import { TViewStrategies } from './types';

export class StudentsStore {
  waiting: boolean = false;
  isWaitingDelete: boolean = false;
  isWaitingUpdate: boolean = false;
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
   * Установить ошибку
   */
  setError(error: string) {
    this.error = error;
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
    this.waiting = true;

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
        this.countRoles = countRoles;
      });
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data?.error);
      this.setError('Ошибка при запросе студентов');
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Создание студента и добавление в стейт
   */
  async createStudent(student: FormData) {
    this.waiting = true;

    try {
      await ApiService.addStudent(student);

      this.fetchStudents();
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при создании студента');
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Удалить студента
   */
  async deleteStudent(id: string) {
    this.waiting = true;

    try {
      await ApiService.deleteStudent(id);
      this.fetchStudents();
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при удалении студента');
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Удалить сразу нескольких студентов
   */
  async deleteStudents(ids: string[]) {
    this.isWaitingDelete = true;

    try {
      await ApiService.deleteStudents(ids);
      this.fetchStudents();
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при удалении студентов');
    } finally {
      runInAction(() => {
        this.isWaitingDelete = false;
      });
    }
  }

  /**
   * Обновить студента
   */
  async updateStudent(
    id: string,
    newStudentData: FormData,
    fetchAllAgain = true
  ) {
    this.isWaitingUpdate = true;
    this.activeStudents = [...this.activeStudents, id];

    try {
      const student = await ApiService.updateStudent(id, newStudentData);
      if (fetchAllAgain) this.fetchStudents();
      else
        this.students = this.students.map((s) =>
          s.id === student.id ? student : s
        );
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при обновлении студента');
    } finally {
      runInAction(() => {
        this.activeStudents = this.activeStudents.filter(
          (existId) => existId !== id
        );
        this.isWaitingUpdate = Boolean(this.activeStudents.length);
      });
    }
  }

  /**
   * Переключатель студента в избранное
   */
  async toggleFavourite(id: string) {
    const student = this.students.find((s) => s.id === id);
    const favouriteStudent = new FormData();

    for (const key in student) {
      const value = student[key as keyof typeof student];
      favouriteStudent.append(key, String(value));
    }

    favouriteStudent.set('isFavourite', String(!student?.isFavourite));

    await this.updateStudent(id, favouriteStudent, false);
  }

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

  /**
   * Удаление активного студента
   */
  removeActiveStudent(studentId: string) {
    this.activeStudents = this.activeStudents.filter(
      (existId) => existId !== studentId
    );
  }
}

// spy((event) => {
//   if (event.type === 'action') {
//     console.log(`${event.name} with args:`, event.arguments);
//   }
// });

const studentsStore = new StudentsStore();

export default studentsStore;
