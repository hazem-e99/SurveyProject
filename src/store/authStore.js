import { create } from 'zustand';
import { authService } from '../services/authService';

// Helper functions for localStorage
const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem('auth-storage');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading auth from localStorage:', error);
  }
  return { admin: null, token: null, isAuthenticated: false };
};

const setStoredAuth = (state) => {
  try {
    localStorage.setItem('auth-storage', JSON.stringify({
      admin: state.admin,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    }));
  } catch (error) {
    console.error('Error saving auth to localStorage:', error);
  }
};

const initialAuth = getStoredAuth();

export const useAuthStore = create((set, get) => ({
  admin: initialAuth.admin,
  token: initialAuth.token,
  isAuthenticated: initialAuth.isAuthenticated,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { admin, token } = await authService.login(email, password);
      const newState = { 
        admin, 
        token, 
        isAuthenticated: true, 
        loading: false 
      };
      set(newState);
      setStoredAuth(newState);
      return { success: true };
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false,
        isAuthenticated: false 
      });
      return { success: false, error: error.message };
    }
  },
  
  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      const newState = { 
        admin: null, 
        token: null, 
        isAuthenticated: false, 
        loading: false 
      };
      set(newState);
      setStoredAuth(newState);
    } catch (error) {
      set({ loading: false });
    }
  },
  
  clearError: () => set({ error: null }),
}));
