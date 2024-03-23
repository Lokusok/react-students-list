import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.scss';

import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';
import router from './app/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={router} />
    <CssBaseline />
  </RecoilRoot>
);
