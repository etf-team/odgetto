import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Challenge } from '@/types/challenge.ts';

interface ChallengesListProps {
    challenges: Challenge[];
}

export const ChallengesList: React.FC<ChallengesListProps> = ({ challenges }) => {
    const [search, setSearch] = React.useState('');
    const [sortBy, setSortBy] = React.useState('date');
    const [filterStatus, setFilterStatus] = React.useState('all');

    const filteredChallenges = challenges
        .filter(challenge => {
            if (filterStatus === 'all') return true;
            return challenge.status === filterStatus;
        })
        .filter(challenge =>
            challenge.title.toLowerCase().includes(search.toLowerCase()) ||
            challenge.description.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    placeholder="Поиск челленджей..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="md:w-1/3"
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Сортировать по" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">По дате</SelectItem>
                        <SelectItem value="participants">По участникам</SelectItem>
                        <SelectItem value="progress">По прогрессу</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="upcoming">Предстоящие</SelectItem>
                        <SelectItem value="active">Активные</SelectItem>
                        <SelectItem value="completed">Завершенные</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
                    <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{challenge.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                {challenge.description}
                            </p>
                            <div className="flex justify-between text-sm">
                                <span>Участников: {challenge.participants.length}</span>
                                <span className="capitalize">{challenge.status}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
