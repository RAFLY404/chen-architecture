const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '');

const PUBLIC_ROUTE_BY_SETTING_PATH = {
  '/projects': '/project',
  '/project': '/project',
  '/whats-on': "/what's on",
  "/what's on": "/what's on",
  '/about': '/about us',
  '/about-us': '/about us',
  '/about us': '/about us',
  '/contact': '/contact us',
  '/contact-us': '/contact us',
  '/contact us': '/contact us',
};

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

export const fetchJson = async (endpoint) => {
  const response = await fetch(getApiUrl(endpoint));
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
};

export const normalizePublicPath = (path) => {
  if (!path) return '/';
  const lowerPath = decodeURIComponent(path).toLowerCase();
  return PUBLIC_ROUTE_BY_SETTING_PATH[lowerPath] || path;
};

export const normalizeNavItems = (navLabels) => {
  const fallback = [
    { label: 'Project', path: '/project' },
    { label: "What's On", path: "/what's on" },
    { label: 'About Us', path: '/about us' },
    { label: 'Contact Us', path: '/contact us' },
  ];

  if (!Array.isArray(navLabels) || navLabels.length === 0) return fallback;
  return navLabels.map((item) => ({
    label: item.label,
    path: normalizePublicPath(item.path),
  }));
};
