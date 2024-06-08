import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';

export const AuthContext = createContext<{ auth: string | null; login: (email: string, password: string) => void; logout: () => void }>({
    auth: null,
    login: () => {},
    logout: () => {}
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setAuth(token);
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        const response = await axios.post<{ token: string }>('http://localhost:3000/api/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setAuth(response.data.token);
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
