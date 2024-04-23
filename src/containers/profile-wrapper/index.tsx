import { observer } from 'mobx-react-lite';

import ProfileInfo from '@src/components/profile-info';

function ProfileWrapper() {
  return <ProfileInfo />;
}

export default observer(ProfileWrapper);
