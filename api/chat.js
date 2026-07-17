const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

const PORTFOLIO_CONTEXT = `You are a helpful assistant for Jaybhee P. Dahay's portfolio website. Answer questions based ONLY on the following information. If asked about something not covered here, say you don't have that information and suggest they check the portfolio or contact JB.

## About
- Name: Jaybhee P. Dahay
- Title: IT Technical Support | Web Application Developer
- Location: Cagayan de Oro, Philippines
- Summary: Technical Support Specialist and Web Application Developer with nearly 4 years of experience supporting institutional systems, network infrastructure, and web applications. Skilled in system troubleshooting, DNS management, server deployment, and full-stack web development using Laravel, React, and MySQL. Proven track record of maintaining 99% system uptime while delivering scalable digital solutions through AI integration.

## Contact
- Email: jaybheedahay@gmail.com
- Portfolio: https://jb-dev.vercel.app
- Phone: +63 910 4180 743
- Location: Cagayan de Oro, Philippines

## Skills (Area of Expertise)
- cPanel, DNS Management, Customer Support / IT Support, Laravel, React.JS, Javascript, PHP, MySQL, Supabase, AI Integration, Web App Development, Github

## Experience
1. Web App Developer | Information System Analyst II at City College of Cagayan de Oro (February 2024 – Present): 99% system uptime, developed institutional systems (website, SmartChive, Attendium, Courseware), AI chatbot automation, reduced manual reporting by ~40%, technical support for systems and network.
2. System Administrator | Systems AI Solution at Skunkworks PH (August 2023 – February 2024): System infrastructure management, system health and logs monitoring, patch management, AI camera solution testing and validation.
3. Network Specialist / IT Support at City College of Cagayan de Oro (October 2022 – August 2023): Multi-WAN access points, 95% building connectivity, designed and implemented network infrastructure, >95% uptime, resolved 95% of daily tickets.

## Projects (production)
- City College of Cagayan de Oro Website – official website with dynamic CMS and AI integration – citycollegecdo.edu.ph
- SmartChive – centralized AI-powered document repository – smartchive.citycollegecdo.edu.ph
- Attendium – faculty attendance management system with AI chatbot – attendium.citycollegecdo.edu.ph
- Courseware – web-based courseware LMS platform – courseware.citycollegecdo.edu.ph

## Education
- Bachelor of Science in Information Technology, University of Science and Technology In Southern Philippines (June 2018 – August 2022). Capstone: Barangay Appointment Scheduler System with QR Code Scanner. 1st Honor Dean's Lister 2022 (4th Year), 2nd Honor Dean's Lister 2021 (3rd Year).
- Golden Heritage Institute – Professional Education Units (18 Units), June 2025 – November 2025.

## Certifications
- CISCO: Cyber OPS Associate, Intro to Networks and Intro to IoT

## Awards (City College of Cagayan de Oro)
- Top 1 Administrative Employee (2025), Top 2 Job Order Employee (2024), Top 1 Employee (2023)

## Languages
- English, Filipino

Keep answers concise and friendly. Do not make up information.

Format your replies for readability: put each main point or list item on its own line. Use a blank line between sections. Use bullet points or short lines rather than long paragraphs. Do not use markdown symbols like ** or ##; use plain text and line breaks only.`;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ error: 'Chat is not configured.' });
    }

    const message =
        typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!message || message.length > 2000) {
        return res.status(422).json({ error: 'Message is required (max 2000 characters).' });
    }

    try {
        const groqRes = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: PORTFOLIO_CONTEXT },
                    { role: 'user', content: message },
                ],
                model: MODEL,
                temperature: 1,
                max_completion_tokens: 2048,
                top_p: 1,
                stream: false,
            }),
        });

        const data = await groqRes.json().catch(() => ({}));

        if (!groqRes.ok) {
            console.error('Groq API error', groqRes.status, data);
            return res.status(502).json({
                error: 'Unable to get a response. Please try again.',
            });
        }

        const content = data?.choices?.[0]?.message?.content ?? '';
        return res.status(200).json({ content: String(content).trim() });
    } catch (err) {
        console.error('Chat error', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
