import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-white/10">
            <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-center">
                <LogoIcon className="h-10 w-10 mr-3 text-teal-500 dark:text-teal-400" />
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">BizAssistBD</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your AI Partner for Business Growth</p>
                </div>
            </div>
        </header>
    );
};