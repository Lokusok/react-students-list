import { memo, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import Select from '@src/components/select';
import { studentsRoles } from '@src/shared/data/students-roles';
import { activeRoleState } from '@src/store/students/states';

const rolesOptions = [
  {
    value: '',
    renderValue: 'Все',
  },
  ...studentsRoles,
];

function ActiveRoleSelect() {
  const [activeRole, setActiveRole] = useRecoilState(activeRoleState);

  const handlers = {
    onSelectChange: (_: any, value: string) => setActiveRole(value),
  };

  return (
    <Select
      value={activeRole}
      options={rolesOptions}
      onChange={handlers.onSelectChange}
    />
  );
}

export default memo(ActiveRoleSelect);
