import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChallenge } from '@/context/ChallengeContext.tsx';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
    Users, Target,
    Calendar, Edit, ArrowLeft, Award, CheckCircle2
} from 'lucide-react';
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useUser} from "@/context/UserContext.tsx";
import {getStatusColor, getStatusLabel} from "@/lib/utils.ts";

export const ChallengePage = () => {
    const navigate = useNavigate();
    const { spaceId, challengeId } = useParams<{ spaceId: string; challengeId: string }>();
    const { user } = useUser();
    const {
        challenge,
        isLoading,
        error,
        joinChallenge,
        submitResult
    } = useChallenge(Number(spaceId), Number(challengeId));

    const [isEditMode, setIsEditMode] = useState(false);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [resultValue, setResultValue] = useState<number>(0);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
    }

    if (error || !challenge) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error || 'Челлендж не найден'}</AlertDescription>
            </Alert>
        );
    }

    const currentUserMember = challenge?.members.find(member => member.user.id === user?.id);
    const isAdmin = currentUserMember?.is_administrator;
    const isParticipant = currentUserMember?.is_participant;
    // const isReferee = currentUserMember?.is_referee;

    const handleJoin = async () => {
        try {
            await joinChallenge();
        } catch (error) {
            console.error('Failed to join challenge:', error);
        }
    };

    const handleSubmitResult = async () => {
        try {
            await submitResult({ submitted_value: resultValue });
            setSubmitModalOpen(false);
            setResultValue(0);
        } catch (error) {
            console.error('Failed to submit result:', error);
        }
    };

    const getStatusBadge = () => {
        return (
            <Badge className={getStatusColor[challenge.state]}>
                {getStatusLabel[challenge.state]}
            </Badge>
        );
    };

    return (
        <div className="py-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="mb-4"
                        onClick={() => navigate(`/spaces/${spaceId}`)}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Назад к пространству
                    </Button>

                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-bold">{challenge.name}</h1>
                                {getStatusBadge()}
                            </div>
                            <p className="text-gray-600 text-left">{challenge.description}</p>
                        </div>
                        <div className="flex gap-2">
                            {isAdmin && challenge.state !== 'FINISHED' && (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditMode(true)}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Редактировать
                                </Button>
                            )}
                            {!isParticipant && challenge.state === 'ACTIVE' && (
                                <Button onClick={handleJoin}>
                                    Присоединиться
                                </Button>
                            )}
                            {isParticipant && challenge.state === 'ACTIVE' && (
                                <Button className="text-black" onClick={() => setSubmitModalOpen(true)}>
                                    Отправить результат
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Left column - Challenge details */}
                    <div className="col-span-2 space-y-6">
                        {/* Challenge Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Информация о челлендже</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {challenge.prize && (
                                    <div className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-yellow-500" />
                                        <div>
                                            <div className="font-semibold text-left">Приз</div>
                                            <div className="text-left">{challenge.prize}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <div>
                                        <div className="font-semibold text-left">Период проведения</div>
                                        <div>
                                            {format(new Date(challenge.starts_at), 'dd MMMM yyyy', { locale: ru })} -{' '}
                                            {format(new Date(challenge.ends_at_const!), 'dd MMMM yyyy', { locale: ru })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    <div>
                                        <div className="font-semibold text-left">Условия победы</div>
                                        <div>
                                            {challenge.prize_determination_fn === 'HIGHER_THAN' &&
                                                `Набрать более ${challenge.prize_determination_argument} очков`}
                                            {challenge.prize_determination_fn === 'LESS_THAN' &&
                                                `Набрать менее ${challenge.prize_determination_argument} очков`}
                                            {challenge.prize_determination_fn === 'HEAD' &&
                                                `Попасть в топ-${challenge.prize_determination_argument} участников`}
                                            {challenge.prize_determination_fn === 'TAIL' &&
                                                `Быть в последних ${challenge.prize_determination_argument} участниках`}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    <div>
                                        <div className="font-semibold text-left">Требования</div>
                                        <div className="flex gap-2">
                                            {challenge.is_verification_required && (
                                                <Badge variant="outline">Требуется верификация</Badge>
                                            )}
                                            {challenge.is_estimation_required && (
                                                <Badge variant="outline">Требуется оценка</Badge>
                                            )}
                                            {!challenge.is_estimation_required && !challenge.is_verification_required && (
                                                <Badge variant="outline">Нет</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Результаты участников</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {challenge.members
                                        .filter(member => member.is_participant)
                                        .map(member => {
                                            const memberResults = challenge.active_results?.filter(
                                                result => result.member_id === member.id
                                            ) || [];

                                            return (
                                                <div
                                                    key={member.id}
                                                    className="flex flex-col p-4 border rounded-lg"
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar>
                                                                <AvatarFallback>
                                                                    {member.user.full_name.slice(0, 2).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-semibold text-left">
                                                                    {member.user.full_name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    Присоединился {format(
                                                                    new Date(member.created_at),
                                                                    'dd MMMM yyyy',
                                                                    { locale: ru }
                                                                )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Всего результатов: {memberResults.length}
                                                        </div>
                                                    </div>

                                                    {memberResults.length > 0 ? (
                                                        <div className="space-y-2 pl-14">
                                                            {memberResults.map((result, index) => (
                                                                <div
                                                                    key={result.id}
                                                                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                                                >
                                                                    <div className="text-sm text-gray-600">
                                                                        Результат #{index + 1}
                                                                    </div>
                                                                    <div className="flex items-center gap-6">
                                                                        <div className="space-y-1 text-right">
                                                                            <div className="font-medium">
                                                                                {result.submitted_value}
                                                                            </div>
                                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                                {challenge.is_verification_required && (
                                                                                    <div className="flex items-center gap-1">
                                                                                        <CheckCircle2 className="h-4 w-4" />
                                                                                        {result.verification_value !== null
                                                                                            ? `Верификация: ${result.verification_value}`
                                                                                            : 'Ожидает верификации'
                                                                                        }
                                                                                    </div>
                                                                                )}
                                                                                {challenge.is_estimation_required && (
                                                                                    <div className="flex items-center gap-1">
                                                                                        <Target className="h-4 w-4" />
                                                                                        {result.estimation_value !== null
                                                                                            ? `Оценка: ${result.estimation_value}`
                                                                                            : 'Ожидает оценки'
                                                                                        }
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-gray-500 pl-14">
                                                            Нет результатов
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    {challenge.members.filter(member => member.is_participant).length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            Пока нет участников
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column - Members */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>Участники</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {challenge.members.map(member => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {member.user.full_name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-left">
                                                    {member.user.full_name}
                                                </div>
                                                <div className="flex gap-1">
                                                    {member.is_administrator && (
                                                        <Badge variant="secondary">Админ</Badge>
                                                    )}
                                                    {member.is_referee && (
                                                        <Badge variant="outline">Судья</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Submit Result Dialog */}
            <Dialog open={submitModalOpen} onOpenChange={setSubmitModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Отправка результата</DialogTitle>
                        <DialogDescription>
                            Введите ваш результат для челленджа
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="result">Результат</Label>
                            <Input
                                id="result"
                                type="number"
                                value={resultValue}
                                onChange={(e) => setResultValue(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSubmitModalOpen(false)}>
                            Отмена
                        </Button>
                        <Button className="text-black" onClick={handleSubmitResult}>
                            Отправить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Challenge Dialog */}
            <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Редактирование челленджа</DialogTitle>
                    </DialogHeader>
                    {/* TODO: Add edit form similar to create form */}
                </DialogContent>
            </Dialog>
        </div>
    );
};
