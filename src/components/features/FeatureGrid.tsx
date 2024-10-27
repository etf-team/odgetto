import { Trophy, Users, Target } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeatureGrid = () => {
    const features = [
        { Icon: Trophy, title: 'Награды и достижения' },
        { Icon: Users, title: 'Командные события' },
        { Icon: Target, title: 'Личные цели' },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 py-6">
            {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
            ))}
        </div>
    );
};
