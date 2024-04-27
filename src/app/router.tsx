import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import App from '.';

import FeedSkeleton from '@src/components/skeletons/feed-skeleton';
import PanelSkeleton from '@src/components/skeletons/panel-skeleton';
import MainSkeleton from '@src/components/skeletons/main-skeleton';

import NotFoundPage from './not-found';
import Protected from '@src/containers/protected';
import StudentSkeleton from '@src/components/skeletons/student-skeleton';

const LazyMain = React.lazy(() => import('./main'));
const LazyFeed = React.lazy(() => import('./feed'));
const LazyPanel = React.lazy(() => import('./panel'));
const LazyStudent = React.lazy(() => import('./student'));
const LazyProfile = React.lazy(() => import('./profile'));
const LazyAllow = React.lazy(() => import('./allow'));

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<MainSkeleton />}>
            <LazyMain />
          </Suspense>
        ),
      },
      {
        path: '/feed',
        element: (
          <Suspense fallback={<FeedSkeleton />}>
            <Protected redirectTo="/">
              <LazyFeed />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/panel',
        element: (
          <Suspense fallback={<PanelSkeleton />}>
            <Protected redirectTo="/">
              <LazyPanel />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/students/:id',
        element: (
          <Suspense fallback={<StudentSkeleton />}>
            <Protected redirectTo="/">
              <LazyStudent />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<h3>Загрузка...</h3>}>
            <Protected redirectTo="/">
              <LazyProfile />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/allow/:id',
        element: (
          <Suspense fallback={<h3>Загрузка...</h3>}>
            <LazyAllow />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
