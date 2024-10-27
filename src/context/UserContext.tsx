import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '@/services/apiService';
import type { UserDTO } from '@/types/api';

interface UserContextType {
    user: UserDTO | null;
    isLoading: boolean;
    error: string | null;
    refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            const data = await getUserProfile();
            setUser(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load user profile');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoading,
                error,
                refetchUser: fetchUserProfile
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
