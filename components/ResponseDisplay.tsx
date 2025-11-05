import React from 'react';
import { LogoIcon, SparklesIcon } from './icons';
import { Skill } from '../types';

interface ResponseDisplayProps {
    response: string;
    isLoading: boolean;
    error: string | null;
    activeSkill: Skill | null;
}

// Advanced markdown-to-HTML parser
const formatResponse = (text: string): string => {
    // 1. Pre-process for bold tags.
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    const lines = boldedText.split('\n');
    let htmlOutput = '';
    let inUl = false;
    let inOl = false;

    for (const line of lines) {
        const trimmedLine = line.trim();

        // Ordered lists (e.g., "1. First item")
        if (/^\d+\.\s/.test(trimmedLine)) {
            if (inUl) {
                htmlOutput += '</ul>';
                inUl = false;
            }
            if (!inOl) {
                htmlOutput += '<ol class="list-decimal list-inside space-y-2 my-4 pl-4">';
                inOl = true;
            }
            htmlOutput += `<li>${trimmedLine.replace(/^\d+\.\s/, '')}</li>`;
        } 
        // Unordered lists (e.g., "- An item" or "* An item")
        else if (/^[-*]\s/.test(trimmedLine)) {
            if (inOl) {
                htmlOutput += '</ol>';
                inOl = false;
            }
            if (!inUl) {
                htmlOutput += '<ul class="space-y-3 my-4">';
                inUl = true;
            }
            // "Key points" - styled as an attractive checklist
            htmlOutput += `
                <li class="flex items-start">
                    <svg class="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-teal-500 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${trimmedLine.substring(2)}</span>
                </li>`;
        } 
        // Regular paragraph or line break
        else {
            if (inUl) {
                htmlOutput += '</ul>';
                inUl = false;
            }
            if (inOl) {
                htmlOutput += '</ol>';
                inOl = false;
            }
            if (trimmedLine) {
                 htmlOutput += `<p class="leading-relaxed">${line}</p>`;
            } else {
                 // Preserve vertical space for empty lines
                 htmlOutput += '<p>&nbsp;</p>';
            }
        }
    }

    // Close any remaining open lists
    if (inUl) htmlOutput += '</ul>';
    if (inOl) htmlOutput += '</ol>';

    return htmlOutput;
};


const renderAsChatMessage = (response: string) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700/80 border border-slate-300 dark:border-white/10">
            <LogoIcon className="w-6 h-6 text-teal-500 dark:text-teal-400" />
        </div>
        <div className="flex-1 bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg p-5 rounded-2xl rounded-tl-none shadow-lg dark:shadow-2xl dark:shadow-black/20 border border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold mb-3 text-teal-600 dark:text-teal-400">BizAssistBD's Suggested Reply</h3>
            <div 
                className="text-slate-700 dark:text-slate-200 space-y-4 [&_strong]:text-teal-600 dark:[&_strong]:text-teal-300 [&_ol]:text-slate-600 dark:[&_ol]:text-slate-300"
                dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
            />
        </div>
    </div>
);

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error, activeSkill }) => {
    if (isLoading) {
        return (
            <div className="bg-slate-100 dark:bg-slate-800/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 animate-pulse">
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-rose-500/10 border border-red-200 dark:border-rose-500/30 text-red-700 dark:text-rose-300 p-6 rounded-2xl animate-fadeInUp">
                <h3 className="font-bold text-lg mb-2 text-red-800 dark:text-rose-200">Oops!</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!response) {
        return (
            <div className="text-center text-slate-500 dark:text-slate-500 p-10 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                <SparklesIcon className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Your AI-powered insights will appear here.</h3>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Just type a request or select a skill to get started!</p>
            </div>
        );
    }
    
    // Render with special chat UI for Customer Communication skill
    if (activeSkill?.title === 'Customer Communication') {
        return <div className="animate-fadeInUp">{renderAsChatMessage(response)}</div>;
    }

    return (
        <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/20 border border-slate-200 dark:border-white/10 animate-fadeInUp">
            <h3 className="text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">BizAssistBD's Suggestion</h3>
            <div 
                className="text-slate-700 dark:text-slate-200 space-y-4 [&_strong]:text-teal-600 dark:[&_strong]:text-teal-300 [&_ol]:text-slate-600 dark:[&_ol]:text-slate-300"
                dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
            />
        </div>
    );
};