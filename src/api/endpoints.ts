export const API_ENDPOINTS = {
  BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.smartcity.com',
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    FORGOT_USER_ID: '/auth/forgot-user-id',
    RESET_PASSWORD: '/auth/reset-password',
    LINKEDIN_AUTH: '/auth/linkedin',
    VERIFY_PHONE: '/auth/verify-phone',
  },
};
