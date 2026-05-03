export const ENV: 'production' | 'local' = 'production';

const CONFIG = {
  production: {
    BASE_URL: 'https://api.bhcjobs.com',
    STORAGE_BASE_URL: 'https://api.bhcjobs.com/storage',
  },
  local: {
    BASE_URL: 'http://localhost:5001',
    STORAGE_BASE_URL: 'http://localhost:5001/storage',
  },
};

export default CONFIG[ENV];
