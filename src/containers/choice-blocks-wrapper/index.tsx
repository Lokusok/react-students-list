import { observer } from 'mobx-react-lite';
import { TChoiceProps } from './types';
import ChoiceBlocks from '@src/components/choice-blocks';

import { useStores } from '@src/store';

function ChoiceBlocksWrapper(props: TChoiceProps) {
  const { sessionStore } = useStores();

  const options = {
    isDisabled: !sessionStore.profile,
  };

  return <ChoiceBlocks isDisabled={options.isDisabled} items={props.items} />;
}

export default observer(ChoiceBlocksWrapper);
