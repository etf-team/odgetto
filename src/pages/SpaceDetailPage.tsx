import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpaces } from '@/context/SpacesContext';
import { useSpaceDetail } from '@/context/SpaceDetailContext';
import { PlusCircle, Trophy, Users, Target, CalendarDays, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChallengeDTO, CreateChallengeDTO } from "@/types/api.ts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

const StatCard = ({ icon: Icon, title, value }) => (
    <Card className="flex items-center p-4 gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    </Card>
);

const ChallengeCard = ({ challenge, onClick }) => {
    return (
        <Card
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={onClick}
        >
            <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{challenge.name}</h3>
                            <Badge className={getStatusColor[challenge.state]}>
                                {getStatusLabel[challenge.state]}
                            </Badge>
                        </div>
                        <p className="text-sm text-left text-muted-foreground line-clamp-2 mb-4">
                            {challenge.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {challenge.is_verification_required && (
                                <Badge variant="outline" className="gap-1">
                                    <Users className="h-3 w-3" />
                                    Верификация
                                </Badge>
                            )}
                            {challenge.is_estimation_required && (
                                <Badge variant="outline" className="gap-1">
                                    <Target className="h-3 w-3" />
                                    Оценка
                                </Badge>
                            )}
                            {challenge.prize && (
                                <Badge variant="outline" className="gap-1">
                                    <Trophy className="h-3 w-3" />
                                    {challenge.prize}
                                </Badge>
                            )}
                        </div>
                    </div>
                    {challenge.current_progress === 100 && (
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-medium">{challenge.current_progress}%</span>
                            <Progress value={challenge.current_progress} className="w-20" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export const SpaceDetailPage = () => {
    const navigate = useNavigate();
    const { spaceId } = useParams();
    const { spaces } = useSpaces();
    const { challenges, createChallenge } = useSpaceDetail(Number(spaceId));
    const space = spaces.find(s => s.id === Number(spaceId));

    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
    const [createChallengeForm, setCreateChallengeForm] = useState<CreateChallengeDTO>({
        active_results: undefined,
        name: '',
        description: '',
        prize: '',
        achievement_id: null,
        is_verification_required: false,
        is_estimation_required: false,
        starts_at: new Date().toISOString(),
        ends_at_const: new Date().toISOString(),
        ends_at_determination_fn: 'HIGHER_THAN',
        ends_at_determination_argument: 100,
        results_aggregation_strategy: 'SUM',
        prize_determination_fn: 'HIGHER_THAN',
        prize_determination_argument: 0
    });

    const handleCopyInvite = () => {
        navigator.clipboard.writeText(space?.invitation_token || '');
    };

    const handleCreateChallenge = async () => {
        try {
            createChallengeForm.starts_at = createChallengeForm.starts_at.replace("Z", "")
            createChallengeForm.ends_at_const = createChallengeForm.ends_at_const.replace("Z", "")

            await createChallenge(createChallengeForm);
            setIsCreateChallengeOpen(false);
            setCreateChallengeForm({
                name: '',
                description: '',
                prize: '',
                achievement_id: null,
                is_verification_required: false,
                is_estimation_required: false,
                starts_at: new Date().toISOString(),
                ends_at_const: new Date().toISOString(),
                ends_at_determination_fn: 'HIGHER_THAN',
                ends_at_determination_argument: 100,
                results_aggregation_strategy: 'SUM',
                prize_determination_fn: 'HIGHER_THAN',
                prize_determination_argument: 0
            });
        } catch (error) {
            console.error('Failed to create challenge:', error);
        }
    };

    if (!space) return null;

    const activeChallenges = challenges.filter(c => c.state === 'ACTIVE');
    const scheduledChallenges = challenges.filter(c => c.state === 'SCHEDULED');
    const finishedChallenges = challenges.filter(c => c.state === 'FINISHED');

    const renderChallengesGrid = (challenges: ChallengeDTO[]) => (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {challenges.map((challenge) => (
                <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onClick={() => navigate(`/spaces/${spaceId}/challenges/${challenge.id}`)}
                />
            ))}
        </div>
    );

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{space.name}</h1>
                        <p className="text-muted-foreground mt-1 text-left">{space.description}</p>
                    </div>
                    <Button variant="outline" onClick={handleCopyInvite}>
                        <Copy className="h-4 w-4 mr-2" />
                        <p className="hidden md:block" >Код приглашения</p>
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={Users}
                        title="Участники"
                        value={space.members_count || 0}
                    />
                    <StatCard
                        icon={Trophy}
                        title="Достижения"
                        value={space.achievements?.length || 0}
                    />
                    <StatCard
                        icon={Target}
                        title="Активные челленджи"
                        value={activeChallenges.length}
                    />
                    <StatCard
                        icon={CalendarDays}
                        title="Запланировано"
                        value={scheduledChallenges.length}
                    />
                </div>

                {/* Achievements */}
                {space.achievements && space.achievements.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Достижения пространства</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {space.achievements.map((achievement) => (
                                    <Badge key={achievement.id} variant="secondary">
                                        {achievement.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Challenges Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Челленджи</h2>
                        <Button className="text-black" onClick={() => setIsCreateChallengeOpen(true)}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Создать челлендж
                        </Button>
                    </div>

                    {/* Challenges Tabs */}
                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                            <TabsTrigger value="active" className="px-2 py-1">
                                Активные ({activeChallenges.length})
                            </TabsTrigger>
                            <TabsTrigger value="scheduled" className="px-2 py-1">
                                План ({scheduledChallenges.length})
                            </TabsTrigger>
                            <TabsTrigger value="finished" className="px-2 py-1">
                                Архив ({finishedChallenges.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="active" className="mt-6">
                            {activeChallenges.length ? (
                                renderChallengesGrid(activeChallenges)
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    Нет активных челленджей
                                </p>
                            )}
                        </TabsContent>

                        <TabsContent value="scheduled" className="mt-6">
                            {scheduledChallenges.length ? (
                                renderChallengesGrid(scheduledChallenges)
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    Нет запланированных челленджей
                                </p>
                            )}
                        </TabsContent>

                        <TabsContent value="finished" className="mt-6">
                            {finishedChallenges.length ? (
                                renderChallengesGrid(finishedChallenges)
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    Нет завершённых челленджей
                                </p>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Create Challenge Dialog */}
            <Dialog open={isCreateChallengeOpen} onOpenChange={setIsCreateChallengeOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Создание челленджа</DialogTitle>
                        <DialogDescription>
                            Создайте новый челлендж в пространстве {space.name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Название</Label>
                            <Input
                                id="name"
                                placeholder="Введите название челленджа"
                                value={createChallengeForm.name}
                                onChange={(e) => setCreateChallengeForm({
                                    ...createChallengeForm,
                                    name: e.target.value
                                })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Описание</Label>
                            <Textarea
                                id="description"
                                placeholder="Опишите задачу челленджа"
                                value={createChallengeForm.description}
                                onChange={(e) => setCreateChallengeForm({
                                    ...createChallengeForm,
                                    description: e.target.value
                                })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="prize">Приз</Label>
                            <Input
                                id="prize"
                                placeholder="Укажите приз за победу"
                                value={createChallengeForm.prize}
                                onChange={(e) => setCreateChallengeForm({
                                    ...createChallengeForm,
                                    prize: e.target.value
                                })}
                            />
                        </div>

                        <div className="grid gap-4 grid-cols-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="verification"
                                    checked={createChallengeForm.is_verification_required}
                                    onCheckedChange={(checked) => setCreateChallengeForm({
                                        ...createChallengeForm,
                                        is_verification_required: checked as boolean
                                    })}
                                />
                                <Label htmlFor="verification">Требуется верификация</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="estimation"
                                    checked={createChallengeForm.is_estimation_required}
                                    onCheckedChange={(checked) => setCreateChallengeForm({
                                        ...createChallengeForm,
                                        is_estimation_required: checked as boolean
                                    })}
                                />
                                <Label htmlFor="estimation">Требуется оценка</Label>
                            </div>
                        </div>

                        <div className="grid gap-4 grid-cols-2">
                            <div className="grid gap-2">
                                <Label>Стратегия агрегации результатов</Label>
                                <Select
                                    value={createChallengeForm.results_aggregation_strategy}
                                    onValueChange={(value: 'SUM' | 'AVG' | 'MAX') => setCreateChallengeForm({
                                        ...createChallengeForm,
                                        results_aggregation_strategy: value
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите стратегию"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SUM">Сумма</SelectItem>
                                        <SelectItem value="AVG">Среднее</SelectItem>
                                        <SelectItem value="MAX">Максимум</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Определение победителя</Label>
                                <Select
                                    value={createChallengeForm.prize_determination_fn}
                                    onValueChange={(value: 'HIGHER_THAN' | 'LESS_THAN' | 'HEAD' | 'TAIL') =>
                                        setCreateChallengeForm({
                                            ...createChallengeForm,
                                            prize_determination_fn: value
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите метод"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HIGHER_THAN">Больше чем</SelectItem>
                                        <SelectItem value="LESS_THAN">Меньше чем</SelectItem>
                                        <SelectItem value="HEAD">Первые N</SelectItem>
                                        <SelectItem value="TAIL">Последние N</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Достижение</Label>
                            <Select
                                value={createChallengeForm.achievement_id?.toString()}
                                onValueChange={(value) => setCreateChallengeForm({
                                    ...createChallengeForm,
                                    achievement_id: value ? Number(value) : null
                                })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите достижение"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Без достижения</SelectItem>
                                    {space.achievements?.map((achievement) => (
                                        <SelectItem
                                            key={achievement.id}
                                            value={achievement.id.toString()}
                                        >
                                            {achievement.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-4 grid-cols-2">
                            <div className="grid gap-2">
                                <Label>Дата начала</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="justify-start text-left font-normal">
                                            {format(new Date(createChallengeForm.starts_at), 'PPP', { locale: ru })}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(createChallengeForm.starts_at)}
                                            onSelect={(date) => date && setCreateChallengeForm({
                                                ...createChallengeForm,
                                                starts_at: format(date, "yyyy-MM-dd'T'HH:mm:ss")
                                            })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="grid gap-2">
                                <Label>Дата окончания</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="justify-start text-left font-normal">
                                            {format(new Date(createChallengeForm.ends_at_const), 'PPP', { locale: ru }).replace(/Z$/, '')}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(createChallengeForm.ends_at_const)}
                                            onSelect={(date) => date && setCreateChallengeForm({
                                                ...createChallengeForm,
                                                ends_at_const: format(date, "yyyy-MM-dd'T'HH:mm:ss")
                                            })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Значение для определения победителя</Label>
                            <Input
                                type="number"
                                value={createChallengeForm.prize_determination_argument}
                                onChange={(e) => setCreateChallengeForm({
                                    ...createChallengeForm,
                                    prize_determination_argument: Number(e.target.value)
                                })}
                                placeholder="Введите значение"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateChallengeOpen(false)}>
                            Отмена
                        </Button>
                        <Button className="text-black" onClick={handleCreateChallenge}>
                            Создать челлендж
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SpaceDetailPage;
