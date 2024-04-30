import { observer } from 'mobx-react-lite';

import PieChartIcon from '@mui/icons-material/PieChart';
import Total from '@src/components/total';

import useStores from '@src/hooks/use-stores';
import { Box, IconButton, Tooltip } from '@mui/joy';

function TotalObserver() {
  const { studentsStore, modalsStore } = useStores();

  const callbacks = {
    openChartModal: () => modalsStore.addActiveModal('rolesCountChart'),
  };

  const handlers = {
    onShowChartBtnClick: () => callbacks.openChartModal(),
  };

  const options = {
    isShowChartBtnDisabled: Object.values(studentsStore.countRoles).every(
      (value) => !Boolean(value)
    ),
  };

  const renders = {
    totalFooter: () => {
      return (
        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Tooltip title="Показать график">
            <IconButton
              disabled={options.isShowChartBtnDisabled}
              onClick={handlers.onShowChartBtnClick}
              variant="soft"
            >
              <PieChartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  };

  return (
    <>
      <Total
        totals={studentsStore.countRoles}
        renderFooter={renders.totalFooter}
      />
    </>
  );
}

export default observer(TotalObserver);
