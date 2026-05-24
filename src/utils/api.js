const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '');

export const getApiUrl = (endpoint) => {
  // ensure endpoint starts with a slash
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${formattedEndpoint}`;
};

export const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  if (path.startsWith('/uploads')) {
    return `${BACKEND_BASE_URL}${path}`;
  }
  if (path.startsWith('uploads/')) {
    return `${BACKEND_BASE_URL}/${path}`;
  }
  // Public directory or absolute paths
  if (path.startsWith('/')) {
    return path;
  }
  return path;
};
