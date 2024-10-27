import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/services/apiService";

export const LoginForm = () => {
    const { login } = useAuth();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const token = await loginUser(email, password);

            if (!token) {
                throw new Error('Неверные данные для входа');
            }
            login(token);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Ошибка входа",
                description: err.message,
                duration: 3000,
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2 flex flex-wrap mt-6">
                <Label htmlFor="email" className="ml-0.5">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-2 flex flex-wrap">
                <Label htmlFor="password" className="ml-0.5">Пароль</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button className="w-full text-black" onClick={handleLogin}>
                Войти <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </div>
    );
};
