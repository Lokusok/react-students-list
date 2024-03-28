import { observer } from 'mobx-react-lite';

import { Pagination } from '@mui/material';
import studentsStore from '@src/store/students-mobx';

function PaginationWrapper() {
  const handlers = {
    onChange: (_: any, value: number) => {
      studentsStore.setCurrentPage(value);
    },
  };

  return (
    <Pagination
      defaultPage={studentsStore.currentPage}
      count={studentsStore.totalPages}
      onChange={handlers.onChange}
      variant="outlined"
      shape="rounded"
    />
  );
}

export default observer(PaginationWrapper);
