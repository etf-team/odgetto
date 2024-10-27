import { useState, useEffect } from 'react';
import { getSpaces, createSpace } from '@/services/apiService';
import { SpaceDTO, CreateSpaceDTO } from '@/types/api';

export const useSpaces = () => {
    const [spaces, setSpaces] = useState<SpaceDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSpaces = async () => {
        try {
            setIsLoading(true);
            const data = await getSpaces();
            setSpaces(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load spaces');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSpace = async (data: CreateSpaceDTO) => {
        try {
            const newSpace = await createSpace(data);
            setSpaces(prev => [...prev, newSpace]);
            return newSpace;
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    // Локальное удаление, так как API пока не поддерживает
    const handleDeleteSpace = async (spaceId: number) => {
        setSpaces(prev => prev.filter(space => space.id !== spaceId));
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    return {
        spaces,
        isLoading,
        error,
        createSpace: handleCreateSpace,
        deleteSpace: handleDeleteSpace,
        refreshSpaces: fetchSpaces
    };
};
