import { memo } from 'react';
import { Helmet } from 'react-helmet';

import ChoiceBlocks from '@src/components/choice-blocks';

function MainPage() {
  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <ChoiceBlocks />
    </>
  );
}

export default memo(MainPage);
