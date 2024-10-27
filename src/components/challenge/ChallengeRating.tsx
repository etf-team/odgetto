import React from 'react';
import { Card, CardContent } from "@/components/ui/card.tsx";

const ChallengeRating = ({ participants }) => {
    return (
        <div className="space-y-4">
            {[...participants]
                .sort((a, b) => b.score - a.score)
                .map((participant, index) => (
                    <Card key={participant.id}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            {participant.avatar}
                                        </div>
                                        <p className="font-medium">{participant.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{participant.score}</p>
                                    <p className="text-sm text-gray-500">баллов</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
};

export default ChallengeRating;
