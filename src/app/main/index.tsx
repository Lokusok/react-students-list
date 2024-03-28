import { memo } from 'react';
import { Helmet } from 'react-helmet';

import ChoiceBlocks from '@src/components/choice-blocks';

import feedImg from '@src/assets/feed.jpg';
import panelImg from '@src/assets/panel.jpg';

import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Groups2Icon from '@mui/icons-material/Groups2';

function MainPage() {
  const choices = [
    {
      title: 'Лента студентов',
      imgSrc: feedImg,
      renderIcon: (width: number, height: number) => (
        <DynamicFeedIcon sx={{ width, height }} />
      ),
      href: '/feed',
    },

    {
      title: 'Панель управления',
      imgSrc: panelImg,
      renderIcon: (width: number, height: number) => (
        <Groups2Icon sx={{ width, height }} />
      ),
      href: '/panel',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <ChoiceBlocks items={choices} />
    </>
  );
}

export default memo(MainPage);
