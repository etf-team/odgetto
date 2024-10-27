import { FeatureGrid } from '../features/FeatureGrid';

export const HeroSection = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Превратите работу в увлекательное приключение
            </h1>
            <p className="text-lg text-gray-600">
                Участвуйте в корпоративных челленджах, развивайтесь вместе с командой и достигайте новых высот.
            </p>
            <FeatureGrid />
        </div>
    );
};
