import { observer } from 'mobx-react-lite';

type TProps = {
  onClose: () => void;
};

function ChangeAgreeModal(props: TProps) {
  const { onClose } = props;

  return <div>ChangeAgreeModal</div>;
}

export default observer(ChangeAgreeModal);
