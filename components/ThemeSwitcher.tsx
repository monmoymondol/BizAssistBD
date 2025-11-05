import React from 'react';
import { SunIcon, MoonIcon } from './icons';

interface ThemeSwitcherProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-20 p-2 rounded-lg transition-all duration-300
                       border border-slate-300/40 dark:border-slate-700/60
                       bg-slate-200/50 dark:bg-slate-800/50
                       text-slate-600 dark:text-slate-300
                       hover:bg-slate-300/70 dark:hover:bg-slate-700/70
                       hover:border-slate-400 dark:hover:border-slate-600
                       backdrop-blur-sm shadow-lg"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="w-6 h-6" />
            ) : (
                <SunIcon className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]" />
            )}
        </button>
    );
};
