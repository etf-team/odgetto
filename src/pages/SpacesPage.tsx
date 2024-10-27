import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Users, Trophy, Plus, Trash2, Pencil, UserPlus } from 'lucide-react';
import { SpaceDTO } from "@/types/api.ts";
import { useSpaces } from "@/context/SpacesContext.tsx";
import { useNavigate } from "react-router-dom";

interface CreateSpaceFormData {
    name: string;
    description: string;
}

export const SpacesPage = () => {
    const navigate = useNavigate();
    const { spaces, isLoading, error, createSpace, deleteSpace, joinSpace } = useSpaces();
    const [spaceToDelete, setSpaceToDelete] = useState<{ id: number; name: string } | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState<SpaceDTO | null>(null);
    const [formData, setFormData] = useState<CreateSpaceFormData>({
        name: '',
        description: '',
    });
    const [invitationToken, setInvitationToken] = useState('');

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const handleCreateSpace = async () => {
        await createSpace(formData);
        setIsCreateModalOpen(false);
        setFormData({ name: '', description: '' });
    };

    const handleJoinSpace = async () => {
        await joinSpace({ invitation_token: invitationToken });
        setIsJoinModalOpen(false);
        setInvitationToken('');
    };

    const handleEditSpace = (space: SpaceDTO) => {
        setSelectedSpace(space);
        setFormData({
            name: space.name,
            description: space.description,
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteSpace = async () => {
        if (spaceToDelete && deleteConfirmation === spaceToDelete.name) {
            await deleteSpace(spaceToDelete.id);
            setSpaceToDelete(null);
            setDeleteConfirmation('');
        }
    };

    return (
        <div className="py-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Пространства</h1>
                <p className="text-gray-600">Управляйте своими пространствами и присоединяйтесь к новым</p>
            </div>

            <div className="flex justify-end gap-2 mb-6">
                <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <UserPlus className="h-4 w-4" />
                            Присоединиться
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Присоединиться к пространству</DialogTitle>
                            <DialogDescription>
                                Введите код приглашения для присоединения к пространству
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="invitation-token">Код приглашения</Label>
                                <Input
                                    id="invitation-token"
                                    value={invitationToken}
                                    onChange={(e) => setInvitationToken(e.target.value)}
                                    placeholder="Введите код приглашения"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsJoinModalOpen(false)}>
                                Отмена
                            </Button>
                            <Button
                                onClick={handleJoinSpace}
                                disabled={!invitationToken.trim()}
                                className="text-black"
                            >
                                Присоединиться
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 text-black">
                            <Plus className="h-4 w-4" />
                            Создать пространство
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создание нового пространства</DialogTitle>
                            <DialogDescription>
                                Создайте пространство для проведения челленджей
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Название пространства</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Описание</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                                Отмена
                            </Button>
                            <Button onClick={handleCreateSpace} className="text-black">Создать пространство</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {spaces.map((space) => (
                    <Card key={space.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex-1">
                                    <CardTitle className="truncate text-left">{space.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-left">
                                        {space.description}
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEditSpace(space)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setSpaceToDelete({
                                            id: space.id,
                                            name: space.name
                                        })}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>Участники: {space.members_count}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Trophy className="h-4 w-4" />
                                    <span>Достижения: {space.achievements?.length || 0}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full text-black"
                                onClick={() => navigate(`/spaces/${space.id}`)}
                            >
                                Перейти к пространству
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактирование пространства</DialogTitle>
                        <DialogDescription>
                            Измените информацию о пространстве
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Название пространства</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Описание</Label>
                            <Textarea
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setSelectedSpace(null);
                                setFormData({ name: '', description: '' });
                            }}
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={() => selectedSpace && handleEditSpace(selectedSpace)}
                            disabled={!formData.name.trim()}
                            className="text-black"
                        >
                            Сохранить изменения
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={spaceToDelete !== null}
                onOpenChange={() => {
                    setSpaceToDelete(null);
                    setDeleteConfirmation('');
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Удаление пространства</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                            <p>
                                Вы уверены, что хотите удалить пространство "{spaceToDelete?.name}"?
                                Это действие невозможно отменить.
                            </p>
                            <div className="space-y-2">
                                <Label htmlFor="confirm">
                                    Для подтверждения введите название пространства:
                                </Label>
                                <Input
                                    id="confirm"
                                    value={deleteConfirmation}
                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                    placeholder={spaceToDelete?.name}
                                    className="w-full"
                                />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setSpaceToDelete(null);
                                setDeleteConfirmation('');
                            }}
                        >
                            Отмена
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteSpace}
                            disabled={deleteConfirmation !== spaceToDelete?.name}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Удалить пространство
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
