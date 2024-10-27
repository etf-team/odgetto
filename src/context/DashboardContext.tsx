import { useState, useEffect } from 'react';
import {getAchievements, getChallenges, getUserProfile} from '@/services/apiService';
import {Achievement, ChallengeDTO, UserDTO} from '@/types/api';

export const useDashboardData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [userProfile, setUserProfile] = useState<UserDTO | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const [activeChallenges,  allAchievements, profile] = [
                    await getChallenges('*'),
                    await getAchievements("*"),
                    await getUserProfile()
                ];

                setChallenges(activeChallenges);
                setAchievements(allAchievements);
                setUserProfile(profile);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return { isLoading, challenges, achievements, userProfile, error };
};
