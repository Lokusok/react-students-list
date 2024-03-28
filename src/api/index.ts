import axios from 'axios';

export const studentsApi = axios.create({
  baseURL: 'http://localhost:3000/students',
});

type TParams = {
  page: number;
  limit: number;
};

class ApiService {
  static getStudentsByRole(role: string, params: TParams) {
    return studentsApi.get('/', {
      params: {
        role,
        _page: params.page,
        _per_page: params.limit,
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
