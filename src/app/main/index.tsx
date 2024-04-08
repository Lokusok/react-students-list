import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react-lite';

import ChoiceBlocksWrapper from '@src/containers/choice-blocks-wrapper';
import LoginActions from '@src/components/login-actions';

import feedImg from '@src/assets/feed.jpg';
import panelImg from '@src/assets/panel.jpg';

import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Groups2Icon from '@mui/icons-material/Groups2';
import { Box } from '@mui/material';

import { useStores } from '@src/store';

const choices = [
  {
    title: 'Лента студентов',
    imgSrc: feedImg,
    renderIcon: (width: number, height: number) => (
      <DynamicFeedIcon sx={{ width, height, color: '#fff' }} />
    ),
    href: '/feed',
  },

  {
    title: 'Панель управления',
    imgSrc: panelImg,
    renderIcon: (width: number, height: number) => (
      <Groups2Icon sx={{ width, height, color: '#fff' }} />
    ),
    href: '/panel',
  },
];

function MainPage() {
  const { modalsStore, sessionStore } = useStores();

  const callbacks = {
    showLoginModal: () => modalsStore.addActiveModal('login'),
    showRegisterModal: () => modalsStore.addActiveModal('register'),
  };

  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <ChoiceBlocksWrapper items={choices} />
      <Box sx={{ mt: 2 }}>
        <LoginActions
          onLoginClick={callbacks.showLoginModal}
          onRegisterClick={callbacks.showRegisterModal}
          isLogined={Boolean(sessionStore.profile)}
        />
      </Box>
    </>
  );
}

export default observer(MainPage);
