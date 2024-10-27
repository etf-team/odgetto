import React from 'react';
import StatCard from './StatCard';
import { Trophy, Target, Award, Medal } from 'lucide-react';
import {DashboardStats} from "@/types/dashboard.ts";

interface UserStatsProps {
    stats: DashboardStats;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <StatCard
                title="Активные челленджи"
                value={stats.activeChallenges}
                icon={Target}
            />
            <StatCard
                title="Завершено"
                value={stats.completedChallenges}
                icon={Trophy}
            />
            <StatCard
                title="Баллы"
                value={stats.points}
                icon={Award}
            />
            <StatCard
                title="Достижения"
                value={stats.userAchievements}
                icon={Medal}
            />
        </div>
    );
};

export default UserStats;
