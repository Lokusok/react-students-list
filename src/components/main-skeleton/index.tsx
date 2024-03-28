import { memo } from 'react';

import ChoiceBlocks from '../choice-blocks';

function MainSkeleton() {
  const choices = Array(2).fill(null);

  return <ChoiceBlocks items={choices} />;
}

export default memo(MainSkeleton);
