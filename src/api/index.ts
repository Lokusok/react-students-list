import axios from 'axios';

export const studentsApi = axios.create({
  baseURL: 'http://localhost:3000/students',
});

class ApiService {
  static getStudentsByRole(role: string) {
    return studentsApi.get('/', {
      params: {
        role,
      },
    });
  }

  static addStudent(student: TStudent) {
    return studentsApi.post('/', student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static deleteStudent(id: string | number) {
    return studentsApi.delete(`/${id}`);
  }
}

export default ApiService;
