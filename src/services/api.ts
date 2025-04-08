
import { Goal, FinancialTransaction, User, Course, Account } from '../models/schema';

// Base URL for API calls
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

// Utility to handle API calls
async function callApi<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  data?: any
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) => 
    callApi<{ user: User, token: string }>('/auth/login', 'POST', { email, password }),
  
  register: (email: string, password: string, companyName: string) => 
    callApi<{ user: User, token: string }>('/auth/register', 'POST', { email, password, companyName }),
  
  logout: () => 
    callApi<void>('/auth/logout', 'POST'),
  
  forgotPassword: (email: string) => 
    callApi<void>('/auth/forgot-password', 'POST', { email }),
  
  resetPassword: (token: string, password: string) => 
    callApi<void>('/auth/reset-password', 'POST', { token, password }),
};

// Goals API
export const goalsApi = {
  getAll: () => 
    callApi<Goal[]>('/goals'),
  
  getById: (id: string) => 
    callApi<Goal>(`/goals/${id}`),
  
  create: (goal: Omit<Goal, 'id' | 'userId' | 'createdAt'>) => 
    callApi<Goal>('/goals', 'POST', goal),
  
  update: (id: string, goal: Partial<Goal>) => 
    callApi<Goal>(`/goals/${id}`, 'PUT', goal),
  
  delete: (id: string) => 
    callApi<void>(`/goals/${id}`, 'DELETE'),
};

// Financial API
export const financialApi = {
  getTransactions: (filters?: { 
    startDate?: string, 
    endDate?: string, 
    type?: string, 
    category?: string 
  }) => {
    const queryParams = new URLSearchParams();
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.category) queryParams.append('category', filters.category);
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return callApi<FinancialTransaction[]>(`/financial/transactions${queryString}`);
  },
  
  createTransaction: (transaction: Omit<FinancialTransaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => 
    callApi<FinancialTransaction>('/financial/transactions', 'POST', transaction),
  
  updateTransaction: (id: number, transaction: Partial<FinancialTransaction>) => 
    callApi<FinancialTransaction>(`/financial/transactions/${id}`, 'PUT', transaction),
  
  deleteTransaction: (id: number) => 
    callApi<void>(`/financial/transactions/${id}`, 'DELETE'),
  
  getAccounts: () => 
    callApi<Account[]>('/financial/accounts'),
  
  createAccount: (account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => 
    callApi<Account>('/financial/accounts', 'POST', account),
  
  getSummary: (period?: 'day' | 'week' | 'month' | 'year') => {
    const queryParams = period ? `?period=${period}` : '';
    return callApi<{
      totalIncome: number;
      totalExpense: number;
      balance: number;
      categories: { name: string; amount: number }[];
    }>(`/financial/summary${queryParams}`);
  },
};

// Courses API
export const coursesApi = {
  getAll: () => 
    callApi<Course[]>('/courses'),
  
  getById: (id: number) => 
    callApi<Course>(`/courses/${id}`),
  
  getLessons: (courseId: number) => 
    callApi<Course>(`/courses/${courseId}/lessons`),
  
  updateProgress: (courseId: number, lessonId: number, completed: boolean) => 
    callApi<void>(`/courses/${courseId}/progress`, 'POST', { lessonId, completed }),
  
  getProgress: () => 
    callApi<{ courseId: number; progress: number; completed: boolean }[]>('/user/progress'),
};

// Subscription API
export const subscriptionApi = {
  getCurrentPlan: () => 
    callApi<{ plan: string; expiresAt: string | null }>('/subscription/current'),
  
  changePlan: (planId: string) => 
    callApi<void>('/subscription/change', 'POST', { planId }),
  
  cancelSubscription: () => 
    callApi<void>('/subscription/cancel', 'POST'),
};

// User API
export const userApi = {
  getProfile: () => 
    callApi<User>('/user/profile'),
  
  updateProfile: (data: Partial<User>) => 
    callApi<User>('/user/profile', 'PUT', data),
  
  updateSettings: (settings: Partial<{
    language: string;
    darkMode: boolean;
    currency: string;
    fontSize: string;
    notificationsEnabled: boolean;
    emailNotifications: boolean;
    timezone: string;
  }>) => callApi<void>('/user/settings', 'PUT', settings),
  
  getSettings: () => 
    callApi<{
      language: string;
      darkMode: boolean;
      currency: string;
      fontSize: string;
      notificationsEnabled: boolean;
      emailNotifications: boolean;
      timezone: string;
    }>('/user/settings'),
};

// Export a default API object with all services
const api = {
  auth: authApi,
  goals: goalsApi,
  financial: financialApi,
  courses: coursesApi,
  subscription: subscriptionApi,
  user: userApi,
};

export default api;
