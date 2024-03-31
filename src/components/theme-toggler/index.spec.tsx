import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, test, expect } from 'vitest';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

import ThemeToggler from '.';

const materialTheme = materialExtendTheme();

describe('<ThemeToggler />', () => {
  test('Работает переключение темы', async () => {
    render(
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <MemoryRouter>
            <ThemeToggler />
          </MemoryRouter>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    );

    const user = userEvent.setup();

    const togglerBtn = screen.getByTestId('theme-toggler');

    const lightIcon = screen.queryByTestId('theme-light');
    const darkIcon = screen.queryByTestId('theme-dark');

    expect(lightIcon).toBeNull();
    expect(darkIcon).not.toBeNull();

    await user.click(togglerBtn);

    const lightIconAfter = screen.queryByTestId('theme-light');
    const darkIconAfter = screen.queryByTestId('theme-dark');

    expect(lightIconAfter).not.toBeNull();
    expect(darkIconAfter).toBeNull();
  });
});
