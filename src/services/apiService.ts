import axios from 'axios';
import Cookies from 'js-cookie';

import {
    UserDTO,
    SpaceDTO,
    CreateSpaceDTO,
    JoinSpaceDTO,
    ChallengeDTO,
    CreateChallengeDTO,
    ChallengeFullDTO,
    ChallengeResultDTO,
    SubmitChallengeResultDTO, Achievement
} from '@/types/api';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
            switch (response.status) {
                case 400:
                    return 'Пользователь с таким email уже существует.';
                case 401:
                    return 'Неверный логин или пароль.';
                case 422:
                    return 'Введены некорректные данные.';
                case 500:
                    return 'Внутренняя ошибка сервера. Попробуйте позже.';
                default:
                    return 'Неизвестная ошибка. Попробуйте снова.';
            }
        }
    }
    return 'Ошибка сети. Проверьте подключение к интернету.';
};

// Authentication methods remain the same...
export const registerUser = async (email: string, password: string, full_name: string) => {
    try {
        const response = await api.post('/register', { email, password, full_name });
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/token',
            new URLSearchParams({ username: email, password }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// User profile methods remain the same...
export const getUserProfile = async (): Promise<UserDTO> => {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// Spaces methods remain the same...
export const getSpaces = async (): Promise<SpaceDTO[]> => {
    try {
        const response = await api.get('/spaces');
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const createSpace = async (data: CreateSpaceDTO): Promise<SpaceDTO> => {
    try {
        const response = await api.post('/spaces', data);
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const joinSpaceByToken = async (data: JoinSpaceDTO): Promise<SpaceDTO> => {
    try {
        const response = await api.post('/spaces/join-by-token', data);
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// Achievements methods remain the same...
export const getAchievements = async (spaceId: number | '*'): Promise<Achievement[]> => {
    try {
        const response = await api.get(`/spaces/${spaceId}/achievements`);
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// Updated and new challenge methods
export const getChallenges = async (
    spaceId: number | '*',
    state?: 'SCHEDULED' | 'ACTIVE' | 'FINISHED'
): Promise<ChallengeDTO[]> => {
    try {
        const response = await api.get(`/spaces/${spaceId}/challenges`, {
            params: { state }
        });
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const createChallenge = async (
    spaceId: number,
    data: CreateChallengeDTO
): Promise<ChallengeDTO> => {
    try {
        // Clean dates by removing 'Z' suffix if present
        const cleanData = {
            ...data,
            starts_at: data.starts_at.replace('Z', ''),
            ends_at_const: data.ends_at_const.replace('Z', '')
        };
        const response = await api.post(`/spaces/${spaceId}/challenges`, cleanData);
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const updateChallenge = async (
    spaceId: number,
    challengeId: number,
    data: Partial<CreateChallengeDTO>
): Promise<ChallengeFullDTO> => {
    try {
        // Clean dates by removing 'Z' suffix if present
        const cleanData = {
            ...data,
            starts_at: data.starts_at?.replace('Z', ''),
            ends_at_const: data.ends_at_const?.replace('Z', '')
        };
        const response = await api.patch(
            `/spaces/${spaceId}/challenges/${challengeId}`,
            cleanData
        );
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getChallengeById = async (
    spaceId: number,
    challengeId: number
): Promise<ChallengeFullDTO> => {
    try {
        const response = await api.get(`/spaces/${spaceId}/challenges/${challengeId}`);
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const joinChallenge = async (
    spaceId: number,
    challengeId: number
): Promise<ChallengeFullDTO> => {
    try {
        const response = await api.post(
            `/spaces/${spaceId}/challenges/${challengeId}/members`
        );
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const submitChallengeResult = async (
    spaceId: number,
    challengeId: number,
    data: SubmitChallengeResultDTO
): Promise<ChallengeResultDTO> => {
    try {
        const response = await api.post(
            `/spaces/${spaceId}/challenges/${challengeId}/submit-result`,
            data
        );
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};
