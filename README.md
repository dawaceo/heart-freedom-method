# Heart Freedom Method — guided session app

A private demo: a calm, step-by-step web app that guides a person through the
10 steps of the **Heart Freedom Method** for discovering and releasing
subconscious limiting beliefs.

The Heart Freedom Method is the work of **Dr. Lise Janelle** (from the book
*Unstuck*). This app is a demonstration prototype built for review, not a public
release. All rights to the method remain with its authors.

## Features
- Solo or coach/partner guidance modes
- Optional voice narration (reads prompts aloud) and voice dictation (speak your answers)
- Private by default — sessions are stored locally in the browser
- Export each session as a Markdown integration record
- Installable as an app (Add to Home Screen); works offline
- Gentle safety framing with crisis-support resources

## Tech
A single self-contained `index.html` (no build step, no dependencies) plus a PWA
manifest, service worker, and icons. Served as a static site.
