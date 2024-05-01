import { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import App from '.';

import FeedSkeleton from '@src/components/skeletons/feed-skeleton';
import PanelSkeleton from '@src/components/skeletons/panel-skeleton';
import MainSkeleton from '@src/components/skeletons/main-skeleton';
import ProfileSkeleton from '@src/components/skeletons/profile-skeleton';

import NotFoundPage from './not-found';
import Protected from '@src/containers/protected';
import StudentSkeleton from '@src/components/skeletons/student-skeleton';
import GridSkeleton from '@src/components/skeletons/feed-skeleton/grid-skeleton';
import FormSkeleton from '@src/components/skeletons/form-skeleton';
import AllowSkeleton from '@src/components/skeletons/allow-skeleton';

const LazyMain = lazy(() => import('./main'));
const LazyFeed = lazy(() => import('./feed'));
const LazyPanel = lazy(() => import('./panel'));
const LazyStudent = lazy(() => import('./student'));
const LazyProfile = lazy(() => import('./profile'));
const LazyAllow = lazy(() => import('./allow'));
const LazyRestore = lazy(() => import('./password-restore'));
const LazyNewPassword = lazy(() => import('./new-password'));

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
          <Suspense
            fallback={<ProfileSkeleton gridSkeleton={() => <GridSkeleton />} />}
          >
            <Protected redirectTo="/">
              <LazyProfile />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/allow/:id',
        element: (
          <Suspense fallback={<AllowSkeleton />}>
            <LazyAllow />
          </Suspense>
        ),
      },
      {
        path: '/password_restore',
        element: (
          <Suspense fallback={<FormSkeleton />}>
            <LazyRestore />
          </Suspense>
        ),
      },
      {
        path: '/password_restore/:id',
        element: (
          <Suspense fallback={<FormSkeleton />}>
            <LazyNewPassword />
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
