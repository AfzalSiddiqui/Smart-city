import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from '../../utils/storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setItem', () => {
    it('should save item to storage', async () => {
      await Storage.setItem('test_key', 'test_value');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('test_key', 'test_value');
    });

    it('should handle errors gracefully', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      await Storage.setItem('test_key', 'test_value');
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('getItem', () => {
    it('should retrieve item from storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('test_value');
      const value = await Storage.getItem('test_key');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('test_key');
      expect(value).toBe('test_value');
    });

    it('should return null on error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      const value = await Storage.getItem('test_key');
      expect(value).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('should remove item from storage', async () => {
      await Storage.removeItem('test_key');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('test_key');
    });
  });

  describe('clear', () => {
    it('should clear all storage', async () => {
      await Storage.clear();
      expect(AsyncStorage.clear).toHaveBeenCalled();
    });
  });
});
