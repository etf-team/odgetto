import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Challenge } from '@/types/challenge.ts';

interface ChallengeDetailsProps {
    challenge: Challenge;
    isOpen: boolean;
    onClose: () => void;
}

export const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({
                                                                      challenge,
                                                                      isOpen,
                                                                      onClose
                                                                  }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{challenge.title}</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="overview">
                    <TabsList>
                        <TabsTrigger value="overview">Обзор</TabsTrigger>
                        <TabsTrigger value="participants">Участники</TabsTrigger>
                        <TabsTrigger value="reports">Отчеты</TabsTrigger>
                        {challenge.type === 'verification' && (
                            <TabsTrigger value="verification">Верификация</TabsTrigger>
                        )}
                        {challenge.type === 'voting' && (
                            <TabsTrigger value="voting">Голосование</TabsTrigger>
                        )}
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="space-y-4">
                            <p>{challenge.description}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold">Начало:</h4>
                                    <p>{new Date(challenge.startDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Окончание:</h4>
                                    <p>
                                        {challenge.isVariableEnd
                                            ? 'Переменное время окончания'
                                            : challenge.endDate
                                                ? new Date(challenge.endDate).toLocaleDateString()
                                                : 'Не определено'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="participants">
                        <div className="space-y-4">
                            {challenge.participants.map(participant => (
                                <div key={participant.id} className="flex justify-between items-center">
                                    <span>{participant.name}</span>
                                    <span>Присоединился: {new Date(participant.joinedAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="reports">
                        <div className="space-y-4">
                            {challenge.reports.map(report => (
                                <div key={report.id} className="border p-4 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                        <span>Отчет от: {new Date(report.submittedAt).toLocaleDateString()}</span>
                                        <span className="capitalize">{report.status}</span>
                                    </div>
                                    <div>Счет: {report.score}</div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
