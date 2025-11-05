import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResponseDisplay } from './components/ResponseDisplay';
import { SkillCard } from './components/SkillCard';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { SKILLS } from './constants';
import { generateBizAssistResponse } from './services/geminiService';
import type { Skill } from './types';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleSkillSelect = useCallback((skill: Skill) => {
        setPrompt(skill.samplePrompt);
        setActiveSkill(skill);
        document.getElementById('prompt-section')?.scrollIntoView({ behavior: 'smooth' });
        if (skill.title === "Business Analytics") {
            setTimeout(() => {
                document.getElementById('file-upload')?.click();
            }, 300);
        }
    }, []);

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim() && !fileContent) {
            setError('Please write a prompt or upload a file.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResponse('');

        let fullPrompt = prompt;
        if (fileContent) {
            fullPrompt = `Analyze the following data and then respond to the user's request.\n\n--- DATA START ---\n${fileContent}\n--- DATA END ---\n\nUser Request: ${prompt}`;
        }

        try {
            const result = await generateBizAssistResponse(fullPrompt);
            setResponse(result);
        } catch (err) {
            console.error(err);
            setError('Sorry, something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, fileContent]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-900 dark:to-black font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <section id="skills-section" className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">How can I help you today?</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Select a skill or write your own request below.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {SKILLS.map((skill) => (
                            <SkillCard key={skill.title} skill={skill} onSelect={handleSkillSelect} />
                        ))}
                    </div>
                </section>

                <section id="prompt-section" className="bg-white/50 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl dark:shadow-black/20 mb-8">
                    <PromptInput
                        prompt={prompt}
                        setPrompt={setPrompt}
                        setFileContent={setFileContent}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                        setActiveSkill={setActiveSkill}
                    />
                </section>

                <section id="response-section">
                    <ResponseDisplay
                        response={response}
                        isLoading={isLoading}
                        error={error}
                        activeSkill={activeSkill}
                    />
                </section>
            </main>
            <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-500 mt-12 border-t border-slate-200 dark:border-white/10">
                Powered by AI ✨ BizAssistBD
            </footer>
        </div>
    );
};

export default App;