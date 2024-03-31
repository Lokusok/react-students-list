import ApiService from '@src/api';
import { studentsRoles } from '@src/shared/data/students-roles';
import { TStudentData } from '@src/shared/types';
import { makeAutoObservable, runInAction, spy } from 'mobx';

class StudentsStore {
  isLoading: boolean = false;
  isError: boolean = false;

  students: TStudent[] = [];
  activeRole: string = '';

  totalPages: number = 1;
  currentPage: number = 1;

  constructor() {
    makeAutoObservable(this);
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
      const response = await ApiService.getStudentsByRole(
        this.activeRole,
        params
      );
      this.totalPages = response.data.pages;

      if (response.data.next) this.currentPage = response.data.next - 1;
      else if (!response.data.prev) this.currentPage = 1;

      this.students = response.data.data;
      this.isError = false;
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Создание студента и добавление в стейт
   */
  async createStudent(student: TStudent) {
    try {
      const response = await ApiService.addStudent(student);
      const newStudent = response.data;
      this.addStudent(newStudent);
    } catch (e) {
      console.log('err');
    }
  }

  /**
   * Удалить студента
   */
  async deleteStudent(id: string) {
    try {
      const response = await ApiService.deleteStudent(id);
      this.fetchStudents();
    } catch (e) {
      console.log('deletion error');
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
            return { id, ...newStudentData };
          }

          return student;
        });

        console.log(this.students);
      });
    } catch (e) {
      console.log('update error');
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
