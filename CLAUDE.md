The app will display a new random technology topic every day, such as "Artificial Intelligence," "Blockchain," "Cybersecurity," "Data Science," etc.

The app will automatically generate a short quiz (e.g., 3-5 questions) based on the daily tech topic.

# Tech stack

Frontend: React, Vite, Axios, Typescript, Radix, Tailwind

Backend: Node.js, Express.js, Typescript

AI: OpenAI model through LiteLLM API running here https://llm-proxy.edgez.live/

# Folder structure

/
├── frontend/ # React TypeScript application
├── backend/ # Express API server

## Backend structure

Architecture Flow: Routes -> Controllers → Services

/backend
├── index.ts # Entry point
├── /controllers # HTTP request handlers
├── /routes # Route definitions
├── /models # Data structures
├── /services # Business logic
├── /middleware # HTTP middleware
├── /utils # Utility functions

# Code style

- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
- Don't use type assertion in TS
