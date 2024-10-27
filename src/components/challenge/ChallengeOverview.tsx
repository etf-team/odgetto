import React from 'react';
import { Progress } from "@/components/ui/progress.tsx";
import { Users, Calendar, Trophy } from "lucide-react";

const ChallengeOverview = ({ challengeData, remainingDays }) => {
    return (
        <div className="space-y-4">
            <div className="mt-4">
                <Progress value={challengeData.progress} className="h-2" />
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>{challengeData.progress}%</span>
                    <span>Осталось {remainingDays} дней</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                        <p className="text-sm font-medium">Начало</p>
                        <p className="text-sm text-gray-500">
                            {new Date(challengeData.startDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                        <p className="text-sm font-medium">Окончание</p>
                        <p className="text-sm text-gray-500">
                            {new Date(challengeData.endDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                        <p className="text-sm font-medium">Участников</p>
                        <p className="text-sm text-gray-500">
                            {challengeData.participants}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gray-400" />
                    <div>
                        <p className="text-sm font-medium">Тип</p>
                        <p className="text-sm text-gray-500 capitalize">
                            {challengeData.type}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeOverview;
