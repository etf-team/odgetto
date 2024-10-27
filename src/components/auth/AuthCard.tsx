import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthCard = () => {
    return (
        <Card className="w-full h-full max-w-md mx-auto items-center">
            <CardHeader>
                <CardTitle>Добро пожаловать</CardTitle>
                <CardDescription>Войдите или создайте аккаунт</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger className="auth-tab" value="login">Вход</TabsTrigger>
                        <TabsTrigger className="auth-tab" value="register">Регистрация</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>

                    <TabsContent value="register">
                        <RegisterForm />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
