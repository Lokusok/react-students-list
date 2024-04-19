import ApiService from '@src/api';
import { studentsRoles } from '@src/shared/data/students-roles';
import { TStudentData } from '@src/shared/types';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction, spy } from 'mobx';

export class StudentsStore {
  isLoading: boolean = false;
  // isError: boolean = false;
  error: string = '';

  students: TStudent[] = [];
  activeRole: string = '';

  totalPages: number = 1;
  currentPage: number = 1;

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
   * Количество студентов по их ролям
   */
  get rolesCount() {
    const students = this.students;

    const res = studentsRoles.reduce(
      (acc, val) => ({ ...acc, [val.value]: 0 }),
      {}
    );
    students.forEach((student) => {
      res[student.role as keyof typeof res]++;
    });

    return res as Record<string, number>;
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
      const { students, totalPages } = await ApiService.getStudentsByRole(
        this.activeRole,
        params
      );

      runInAction(() => {
        this.totalPages = totalPages;
        this.students = students;
        this.error = '';
      });
    } catch (err) {
      if (err instanceof Error) {
        runInAction(() => {
          this.error = err.message;
        });
      }
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
      const response = await ApiService.addStudent(student);
      const newStudent = response.data;
      this.addStudent(newStudent);
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError) {
        runInAction(() => {
          this.error = err.response?.data.error;
        });
      }
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
    try {
      const response = await ApiService.deleteStudent(id);
      this.fetchStudents();
      runInAction(() => {
        this.error = '';
      });
    } catch (err) {
      if (err instanceof Error) {
        runInAction(() => {
          this.error = err.message;
        });
      }
    }
  }

  /**
   * Обновить студента
   */
  async updateStudent(id: string, newStudentData: TStudentData) {
    try {
      await ApiService.updateStudent(id, newStudentData);
      runInAction(() => {
        this.students = this.students.map((student) => {
          if (student.id === id) {
            return { id, ...newStudentData } as TStudent;
          }

          return student;
        });

        this.error = '';
      });
    } catch (err) {
      if (err instanceof Error) {
        runInAction(() => {
          this.error = err.message;
        });
      }
    }
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
}

spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`);
  }
});

const studentsStore = new StudentsStore();

export default studentsStore;
