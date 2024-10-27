import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export const AboutPage = () => {
    return (
        <div className="container mx-auto py-8">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>О платформе Challenge Arena</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Идея проекта</h3>
                        <p className="text-gray-600">
                            Challenge Arena - это корпоративная соревновательная платформа, где сотрудники могут участвовать
                            в различных челленджах и командных соревнованиях, укрепляя командный дух и взаимодействуя с коллегами.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Ключевые возможности</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Создание личного профиля</li>
                                <li>Участие в командных соревнованиях</li>
                                <li>Отслеживание личных достижений</li>
                                <li>Календарь корпоративных событий</li>
                                <li>Взаимодействие с коллегами</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Цели проекта</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Укрепление командного духа</li>
                                <li>Развитие корпоративной культуры</li>
                                <li>Повышение вовлеченности сотрудников</li>
                                <li>Поддержка work-life баланса</li>
                                <li>Геймификация корпоративной жизни</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
