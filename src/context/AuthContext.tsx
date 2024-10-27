import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';


type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('authToken') || null);

    useEffect(() => {
        if (token) {
            Cookies.set('authToken', token, { expires: 7 });
        } else {
            Cookies.remove('authToken');
        }
    }, [token]);

    const login = (newToken: string) => setToken(newToken);
    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
