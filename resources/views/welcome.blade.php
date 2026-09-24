<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Payment Overdue -</title>
        <style>
            :root {
                --bg: #ffffff;
                --text: #000000;
            }

            * {
                box-sizing: border-box;
            }

            html, body {
                margin: 0;
                width: 100%;
                min-height: 100%;
                background: var(--bg);
                color: var(--text);
                font-family: "SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", monospace;
            }

            body {
                min-height: 100vh;
                display: grid;
                place-items: center;
                padding: 2rem;
            }

            .message {
                margin: 0;
                font-size: clamp(2rem, 6vw, 5rem);
                line-height: 1.1;
                letter-spacing: -0.06em;
                font-weight: 700;
                text-align: center;
                text-transform: none;
            }
        </style>
    </head>
    <body>
        <h1 class="message">Payment Overdue 👻</h1>
    </body>
</html>
