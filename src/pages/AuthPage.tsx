import { HeroSection } from '@/components/landing/HeroSection';
import { AuthCard } from '@/components/auth/AuthCard';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export const AuthPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center main-card">
                <HeroSection />
                <AuthCard />
            </div>
        </div>
    );
};
