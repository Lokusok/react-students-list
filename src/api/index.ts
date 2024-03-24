import axios from 'axios';

export const studentsApi = axios.create({
  baseURL: 'http://localhost:3000/students',
});

class ApiService {
  static getStudentsByRole(role: string) {
    return studentsApi.get(`?role=${role}`);
  }
}

export default ApiService;
