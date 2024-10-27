import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    Icon: LucideIcon;
    title: string;
}

export const FeatureCard = ({ Icon, title }: FeatureCardProps) => {
    return (
        <div className="text-center space-y-2">
            <Icon className="w-8 h-8 mx-auto text-[#fd0]" />
            <p className="text-sm">{title}</p>
        </div>
    );
};
