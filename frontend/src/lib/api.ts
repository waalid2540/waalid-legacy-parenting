import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const aiCoachAPI = {
  askQuestion: (question: string, language?: string, category?: string) =>
    api.post('/ai-coach/ask', { question, language, category }),
  getHistory: () =>
    api.get('/ai-coach/history'),
};

export const communityAPI = {
  getPosts: () => api.get('/community/posts'),
  createPost: (data: { title: string; content: string }) =>
    api.post('/community/posts', data),
  addComment: (postId: string, content: string) =>
    api.post(`/community/posts/${postId}/comments`, { content }),
  toggleLike: (postId: string) =>
    api.post(`/community/posts/${postId}/like`),
};

export const feedAPI = {
  getDailyTips: () => api.get('/feed/daily-tips'),
  getTodaysTip: () => api.get('/feed/daily-tip'),
};

export const workshopAPI = {
  getWorkshops: () => api.get('/workshops'),
  getWorkshop: (id: string) => api.get(`/workshops/${id}`),
  enrollInWorkshop: (id: string) => api.post(`/workshops/${id}/enroll`),
  getMyEnrollments: () => api.get('/workshops/my/enrollments'),
};

export default api;