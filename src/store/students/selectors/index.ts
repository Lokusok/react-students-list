import { selector } from 'recoil';
import { studentsQuery } from '../queries';
import { studentsRoles } from '@src/shared/data/students-roles';

export const rolesCountSelector = selector<Record<string, number>>({
  key: 'rolesCountSelector',
  get: ({ get }) => {
    const students = get(studentsQuery);

    const res = studentsRoles.reduce(
      (acc, val) => ({ ...acc, [val.value]: 0 }),
      {}
    );
    students.forEach((student) => {
      res[student.role as keyof typeof res]++;
    });

    return res as Record<string, number>;
  },
});
