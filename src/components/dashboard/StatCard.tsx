import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => {
    return (
        <Card>
            <CardContent className="flex items-center p-3 md:p-4">
                <div className="flex-1 text-left">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">{title}</p>
                    <h3 className="text-base md:text-lg font-bold">{value}</h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
            </CardContent>
        </Card>
    );
};

export default StatCard;
