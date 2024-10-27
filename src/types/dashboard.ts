import {Achievement} from "@/types/api";

export interface DashboardStats {
    activeChallenges: number;
    completedChallenges: number;
    userAchievements: number;
    allAchievements: Achievement[];
    points: number;
}
