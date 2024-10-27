import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AuthPage } from '../pages/AuthPage';
import { Dashboard } from '../components/dashboard/Dashboard';
import { AboutPage } from '../pages/AboutPage';
import { SpacesPage } from '../pages/SpacesPage';
import { ChallengePage } from '../pages/ChallengePage';
import { ProfilePage } from "@/pages/ProfilePage.tsx";
import { SpaceDetailPage } from "@/pages/SpaceDetailPage.tsx";

import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <AuthPage />
            },
            {
                path: "/auth",
                element: <AuthPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: "/spaces",
                element: (
                    <ProtectedRoute>
                        <SpacesPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/spaces/:spaceId/challenges/:challengeId",
                element: (
                    <ProtectedRoute>
                        <ChallengePage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/spaces/:spaceId",
                element: (
                    <ProtectedRoute>
                        <SpaceDetailPage/>
                    </ProtectedRoute>
                )
            }
        ]
    }
]);
