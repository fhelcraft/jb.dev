<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Jaybhee P. Dahay | Portfolio</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/garet" rel="stylesheet">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
        <link rel="apple-touch-icon" href="/favicon.png">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
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

        @if (Route::has('login'))
            <div class="fixed top-0 right-0 p-6 text-right z-10">
                @auth
                    <a href="{{ url('/home') }}" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Home</a>
                @else
                    <a href="{{ route('login') }}" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Log in</a>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Register</a>
                    @endif
                @endauth
            </div>
        @endif

        <script>window.PORTFOLIO_CHAT_URL = @json(route('api.chat'));</script>
        <div id="root"></div>
    </body>
</html>
