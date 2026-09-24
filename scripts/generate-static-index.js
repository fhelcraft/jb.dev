import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifestPath = join(root, "public", "build", "manifest.json");
const outPath = join(root, "public", "index.html");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const cssEntry = manifest["resources/css/app.css"];
const jsEntry = manifest["resources/js/app.jsx"];
const cssHref = cssEntry ? `/build/${cssEntry.file}` : "";
const jsSrc = jsEntry ? `/build/${jsEntry.file}` : "";

const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Insuficcient Payment</title>
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

            h1 {
                margin: 0;
                font-size: clamp(2rem, 6vw, 5rem);
                line-height: 1.1;
                letter-spacing: -0.06em;
                font-weight: 700;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Insuficcient Payment</h1>
    </body>
</html>
`;

writeFileSync(outPath, html, "utf8");
console.log("Generated public/index.html for static deploy");
