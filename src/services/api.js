const API_BASE = '/api';

const getHeaders = () => {
    const token = localStorage.getItem('truckloader-token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
};

// ========================
// AUTH
// ========================
export const authAPI = {
    register: async (userData) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST', headers: getHeaders(), body: JSON.stringify(userData),
        });
        return handleResponse(res);
    },

    login: async (email, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST', headers: getHeaders(), body: JSON.stringify({ email, password }),
        });
        return handleResponse(res);
    },

    getMe: async () => {
        const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
        return handleResponse(res);
    },
};

// ========================
// LOADS
// ========================
export const loadsAPI = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/loads?${query}`, { headers: getHeaders() });
        return handleResponse(res);
    },

    getById: async (id) => {
        const res = await fetch(`${API_BASE}/loads/${id}`, { headers: getHeaders() });
        return handleResponse(res);
    },

    create: async (loadData) => {
        const res = await fetch(`${API_BASE}/loads`, {
            method: 'POST', headers: getHeaders(), body: JSON.stringify(loadData),
        });
        return handleResponse(res);
    },

    update: async (id, data) => {
        const res = await fetch(`${API_BASE}/loads/${id}`, {
            method: 'PUT', headers: getHeaders(), body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    delete: async (id) => {
        const res = await fetch(`${API_BASE}/loads/${id}`, {
            method: 'DELETE', headers: getHeaders(),
        });
        return handleResponse(res);
    },
};

// ========================
// TRUCKS
// ========================
export const trucksAPI = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/trucks?${query}`, { headers: getHeaders() });
        return handleResponse(res);
    },

    getById: async (id) => {
        const res = await fetch(`${API_BASE}/trucks/${id}`, { headers: getHeaders() });
        return handleResponse(res);
    },

    create: async (truckData) => {
        const res = await fetch(`${API_BASE}/trucks`, {
            method: 'POST', headers: getHeaders(), body: JSON.stringify(truckData),
        });
        return handleResponse(res);
    },

    update: async (id, data) => {
        const res = await fetch(`${API_BASE}/trucks/${id}`, {
            method: 'PUT', headers: getHeaders(), body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    delete: async (id) => {
        const res = await fetch(`${API_BASE}/trucks/${id}`, {
            method: 'DELETE', headers: getHeaders(),
        });
        return handleResponse(res);
    },
};

// ========================
// BIDS
// ========================
export const bidsAPI = {
    create: async (bidData) => {
        const res = await fetch(`${API_BASE}/bids`, {
            method: 'POST', headers: getHeaders(), body: JSON.stringify(bidData),
        });
        return handleResponse(res);
    },

    getForLoad: async (loadId) => {
        const res = await fetch(`${API_BASE}/bids/load/${loadId}`, { headers: getHeaders() });
        return handleResponse(res);
    },

    getMyBids: async () => {
        const res = await fetch(`${API_BASE}/bids/my`, { headers: getHeaders() });
        return handleResponse(res);
    },

    updateStatus: async (bidId, status) => {
        const res = await fetch(`${API_BASE}/bids/${bidId}/status`, {
            method: 'PUT', headers: getHeaders(), body: JSON.stringify({ status }),
        });
        return handleResponse(res);
    },
};

// ========================
// USERS
// ========================
export const usersAPI = {
    getProfile: async (id) => {
        const res = await fetch(`${API_BASE}/users/${id}`, { headers: getHeaders() });
        return handleResponse(res);
    },

    getUserTrucks: async (id) => {
        const res = await fetch(`${API_BASE}/users/${id}/trucks`, { headers: getHeaders() });
        return handleResponse(res);
    },

    getUserLoads: async (id) => {
        const res = await fetch(`${API_BASE}/users/${id}/loads`, { headers: getHeaders() });
        return handleResponse(res);
    },

    getDashboard: async () => {
        const res = await fetch(`${API_BASE}/dashboard`, { headers: getHeaders() });
        return handleResponse(res);
    },
};
