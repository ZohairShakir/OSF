// API Configuration
// In development, uses proxy (localhost:5000)
// In production, uses environment variable or relative paths

const getApiBaseUrl = (): string => {
  // Check if we're in production
  if (import.meta.env.PROD) {
    // In production, use environment variable or relative path
    return import.meta.env.VITE_API_URL || '/api';
  }
  // In development, use proxy (handled by Vite)
  return '/api';
};

export const API_BASE = getApiBaseUrl();
export const API_AUTH = `${API_BASE}/auth`;
export const API_PROJECTS = `${API_BASE}/projects`;
export const API_MESSAGES = `${API_BASE}/messages`;
export const API_FILES = `${API_BASE}/files`;
export const API_PUBLIC = `${API_BASE}/public`;
