import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const contactApi = {
  submit: (payload) => api.post('/contact', payload).then((r) => r.data),
};

export const gemsApi = {
  list: () => api.get('/gems').then((r) => r.data),
  get: (id) => api.get(`/gems/${id}`).then((r) => r.data),
};

export const blogsApi = {
  list: () => api.get('/blogs').then((r) => r.data),
  get: (slug) => api.get(`/blogs/${slug}`).then((r) => r.data),
};
