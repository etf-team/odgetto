import { useState, useEffect } from 'react';
import {
    getChallenges,
    createChallenge
} from '@/services/apiService';
import {ChallengeDTO, CreateChallengeDTO} from "@/types/api.ts";

export const useSpaceDetail = (spaceId: number) => {
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChallenges = async () => {
        try {
            setIsLoading(true);
            const data = await getChallenges(spaceId);
            setChallenges(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load challenges');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateChallenge = async (data: CreateChallengeDTO) => {
        try {
            const newChallenge = await createChallenge(spaceId, data);
            setChallenges(prev => [...prev, newChallenge]);
            return newChallenge;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create challenge');
        }
    };

    useEffect(() => {
        if (spaceId) {
            fetchChallenges();
        }
    }, [spaceId]);

    return {
        challenges,
        isLoading,
        error,
        createChallenge: handleCreateChallenge,
        refreshChallenges: fetchChallenges
    };
};
