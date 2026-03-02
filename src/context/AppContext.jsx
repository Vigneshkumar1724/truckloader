import { createContext, useContext, useReducer, useMemo, useState, useEffect } from 'react';
import { notifications as initialNotifications } from '../data/mockData';
import { authAPI } from '../services/api';

const AppContext = createContext();

const actionTypes = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
};

const initialState = {
    user: null,
    token: localStorage.getItem('truckloader-token') || null,
    notifications: initialNotifications,
};

function appReducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { ...state, user: action.payload.user, token: action.payload.token };
        case actionTypes.LOGOUT:
            return { ...state, user: null, token: null };
        case actionTypes.MARK_NOTIFICATION_READ:
            return {
                ...state,
                notifications: state.notifications.map(n =>
                    n.id === action.payload ? { ...n, read: true } : n
                ),
            };
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem('truckloader-theme') === 'dark'
    );

    // Auto-load user from stored token on mount
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('truckloader-token');
            if (!token) return;
            try {
                const user = await authAPI.getMe();
                dispatch({ type: actionTypes.SET_USER, payload: { user, token } });
            } catch {
                localStorage.removeItem('truckloader-token');
            }
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const data = await authAPI.login(email, password);
        localStorage.setItem('truckloader-token', data.token);
        dispatch({ type: actionTypes.SET_USER, payload: { user: data.user, token: data.token } });
        return data;
    };

    const register = async (userData) => {
        const data = await authAPI.register(userData);
        localStorage.setItem('truckloader-token', data.token);
        dispatch({ type: actionTypes.SET_USER, payload: { user: data.user, token: data.token } });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('truckloader-token');
        dispatch({ type: actionTypes.LOGOUT });
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const next = !prev;
            localStorage.setItem('truckloader-theme', next ? 'dark' : 'light');
            return next;
        });
    };

    const markNotificationRead = (id) => dispatch({ type: actionTypes.MARK_NOTIFICATION_READ, payload: id });

    const value = useMemo(() => ({
        ...state, darkMode, toggleDarkMode,
        login, register, logout, markNotificationRead,
        isAuthenticated: !!state.token && !!state.user,
    }), [state, darkMode]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};

export default AppContext;
