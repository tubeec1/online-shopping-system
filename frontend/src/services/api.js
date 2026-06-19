import axios from "axios";

// Base URL configuration
const API_URL = "http://localhost/Online%20Shopping%20System/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const { token, refresh_token } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refresh_token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// ==================== AUTH APIs ====================
export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  refresh: () => api.post("/auth/refresh"),
};

// ==================== PRODUCT APIs ====================
export const productAPI = {
  getAll: (page = 1, per_page = 12, category_id = null) => {
    let url = `/products?page=${page}&per_page=${per_page}`;
    if (category_id) {
      url += `&category_id=${category_id}`;
    }
    return api.get(url);
  },
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getFeatured: (limit = 6) => api.get(`/products/featured?limit=${limit}`),
  search: (query, page = 1) =>
    api.get(`/products/search?query=${query}&page=${page}`),
};

// ==================== CATEGORY APIs ====================
export const categoryAPI = {
  getAll: () => api.get("/categories"),
  create: (data) => api.post("/categories", data),
};

// ==================== CART APIs ====================
export const cartAPI = {
  get: () => api.get("/cart"),
  add: (product_id, quantity, variant_id = null) =>
    api.post("/cart/add", { product_id, quantity, variant_id }),
  update: (product_id, quantity) =>
    api.put(`/cart/${product_id}`, { quantity }),
  remove: (product_id) => api.delete(`/cart/${product_id}`),
  clear: () => api.delete("/cart"),
};

// ==================== ORDER APIs ====================
export const orderAPI = {
  getAll: (page = 1, per_page = 10) =>
    api.get(`/orders?page=${page}&per_page=${per_page}`),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post("/orders", data),
  updateStatus: (id, status) => api.put(`/orders/${id}`, { status }),
  track: (id) => api.get(`/orders/track/${id}`),
  getAllAdmin: (page = 1, per_page = 15) =>
    api.get(`/orders/admin/all?page=${page}&per_page=${per_page}`),
};

// ==================== PAYMENT APIs ====================
export const paymentAPI = {
  verify: (order_id) => api.post("/payments/verify", { order_id }),
  getStatus: (order_id) => api.get(`/payments/order/${order_id}`),
  manualVerify: (payment_id) =>
    api.post("/payments/manual-verify", { payment_id }),
};

// ==================== USER APIs ====================
export const userAPI = {
  getAll: (page = 1, per_page = 10) =>
    api.get(`/users?page=${page}&per_page=${per_page}`),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
};

// ==================== WISHLIST APIs ====================
export const wishlistAPI = {
  get: () => api.get("/wishlist"),
  add: (product_id) => api.post("/wishlist/add", { product_id }),
  remove: (product_id) => api.delete(`/wishlist/${product_id}`),
};

// ==================== ADMIN APIs ====================
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard/stats"),
  getInventory: (page = 1, per_page = 20) =>
    api.get(`/admin/inventory?page=${page}&per_page=${per_page}`),
  getSalesReport: () => api.get("/admin/sales-report"),
  addStaff: (data) => api.post("/admin/staff", data),
  getStaff: () => api.get("/admin/staff"),
};

// Default export
export default api;
