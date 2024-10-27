// import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AuthCard } from '@/components/auth/AuthCard';
import { Dashboard } from '@/components/dashboard/dashboard';
import { useAuth } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';

export const LandingPage = () => {
    const { isAuthenticated } = useAuth();

    return (
        !isAuthenticated ? (
            <div className="py-8">
                <div className="grid md:grid-cols-2 gap-12 items-center main-card">
                        <HeroSection />
                        <AuthCard />
                    </div>
                </div>
            ) : (
                <UserProvider>
                    <Dashboard />
                </UserProvider>
            )
    );
};
