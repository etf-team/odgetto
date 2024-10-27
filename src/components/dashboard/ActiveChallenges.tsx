import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChallengeDTO } from '@/types/api';

interface ActiveChallengesProps {
    challenges: ChallengeDTO[];
}

const ActiveChallenges: React.FC<ActiveChallengesProps> = ({ challenges }) => {
    const navigate = useNavigate();
    const MAX_DISPLAYED_CHALLENGES = 4;
    const hasMoreChallenges = challenges.length > MAX_DISPLAYED_CHALLENGES;

    const displayedChallenges = challenges.slice(0, MAX_DISPLAYED_CHALLENGES);

    const handleChallengeClick = (spaceId: number, challengeId: number) => {
        navigate(`/spaces/${spaceId}/challenges/${challengeId}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="space-y-4">
            <div className="hidden md:grid md:grid-cols-2 gap-4">
                {displayedChallenges.map((challenge) => (
                    <Card
                        key={challenge.id}
                        className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleChallengeClick(challenge.space_id, challenge.id)}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-left mb-1">{challenge.name}</h3>
                                <p className="text-sm text-left text-muted-foreground line-clamp-2">
                                    {challenge.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
                                {challenge.is_verification_required ?
                                    <Users className="h-4 w-4" /> :
                                    <User className="h-4 w-4" />
                                }
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Progress value={challenge.current_progress} />
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>{challenge.current_progress}%</span>
                                <span>до {formatDate(challenge.starts_at)}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="md:hidden space-y-3">
                {displayedChallenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className="bg-secondary/20 rounded-lg p-3"
                        onClick={() => handleChallengeClick(challenge.space_id, challenge.id)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-sm">{challenge.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                {challenge.is_verification_required ?
                                    <Users className="h-3 w-3" /> :
                                    <User className="h-3 w-3" />
                                }
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Progress value={challenge.current_progress} className="flex-1" />
                            <span className="text-xs whitespace-nowrap">
                                {formatDate(challenge.starts_at)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {hasMoreChallenges && (
                <div className="flex justify-end pt-2">
                    <Button
                        variant="ghost"
                        className="text-sm h-8 px-3"
                        onClick={() => navigate('/challenges')}
                    >
                        Все
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ActiveChallenges;
