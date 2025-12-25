import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export const api = async (config) => {
  // Use a rest spread to capture all remaining properties into `restConfig`
  const { url, method = 'POST', data = null, ...restConfig } = config 

  try {
    // Pass `restConfig` as the third argument. This includes `headers`.
    // NOTE: This structure is correct for POST/PUT requests in Axios
    const res = await axiosInstance[method.toLowerCase()](url, data, restConfig) 

    return res.data
  } catch (error) {
    console.error('Failed:', error)
    throw error
  }
}

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  categories: {
    list: (id, lang) => `/get-categories/${id}?language=${lang}`,
  },
  placeOrder: {
    order: `/place-order?language=en`,
  },
};
