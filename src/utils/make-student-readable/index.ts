import { studentsRoles } from '@src/shared/data/students-roles';

function makeStudentReadable(student: TStudent) {
  const resObj = { ...student };

  resObj.role =
    studentsRoles.find((role) => role.value === resObj.role)?.renderValue ||
    resObj.role;

  return resObj;
}

export default makeStudentReadable;
