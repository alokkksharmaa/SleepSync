import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load persisted session (keeps user logged in on refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 CLEAR ERROR (IMPORTANT)
  const clearError = () => {
    setError(null);
  };

  // 🔹 LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post('/auth/login', { email, password });

      if (res.data && res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false };
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
      return { success: false };
    }
  };

  // 🔹 REGISTER (no auto-login; user must sign in after)
  const register = async (username, email, password, confirmPassword) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post('/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      // Do not persist token/user here; require explicit login afterwards
      if (res.data && res.data.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setLoading(false);
        return { success: true, message: res.data.message };
      }

      setLoading(false);
      return { success: false };
    } catch (err) {
      console.error('REGISTER ERROR:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setLoading(false);
      setError(err.response?.data?.message || 'Register failed');
      return { success: false };
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
