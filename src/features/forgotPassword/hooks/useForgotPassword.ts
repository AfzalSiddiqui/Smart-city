import { useState } from 'react';
import { apiHandler } from '../../../api/handler';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { ForgotPasswordRequest, ForgotUserIdRequest } from '../../../api/types';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (data: ForgotPasswordRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiHandler.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        data
      );

      if (response.success) {
        setSuccess(true);
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reset password';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const recoverUserId = async (data: ForgotUserIdRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiHandler.post(
        API_ENDPOINTS.AUTH.FORGOT_USER_ID,
        data
      );

      if (response.success) {
        setSuccess(true);
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to recover user ID';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, recoverUserId, loading, error, success };
};
