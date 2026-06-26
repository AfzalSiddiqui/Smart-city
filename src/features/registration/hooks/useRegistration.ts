import { useState } from 'react';
import { apiHandler } from '../../../api/handler';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { RegisterRequest, AuthResponse } from '../../../api/types';
import { Storage } from '../../../utils/storage';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiHandler.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
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
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
