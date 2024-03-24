import { selector } from 'recoil';

import { activeRoleState } from '../states';

import ApiService from '@src/api';

export const studentsQuery = selector<TStudent[]>({
  key: 'studentsQuery',
  get: async ({ get }) => {
    const activeRole = get(activeRoleState);
    const response = await ApiService.getStudentsByRole(activeRole);

    return response.data;
  },
});
