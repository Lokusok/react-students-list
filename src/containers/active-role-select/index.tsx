import { observer } from 'mobx-react-lite';

import studentsStore from '@src/store/students-mobx';

import Select from '@src/components/select';
import { studentsRoles } from '@src/shared/data/students-roles';

const rolesOptions = [
  {
    value: '',
    renderValue: 'Все',
  },
  ...studentsRoles,
];

function ActiveRoleSelect() {
  const handlers = {
    onSelectChange: (_: any, value: string) =>
      studentsStore.setActiveRole(value),
  };

  return (
    <Select
      value={studentsStore.activeRole}
      options={rolesOptions}
      onChange={handlers.onSelectChange}
    />
  );
}

export default observer(ActiveRoleSelect);
