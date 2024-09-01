import '@testing-library/jest-dom';

globalThis.import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:4000',
    },
  },
};