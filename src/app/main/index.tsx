import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react-lite';

import ChoiceBlocksWrapper from '@src/containers/choice-blocks-wrapper';
import LoginActionsWrapper from '@src/containers/login-actions-wrapper';

import feedImg from '@src/assets/feed.jpg';
import panelImg from '@src/assets/panel.jpg';

import { Box } from '@mui/material';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Groups2Icon from '@mui/icons-material/Groups2';

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
  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <ChoiceBlocksWrapper items={choices} />
      <Box sx={{ mt: 2 }}>
        <LoginActionsWrapper />
      </Box>
    </>
  );
}

export default observer(MainPage);
