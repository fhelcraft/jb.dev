import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const manifestPath = join(root, 'public', 'build', 'manifest.json');
const outPath = join(root, 'public', 'index.html');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const cssEntry = manifest['resources/css/app.css'];
const jsEntry = manifest['resources/js/app.jsx'];
const cssHref = cssEntry ? `/build/${cssEntry.file}` : '';
const jsSrc = jsEntry ? `/build/${jsEntry.file}` : '';

const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Jaybhee P. Dahay | Portfolio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/garet" rel="stylesheet">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
        <link rel="apple-touch-icon" href="/favicon.png">
        ${cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : ''}
        <style>
        html { scroll-behavior: smooth; }
        body { margin: 0; -webkit-font-smoothing: antialiased; }
        .fixed.top-0.right-0 a { color: #94a3b8; text-decoration: none; font-weight: 600; }
        .fixed.top-0.right-0 a:hover { color: #c026d3; }
        .fixed.top-0.right-0 .ml-4 { margin-left: 1rem; }
        </style>
    </head>
    <body class="antialiased">
        <div id="app-loader" class="portfolio-loader" aria-hidden="true">
            <div class="portfolio-loader__inner">
                <div class="portfolio-loader__logo">
                    <span class="portfolio-loader__logo-fhel">JB.</span><span class="portfolio-loader__logo-dev">dev</span>
                </div>
                <div class="portfolio-loader__bar">
                    <span class="portfolio-loader__bar-fill"></span>
                </div>
            </div>
        </div>
        <script>window.PORTFOLIO_CHAT_URL = "/api/chat";</script>
        <div id="root"></div>
        ${jsSrc ? `<script type="module" src="${jsSrc}"><\/script>` : ''}
    </body>
</html>
`;

writeFileSync(outPath, html, 'utf8');
console.log('Generated public/index.html for static deploy');
