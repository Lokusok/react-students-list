import { observer } from 'mobx-react-lite';

import { Pagination } from '@mui/material';

import useStores from '@src/hooks/use-stores';

function PaginationWrapper() {
  const { studentsStore } = useStores();

  const handlers = {
    onChange: (_: any, value: number) => {
      studentsStore.setParams({ page: value });
      // studentsStore.setCurrentPage(value);
    },
  };

  return (
    <Pagination
      defaultPage={studentsStore.currentPage}
      page={studentsStore.currentPage}
      count={studentsStore.totalPages}
      onChange={handlers.onChange}
      variant="outlined"
      shape="rounded"
    />
  );
}

export default observer(PaginationWrapper);
