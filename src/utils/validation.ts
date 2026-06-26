import { Config } from '../constants';

export const Validation = {
  isEmail: (email: string): boolean => {
    return Config.EMAIL_REGEX.test(email);
  },

  isPhone: (phone: string): boolean => {
    return Config.PHONE_REGEX.test(phone);
  },

  isPasswordValid: (password: string): boolean => {
    return password.length >= Config.MIN_PASSWORD_LENGTH;
  },

  isUserIdValid: (userId: string): boolean => {
    return userId.length >= 3;
  },
};
