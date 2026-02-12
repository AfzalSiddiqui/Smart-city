import { Validation } from '../../utils/validation';

describe('Validation', () => {
  describe('isEmail', () => {
    it('should return true for valid email', () => {
      expect(Validation.isEmail('test@example.com')).toBe(true);
      expect(Validation.isEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(Validation.isEmail('invalid-email')).toBe(false);
      expect(Validation.isEmail('test@')).toBe(false);
      expect(Validation.isEmail('@example.com')).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('should return true for valid phone numbers', () => {
      expect(Validation.isPhone('1234567890')).toBe(true);
      expect(Validation.isPhone('+1234567890')).toBe(true);
      expect(Validation.isPhone('(123) 456-7890')).toBe(true);
    });

    it('should return false for invalid phone numbers', () => {
      expect(Validation.isPhone('123')).toBe(false);
      expect(Validation.isPhone('abc')).toBe(false);
    });
  });

  describe('isPasswordValid', () => {
    it('should return true for valid password', () => {
      expect(Validation.isPasswordValid('password123')).toBe(true);
      expect(Validation.isPasswordValid('12345678')).toBe(true);
    });

    it('should return false for short password', () => {
      expect(Validation.isPasswordValid('short')).toBe(false);
      expect(Validation.isPasswordValid('1234567')).toBe(false);
    });
  });

  describe('isUserIdValid', () => {
    it('should return true for valid user ID', () => {
      expect(Validation.isUserIdValid('user123')).toBe(true);
      expect(Validation.isUserIdValid('abc')).toBe(true);
    });

    it('should return false for short user ID', () => {
      expect(Validation.isUserIdValid('ab')).toBe(false);
      expect(Validation.isUserIdValid('')).toBe(false);
    });
  });
});
