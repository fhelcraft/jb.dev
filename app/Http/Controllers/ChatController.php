<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    private const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
    private const MODEL = 'llama-3.1-8b-instant';

    private function getPortfolioContext(): string
    {
        return <<<TEXT
You are a helpful assistant for Jaybhee P. Dahay
's portfolio website. Answer questions based ONLY on the following information. If asked about something not covered here, say you don't have that information and suggest they check the portfolio or contact Fhel.

## About Fhel
- Name: Jaybhee P. Dahay

- Title: IT Technical Support | Web Application Developer
- Location: Cagayan de Oro, Philippines
- Summary: Technical Support Specialist and Web Application Developer with nearly 4 years of experience supporting institutional systems, network infrastructure, and web applications. Skilled in system troubleshooting, DNS management, server deployment, and full-stack web development using Laravel, React, and MySQL. Proven track record of maintaining 99% system uptime while delivering scalable digital solutions through AI integration.

## Contact
- Email: fhelfelciano@gmail.com
- Portfolio: https://fhel-dev.vercel.app
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

Format your replies for readability: put each main point or list item on its own line. Use a blank line between sections (e.g. after an intro sentence, or between skill categories). Use bullet points or short lines rather than long paragraphs. Do not use markdown symbols like ** or ##; use plain text and line breaks only.
TEXT;
    }

    public function chat(Request $request)
    {
        $request->validate(['message' => 'required|string|max:2000']);

        $apiKey = config('services.groq.key');
        if (empty($apiKey)) {
            return response()->json(['error' => 'Chat is not configured.'], 503);
        }

        $userMessage = trim($request->input('message'));
        $messages = [
            ['role' => 'system', 'content' => $this->getPortfolioContext()],
            ['role' => 'user', 'content' => $userMessage],
        ];

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(60)->post(self::GROQ_URL, [
                'messages' => $messages,
                'model' => self::MODEL,
                'temperature' => 0.7,
                'max_tokens' => 1024,
            ]);

            if (!$response->successful()) {
                Log::warning('Groq API error', ['status' => $response->status(), 'body' => $response->body()]);
                return response()->json(['error' => 'Unable to get a response. Please try again.'], 502);
            }

            $data = $response->json();
            $content = $data['choices'][0]['message']['content'] ?? '';

            return response()->json(['content' => trim($content)]);
        } catch (\Exception $e) {
            Log::error('Chat error', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Something went wrong. Please try again.'], 500);
        }
    }
}
