import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';
import App from '.';

const LazyMain = React.lazy(() => import('./main'));
const LazyPanel = React.lazy(() => import('./panel'));

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<h3>Loading...</h3>}>
            <LazyMain />
          </Suspense>
        ),
      },
      {
        path: '/panel',
        element: (
          <Suspense fallback={<h3>Loading...</h3>}>
            <LazyPanel />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
