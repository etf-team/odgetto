import React from 'react';
import { useDashboardData } from '@/context/DashboardContext';
import { DashboardStats } from "@/types/dashboard.ts";
import ActiveChallenges from './ActiveChallenges';
import UserStats from './UserStats';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Dashboard = () => {
    const { isLoading, challenges, achievements, userProfile, error } = useDashboardData();
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    const dashboardStats: DashboardStats = {
        activeChallenges: challenges.filter(c => c.state === 'ACTIVE').length,
        completedChallenges: challenges.filter(c => c.state === 'FINISHED').length,
        userAchievements: userProfile?.achievements_assignations.length || 0,
        allAchievements: achievements,
        points: challenges.reduce((sum, challenge) => sum + (challenge.current_progress || 0), 0)
    };

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">
                Добро пожаловать, {userProfile?.full_name}!
            </h1>

            <UserStats stats={dashboardStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Активные челленджи</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ActiveChallenges
                                challenges={challenges.filter(c => c.state === 'ACTIVE')}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:block">
                    <Card className="lg:mb-6">
                        <CardHeader>
                            <CardTitle>Календарь событий</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="w-full max-w-full flex flex-wrap justify-center"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Достижения</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {userProfile?.achievements_assignations.map((achievement, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-sm md:text-base"
                                    >
                                        {dashboardStats.allAchievements.find(achieve =>
                                           achievement.id == achieve.id )?.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
