import React, { useState, useRef } from 'react';
import { PaperAirplaneIcon, UploadIcon, XCircleIcon } from './icons';
import { Skill } from '../types';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    setFileContent: (content: string | null) => void;
    onGenerate: () => void;
    isLoading: boolean;
    setActiveSkill: (skill: Skill | null) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, setFileContent, onGenerate, isLoading, setActiveSkill }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setFileContent(text);
                setFileName(file.name);
            };
            reader.readAsText(file);
        }
    };
    
    const handleRemoveFile = () => {
        setFileContent(null);
        setFileName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!isLoading) {
                onGenerate();
            }
        }
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        // If user types, they are creating a custom prompt, so clear the active skill
        setActiveSkill(null);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <textarea
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., Write a Facebook post for my new clothing brand..."
                    className="w-full h-32 p-4 pr-12 text-base bg-slate-100/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-50 border border-slate-300 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none transition resize-none disabled:bg-slate-200/60 dark:disabled:bg-slate-800/60 disabled:text-slate-500 dark:disabled:text-slate-400 placeholder-slate-500 dark:placeholder-slate-400 caret-teal-500 dark:caret-teal-400 focus:shadow-lg focus:shadow-teal-500/20"
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".txt,.csv"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all transform cursor-pointer ${isLoading ? 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' : 'border-slate-400 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:border-teal-500/80 dark:hover:border-teal-400/80 hover:text-teal-500 dark:hover:text-teal-400 hover:-translate-y-0.5 active:scale-95'}`}
                    >
                        <UploadIcon className="w-5 h-5" />
                        <span>Upload Data (.csv, .txt)</span>
                    </label>
                    {fileName && (
                         <div className="flex items-center gap-2 text-sm bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                            <span>{fileName}</span>
                            <button onClick={handleRemoveFile} disabled={isLoading} className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400">
                                <XCircleIcon className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-400 dark:to-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105 active:scale-100 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:from-slate-400 dark:disabled:from-slate-600 disabled:to-slate-400 dark:disabled:to-slate-600 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
                >
                    {isLoading ? (
                         <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <PaperAirplaneIcon className="w-5 h-5" />
                            Generate
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};