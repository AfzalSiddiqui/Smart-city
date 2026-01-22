import { apiHandler } from '../../api/handler';
import axios from 'axios';
import { Storage } from '../../utils/storage';

jest.mock('axios');
jest.mock('../../utils/storage');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('APIHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Storage.getItem as jest.Mock).mockResolvedValue(null);
  });

  describe('get', () => {
    it('should make GET request successfully', async () => {
      const mockData = { id: 1, name: 'Test' };
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: mockData }),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any);

      const result = await apiHandler.get('/test');
      expect(result.success).toBe(true);
    });

    it('should handle GET request errors', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error('Network error')),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any);

      const result = await apiHandler.get('/test');
      expect(result.success).toBe(false);
    });
  });

  describe('post', () => {
    it('should make POST request successfully', async () => {
      const mockData = { id: 1, name: 'Test' };
      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: mockData }),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any);

      const result = await apiHandler.post('/test', { name: 'Test' });
      expect(result.success).toBe(true);
    });
  });
});
