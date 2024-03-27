import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.scss';

import { RecoilRoot } from 'recoil';
import router from './app/router';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';

const materialTheme = materialExtendTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
    <JoyCssVarsProvider>
      <CssBaseline enableColorScheme />
      <RecoilRoot>
        <RouterProvider router={router} />
        <CssBaseline />
      </RecoilRoot>
    </JoyCssVarsProvider>
  </MaterialCssVarsProvider>
);
