import { observer } from 'mobx-react-lite';

import Select from '@src/components/select';
import { studentsRoles } from '@src/shared/data/students-roles';

import { useStores } from '@src/hooks/use-stores';

const rolesOptions = [
  {
    value: '',
    renderValue: 'Все',
  },
  ...studentsRoles,
];

function ActiveRoleSelect() {
  const { studentsStore } = useStores();

  const handlers = {
    onSelectChange: (_: any, value: string) => {
      studentsStore.setActiveRole(value);
      studentsStore.setCurrentPage(1);
    },
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
