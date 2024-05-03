import { observer } from 'mobx-react-lite';

import Select from '@src/components/select';
import { studentsRoles } from '@src/shared/data/students-roles';

import useStores from '@src/hooks/use-stores';
import { Box } from '@mui/material';

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
      studentsStore.setParams({
        role: value,
        page: 1,
      });
    },
  };

  return (
    <Box sx={{ width: '320px' }}>
      <Select
        value={studentsStore.activeRole}
        options={rolesOptions}
        onChange={handlers.onSelectChange}
      />
    </Box>
  );
}

export default observer(ActiveRoleSelect);
