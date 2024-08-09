import { cn } from '@/lib/utils';
import React from 'react'

interface HomeCardProps {
    title: string;
    icon: JSX.Element;
    description: string;
    color: string;
    handleClick: () => void;
};

const Card = ({ title, icon, description, handleClick, color }: HomeCardProps) => {
    return (
        <div 
            className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w[270px] min-h-[260px] rounded-[14px] cursor-pointer', color)}
            onClick={handleClick}
        >
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                {icon}
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    {title}
                </h1>
                <p className="text-lg font-normal">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Card