import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Users, FileText, CheckCircle, Calendar } from "lucide-react";

const ChallengeSidebar = ({ challengeData, remainingDays, setShowReportDialog }) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Топ участников</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...challengeData.participantsList]
                            .sort((a, b) => b.score - a.score)
                            .slice(0, 3)
                            .map((participant, index) => (
                                <div key={participant.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                                            {index + 1}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                {participant.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium">{participant.name}</p>
                                                <p className="text-sm text-gray-500">{participant.score} баллов</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-gray-400" />
                                <span>Всего участников</span>
                            </div>
                            <span className="font-medium">{challengeData.participants}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-gray-400" />
                                <span>Всего отчетов</span>
                            </div>
                            <span className="font-medium">{challengeData.reports.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gray-400" />
                                <span>Подтверждено</span>
                            </div>
                            <span className="font-medium">
                                {challengeData.reports.filter(r => r.status === 'approved').length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span>Дней до конца</span>
                            </div>
                            <span className="font-medium">{remainingDays}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Ваш прогресс</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Выполнено отчетов</span>
                                <span className="text-sm font-medium">
                                    {challengeData.reports.filter(r => r.status === 'approved').length}/30
                                </span>
                            </div>
                            <Progress
                                value={
                                    (challengeData.reports.filter(r => r.status === 'approved').length / 30) * 100
                                }
                                className="h-2"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Текущий ранг</span>
                                <span className="text-sm font-medium">
                                    {challengeData.participantsList
                                        .sort((a, b) => b.score - a.score)
                                        .findIndex(p => p.id === '1') + 1} из {challengeData.participants}
                                </span>
                            </div>
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => setShowReportDialog(true)}
                        >
                            Отправить отчет
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ChallengeSidebar;
