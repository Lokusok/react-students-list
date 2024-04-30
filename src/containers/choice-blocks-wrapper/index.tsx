import { observer } from 'mobx-react-lite';

import ChoiceBlocks from '@src/components/choice-blocks';

import useStores from '@src/hooks/use-stores';

import { TChoiceProps } from './types';

function ChoiceBlocksWrapper(props: TChoiceProps) {
  const { sessionStore } = useStores();

  const options = {
    isDisabled: !sessionStore.profile,
  };

  return <ChoiceBlocks isDisabled={options.isDisabled} items={props.items} />;
}

export default observer(ChoiceBlocksWrapper);
