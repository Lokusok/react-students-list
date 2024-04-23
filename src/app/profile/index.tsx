import { memo } from 'react';
import { Helmet } from 'react-helmet';

function ProfilePage() {
  return (
    <div>
      <Helmet>
        <title>Профиль администратора</title>
      </Helmet>
      ProfilePage
    </div>
  );
}

export default memo(ProfilePage);
