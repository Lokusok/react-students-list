import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://react-students-list.vercel.app/',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  env: {
    login: 'supersecureemail@gmail.com',
    password: 'securitypassword12345@',
  },
});
