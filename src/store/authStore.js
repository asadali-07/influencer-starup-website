import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  isAuthenticated: false,

  // Initialize auth state
  initAuth: () => {
    const token = Cookies.get("accessToken");
    set({ 
      accessToken: token || null,
      isAuthenticated: !!token 
    });
  },

  // Logout function
  logout: () => {
    Cookies.remove("accessToken");
    set({ 
      accessToken: null,
      isAuthenticated: false 
    });
  },

  // Check auth status
  checkAuth: () => {
    const token = Cookies.get("accessToken");
    const currentToken = get().accessToken;
    
    if (token !== currentToken) {
      set({ 
        accessToken: token || null,
        isAuthenticated: !!token 
      });
    }
  },

  // Refresh auth state (useful after login when backend only sets cookies)
  refreshAuth: () => {
    const token = Cookies.get("accessToken");
    set({ 
      accessToken: token || null,
      isAuthenticated: !!token 
    });
  }
}));