import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';
import App from '.';
import MainSkeleton from '@src/components/main-skeleton';
import PanelSkeleton from '@src/components/panel-skeleton';

const LazyMain = React.lazy(() => import('./main'));
const LazyPanel = React.lazy(() => import('./panel'));
const LazyStudent = React.lazy(() => import('./student'));

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
        path: '/panel',
        element: (
          <Suspense fallback={<PanelSkeleton />}>
            <LazyPanel />
          </Suspense>
        ),
      },
      {
        path: '/students/:id',
        element: (
          <Suspense fallback={<h3>Загрузка...</h3>}>
            <LazyStudent />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
