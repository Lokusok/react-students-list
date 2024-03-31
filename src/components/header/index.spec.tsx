import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

import Header from '.';

import { MemoryRouter } from 'react-router-dom';

const materialTheme = materialExtendTheme();

describe('<Header /> (Шапка)', () => {
  test('Корректно отображается', async () => {
    render(
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    );

    const titleNode = screen.getByTestId('logo');
    expect(titleNode).toHaveTextContent(/stude-list/i);
  });
});
