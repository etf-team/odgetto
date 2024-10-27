import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { registerUser, loginUser } from '@/services/apiService';

export const RegisterForm = () => {
    const { login } = useAuth();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(email, password, fullName);

            const token = await loginUser(email, password);
            if (token) {
                toast({
                    title: "Регистрация успешна",
                    description: "Добро пожаловать в Challenge Arena!",
                    duration: 3000,
                });
                login(token);
            }
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Ошибка регистрации",
                description: err.message,
                duration: 3000,
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2 flex flex-wrap mt-6">
                <Label htmlFor="reg-name" className="ml-0.5">Имя</Label>
                <Input
                    id="reg-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div className="space-y-2 flex flex-wrap">
                <Label htmlFor="reg-email" className="ml-0.5">Email</Label>
                <Input
                    id="reg-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-2 flex flex-wrap">
                <Label htmlFor="reg-password" className="ml-0.5">Пароль</Label>
                <Input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button className="w-full text-black" onClick={handleRegister}>
                Создать аккаунт <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
};
