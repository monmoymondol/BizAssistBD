import React from 'react';
import { AnalyticsIcon, ContentIcon, CustomerIcon, IdeaIcon, SocialMediaIcon } from './components/icons';
import { Skill } from './types';

export const SKILLS: Skill[] = [
    {
        title: "Social Media Marketing",
        description: "Generate captions, hashtags, and ad copy for Facebook, Instagram, etc.",
        Icon: SocialMediaIcon,
        samplePrompt: "Make a Facebook caption for my new women’s boutique named “StyleSora.”",
        color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    },
    {
        title: "Customer Communication",
        description: "Write polite replies to customer messages, reviews, or emails.",
        Icon: CustomerIcon,
        samplePrompt: "Write a friendly reply to a customer complaining about a delivery delay.",
        color: "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
    },
    {
        title: "Business Analytics",
        description: "Upload a sales report (.csv, .txt) to get insights and trends.",
        Icon: AnalyticsIcon,
        samplePrompt: "Analyze the attached sales report and identify top-performing products.",
        color: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    },
    {
        title: "Idea Generation",
        description: "Get new business ideas or seasonal campaign suggestions.",
        Icon: IdeaIcon,
        samplePrompt: "How can I promote my small bakery in Dhaka during the monsoon season?",
        color: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
        title: "Content Writing",
        description: "Write short blog posts, promotional SMS, or product descriptions.",
        Icon: ContentIcon,
        samplePrompt: "Write a short, energetic promotional message for a new coffee shop's 'Happy Hour' offer.",
        color: "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    },
];