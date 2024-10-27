import { useState, useEffect } from 'react';
import {
    getChallengeById,
    updateChallenge,
    submitChallengeResult,
    joinChallenge
} from '@/services/apiService';
import type {
    ChallengeFullDTO,
    CreateChallengeDTO,
    SubmitChallengeResultDTO,
} from '@/types/api';

export const useChallenge = (spaceId: number, challengeId: number) => {
    const [challenge, setChallenge] = useState<ChallengeFullDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChallenge = async () => {
        try {
            setIsLoading(true);
            const data = await getChallengeById(spaceId, challengeId);
            setChallenge(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load challenge');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateChallenge = async (data: Partial<CreateChallengeDTO>) => {
        try {
            const updatedChallenge = await updateChallenge(spaceId, challengeId, data);
            setChallenge(updatedChallenge);
            return updatedChallenge;
        } catch (err) {
            throw err;
        }
    };

    const handleJoinChallenge = async () => {
        try {
            const updatedChallenge = await joinChallenge(spaceId, challengeId);
            setChallenge(updatedChallenge);
            return updatedChallenge;
        } catch (err) {
            throw err;
        }
    };

    const handleSubmitResult = async (data: SubmitChallengeResultDTO) => {
        try {
            const result = await submitChallengeResult(spaceId, challengeId, data);
            await fetchChallenge(); // Обновляем данные челленджа после отправки результата
            return result;
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (spaceId && challengeId) {
            fetchChallenge();
        }
    }, [spaceId, challengeId]);

    return {
        challenge,
        isLoading,
        error,
        updateChallenge: handleUpdateChallenge,
        joinChallenge: handleJoinChallenge,
        submitResult: handleSubmitResult,
        refreshChallenge: fetchChallenge
    };
};
