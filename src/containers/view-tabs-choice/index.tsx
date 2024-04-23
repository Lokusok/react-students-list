import { observer } from 'mobx-react-lite';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';

import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TableRowsIcon from '@mui/icons-material/TableRows';

import { useStores } from '@src/hooks/use-stores';

import { TViewStrategies } from '@src/store/students/types';

function ViewTabsChoice() {
  const { studentsStore } = useStores();

  const handlers = {
    onTabChange: (value: TViewStrategies) => {
      // studentsStore.setViewStrategy(value);
      studentsStore.setParams({ viewStrategy: value });
    },
  };

  return (
    <Stack spacing={2}>
      <Tabs
        onChange={(_, v) => handlers.onTabChange(v as TViewStrategies)}
        aria-label="Выбор стратегии отображения"
        value={studentsStore.viewStrategy}
      >
        <TabList>
          <Tab value="grid">
            <ListItemDecorator>
              <ViewModuleIcon />
            </ListItemDecorator>
            Плитка
          </Tab>
          <Tab value="table">
            <ListItemDecorator>
              <TableRowsIcon />
            </ListItemDecorator>
            Таблица
          </Tab>
        </TabList>
      </Tabs>
    </Stack>
  );
}

export default observer(ViewTabsChoice);
