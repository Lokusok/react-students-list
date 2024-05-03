import { memo } from 'react';
import { Helmet } from 'react-helmet';

import ProfileWrapper from '@src/containers/profile-wrapper';

function ProfilePage() {
  return (
    <div>
      <Helmet>
        <title>Профиль администратора</title>
      </Helmet>

      <ProfileWrapper />
    </div>
  );
}

export default memo(ProfilePage);
