import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    Copy,
    CheckCircle2,
    Mail,
    Phone,
    Building2,
    User,
    Trophy,
    Star,
    BookMarked, LogOut
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/UserContext";
import {useAuth} from "@/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const { user, isLoading } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const { toast } = useToast();

    const initialProfileData = {
        fullName: user?.full_name,
        email: 'ivan@oggetto.ru',
        phone: '+7 (999) 123-45-67',
        department: 'Разработка',
        interests: 'Спорт, программирование, настольные игры',
        inviteToken: 'uk4sf-98dsf-23jk3-54gd2',
        achievements: [
            { id: 1, name: 'Первый челлендж', description: 'Завершил первый челлендж' },
            { id: 2, name: 'Командный игрок', description: 'Участвовал в 5 командных челленджах' }
        ],
        statistics: {
            completedChallenges: 12,
            totalPoints: 1250,
            activeChallenges: 3
        }
    };

    const [profileData, setProfileData] = useState(initialProfileData);
    const [editFormData, setEditFormData] = useState(initialProfileData);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
    }

    const handleStartEditing = () => {
        setEditFormData(profileData); // Копируем текущие данные в форму
        setIsEditing(true);
    };

    const handleCancelEditing = () => {
        setEditFormData(profileData); // Восстанавливаем исходные данные
        setIsEditing(false);
    };

    const handleSaveChanges = () => {
        setProfileData(editFormData); // Применяем изменения
        setIsEditing(false);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(profileData.inviteToken);
            setIsCopied(true);
            setTooltipOpen(true); // Открываем тултип
            toast({
                description: "Токен скопирован в буфер обмена",
                duration: 2000,
            });
            setTimeout(() => {
                setIsCopied(false);
                setTooltipOpen(false); // Закрываем тултип после задержки
            }, 2000);
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Не удалось скопировать токен",
                duration: 2000,
            });
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-6">
            <Card>
                <CardHeader className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="text-2xl">{user?.full_name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                            <CardTitle className="text-2xl mb-2">{profileData.fullName}</CardTitle>
                            <div className="space-y-1 text-gray-600">
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Building2 className="h-4 w-4" />
                                    <span>{profileData.department}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Trophy className="h-4 w-4" />
                                    <span>{profileData.statistics.completedChallenges} завершенных челленджей</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Star className="h-4 w-4" />
                                    <span>{profileData.statistics.totalPoints} баллов</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mx-0">
                        <Button
                            variant="outline"
                            onClick={isEditing ? handleCancelEditing : handleStartEditing}
                            className="w-full sm:w-auto"
                        >
                            {isEditing ? 'Отменить' : 'Редактировать профиль'}
                        </Button>
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Выйти
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-semibold text-left">Контактная информация</h3>
                            {isEditing ? (
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="block text-left">ФИО</Label>
                                        <Input
                                            id="fullName"
                                            value={editFormData.fullName}
                                            onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="block text-left">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={editFormData.email}
                                            onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="block text-left">Телефон</Label>
                                        <Input
                                            id="phone"
                                            value={editFormData.phone}
                                            onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department" className="block text-left">Отдел</Label>
                                        <Input
                                            id="department"
                                            value={editFormData.department}
                                            onChange={(e) => setEditFormData({...editFormData, department: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="interests" className="block text-left">Интересы</Label>
                                        <Input
                                            id="interests"
                                            value={editFormData.interests}
                                            onChange={(e) => setEditFormData({...editFormData, interests: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Button className="text-black" onClick={handleSaveChanges}>
                                            Сохранить изменения
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="h-4 w-4" />
                                        <span>{profileData.fullName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        <span>{profileData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="h-4 w-4" />
                                        <span>{profileData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Building2 className="h-4 w-4" />
                                        <span>{profileData.department}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <BookMarked className="h-4 w-4" />
                                        <span>{profileData.interests}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-semibold text-left">Токен приглашения</h3>
                            <div className="flex items-center gap-2">
                                <Input
                                    value={profileData.inviteToken}
                                    readOnly
                                    className="font-mono"
                                />
                                <TooltipProvider>
                                    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={copyToClipboard}
                                            >
                                                {isCopied ? (
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black border-2">
                                            <p>{isCopied ? 'Скопировано!' : 'Копировать токен'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <p className="text-sm text-gray-500 text-left">
                                Этот токен можно использовать для приглашения в пространства
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-semibold text-left">Достижения</h3>
                            <div className="flex flex-wrap gap-2">
                                {profileData.achievements.map((achievement) => (
                                    <TooltipProvider key={achievement.id}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge variant="secondary" className="cursor-help">
                                                    {achievement.name}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{achievement.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
