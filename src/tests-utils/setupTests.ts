import { beforeEach, afterEach, vitest } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vitest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vitest.fn(), // Deprecated
      removeListener: vitest.fn(), // Deprecated
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn(),
    })),
  });
});

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
