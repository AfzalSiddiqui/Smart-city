import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINTS } from './endpoints';
import { APIResponse } from './types';
import { Storage } from '../utils/storage';

class APIHandler {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_ENDPOINTS.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        // Add auth token if available
        const token = await this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await Storage.getItem('auth_token');
    } catch (error) {
      return null;
    }
  }

  private handleUnauthorized(): void {
    // Handle logout or token refresh
    Storage.removeItem('auth_token');
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'An error occurred',
      };
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'An error occurred',
      };
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'An error occurred',
      };
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'An error occurred',
      };
    }
  }
}

export const apiHandler = new APIHandler();
