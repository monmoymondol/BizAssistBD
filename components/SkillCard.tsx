import React from 'react';
import { Skill } from '../types';

interface SkillCardProps {
    skill: Skill;
    onSelect: (skill: Skill) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onSelect }) => {
    const { title, description, Icon, color } = skill;

    return (
        <div 
            onClick={() => onSelect(skill)}
            className="bg-white/60 dark:bg-white/5 p-6 rounded-2xl shadow-md dark:shadow-lg dark:shadow-black/20 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-teal-500/50 dark:hover:border-teal-400/50 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-teal-500/10 hover:-translate-y-1.5 cursor-pointer transition-all duration-300 group"
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
                </div>
            </div>
        </div>
    );
};