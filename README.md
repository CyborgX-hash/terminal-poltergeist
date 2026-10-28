# Terminal Poltergeist 👻

> *"Every command has consequences. Let the ghost reveal them."*

Terminal Poltergeist is an AI-powered shell command analysis and safety assistant built for **Hacktoberfest Week 5: Ghost in the Machine**.

Submitted commands are never executed. Instead, an inspectable deterministic security rule engine combined with the open-weight **GPT-OSS 20B** model via the hosted Groq API analyzes potential hazards, explains compound commands component-by-component, identifies affected files and privilege escalation risks, and suggests safer alternatives in a haunted-terminal developer interface.

---

## Architecture Overview

- **Frontend:** React 18 + Vite + Tailwind CSS + Lucide Icons (Dark haunted aesthetic, accessible glowing effects, scanlines, responsive)
- **Backend:** Node.js + Express.js API
- **AI Engine:** Groq API (`openai/gpt-oss-20b`) with robust offline fallback
- **Deterministic Rules:** Zero-hallucination static analyzer for destructive flags, privilege escalation, credential exposure, remote curl-pipes, disk wiping, etc.
- **Database:** PostgreSQL + Prisma ORM for advisory history & risk distributions
- **Deployment:** Vercel (Frontend) + Render (Backend) + Managed PostgreSQL

---

## Monorepo Layout

```
.
├── client/          # Vite + React frontend application
├── server/          # Express backend, Prisma schema, security rules & AI service
├── .gitignore
├── package.json
└── README.md
```
