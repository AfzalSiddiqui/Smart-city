import { useState } from 'react';
import { apiHandler } from '../../../api/handler';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { LoginRequest, AuthResponse } from '../../../api/types';
import { Storage } from '../../../utils/storage';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiHandler.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );

      if (response.success && response.data) {
        // Store auth token
        await Storage.setItem('auth_token', response.data.token);
        await Storage.setItem('user_id', response.data.userId);
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
