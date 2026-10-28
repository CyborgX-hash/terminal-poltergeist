# 👻 Terminal Poltergeist

> *"Every command has consequences. Let the ghost reveal them."*

Built for **Hacktoberfest 2026 Week 5: Ghost in the Machine**, **Terminal Poltergeist** is an AI-powered shell command analysis and developer safety assistant.

Developers paste unfamiliar, suspicious, or complex shell scripts into a haunted terminal interface and receive an instant breakdown of what each flag and pipe does, potential destructive hazards, privilege escalations, affected operating system resources, and safer alternatives.

**Submitted commands are NEVER executed.** Terminal Poltergeist evaluates commands strictly as untrusted data using a hybrid architecture: a deterministic security rule engine paired with the open-weight **GPT-OSS 20B** model via the hosted **Groq** LPU cloud inference.

---

## 🎃 Table of Contents

1. [Features & Capabilities](#-features--capabilities)
2. [Haunted Terminal Aesthetic & UI/UX](#-haunted-terminal-aesthetic--uiux)
3. [Architecture Overview](#-architecture-overview)
4. [Hacktoberfest Theme: Ghost in the Machine](#-hacktoberfest-theme-ghost-in-the-machine)
5. [Open Innovation & Open-Weight AI](#-open-innovation--open-weight-ai)
6. [Deterministic Security Rule Engine](#-deterministic-security-rule-engine)
7. [Getting Started Locally](#-getting-started-locally)
8. [Automated Testing & QA](#-automated-testing--qa)
9. [Deployment Guide](#-deployment-guide)
   - [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
   - [Backend Deployment (Render)](#backend-deployment-render)
   - [Database Provisioning (PostgreSQL)](#database-provisioning-postgresql)
10. [Environment Variables](#-environment-variables)
11. [License & Disclaimers](#-license--disclaimers)

---

## ⚡ Features & Capabilities

- 🛡️ **Zero-Execution Sandbox:** Analyzes commands strictly via static parsing and inference; commands are never run on the server or client.
- 🧠 **Open-Weight Reasoning:** Powered by `openai/gpt-oss-20b` running on Groq's high-speed LPU inference engine for near-instant subshell deconstruction.
- 🔒 **Deterministic Rule Safeguards:** Zero-hallucination static guardrails for fork bombs, recursive root wipes (`rm -rf /`), raw disk writes (`dd of=/dev/sdX`), insecure permissions (`chmod 777`), and unverified remote curl pipes (`curl | bash`).
- 👻 **Spectral Commentary:** Witty, spooky developer horror commentary accompanying technical severity ratings without sacrificing rigor.
- 📋 **1-Click Safer Alternatives:** Offers non-destructive or confirmed command alternatives with one-click clipboard copying.
- 📊 **Anonymous Session History:** Isolated session archiving that tracks risk metrics (Critical, High, Medium, Low) without leaking queries across different users.
- 🕯️ **Offline Resiliency:** Automatic fallback to local deterministic rules if Groq is unreachable or database is offline.

---

## 🎨 Haunted Terminal Aesthetic & UI/UX

Designed with a carefully curated dark Halloween aesthetic:
- **Color Palette:** Near-black backgrounds (`#07090e`), charcoal translucent panels (`#0e121b`), neon emerald terminal glows (`#10b981`), haunting purple accents (`#8b5cf6`), and restrained pumpkin danger indicators.
- **CRT & Ambient Effects:** Scanlines, subtle floating fog, glowing cursor prompts (`👻 >`), and interactive CSS floating ghosts.
- **Accessible Design:** WCAG-compliant color contrast, multi-channel severity indicators (distinct iconography + bold labels, not color alone), and strict `prefers-reduced-motion` compliance.

---

## 🏗️ Architecture Overview

```mermaid
graph TD
    User([Developer in Browser]) -->|Submits Command| Frontend[React + Vite + Tailwind Client]
    Frontend -->|POST /api/analyze| Express[Express.js Server]
    Express -->|Static Lexical Parsing| RuleEngine[Deterministic Rule Engine]
    RuleEngine -->|Known Signatures| Flags[Critical / High Hazards]
    Express -->|TLS Inference Request| Groq[Groq Cloud: GPT-OSS 20B]
    Groq -->|Structured JSON| Merger[Guardrail Engine & Result Combiner]
    Flags --> Merger
    Merger -->|Clamp Severity to Prevent Hallucination| Express
    Express -->|Persist Advisory| PostgreSQL[(PostgreSQL via Prisma)]
    Express -->|Return Structured Report| Frontend
```

---

## 🦇 Hacktoberfest Theme: Ghost in the Machine

The theme **"Ghost in the Machine"** challenges developers to humanize or illuminate the mysterious processes humming beneath computational systems.

In modern software development, developers regularly copy obscure commands from StackOverflow, blog posts, or CI/CD snippets—treating the shell like an unpredictable, haunted spirit that might either build their project or wipe their hard drive.

**Terminal Poltergeist** embodies the ghost inside your computer: a helpful, spooky spirit that materializes before the terminal prompt, dispels developer fears, reveals hidden traps, and ensures that dangerous commands never strike in the dark.

---

## 🌐 Open Innovation & Open-Weight AI

### 1. Why Open-Weight Models?
Terminal Poltergeist utilizes **`openai/gpt-oss-20b`** via Groq. Open-weight models are public-weights machine learning artifacts that allow the community to audit model capabilities, preserve architectural transparency, and resist monopolistic vendor lock-in.

### 2. Replaceable Architecture
The AI integration module (`server/src/services/ai.js`) conforms to standard OpenAI-compatible completions endpoints. By updating environment variables, developers can seamlessly switch to self-hosted **vLLM**, **Ollama**, or alternative open-weight models (e.g. Llama 3, Mistral) without modifying application code.

### 3. Dual Defense: Deterministic Rules + LLM
Language models alone can hallucinate or be misled by prompt injection techniques. Terminal Poltergeist couples the open-weight model with a deterministic JavaScript rule engine. Even if an adversarial prompt attempts to coerce the LLM into claiming a command is safe, the deterministic guardrail clamps the risk to **Critical** and overrides the hallucination.

### 4. Transparent Data Flow & Privacy
- Commands are evaluated advisively as static text.
- Outbound requests to Groq travel over encrypted HTTPS.
- History is partitioned by anonymous session tokens, ensuring private developer usage.

---

## ⚔️ Deterministic Security Rule Engine

| Rule ID | Category | Signature / Target | Severity |
| :--- | :--- | :--- | :--- |
| `RULE-FORK-BOMB` | Resource Exhaustion | `:(){ :\|:& };:` recursion | **Critical** |
| `RULE-ROOT-RM-RF` | Destructive Deletion | `rm -rf /`, `rm -rf /*`, `--no-preserve-root` | **Critical** |
| `RULE-RAW-DISK-WRITE`| Disk Destruction | `dd of=/dev/sd*`, `mkfs.* /dev/` | **Critical** |
| `RULE-SUDOERS-TAMPERING`| Privilege Escalation | `/etc/sudoers`, `/etc/shadow`, `NOPASSWD: ALL` | **Critical** |
| `RULE-REMOTE-PIPE-SHELL`| Remote Execution | `curl ... \| bash`, `wget ... \| sh` | **High** |
| `RULE-INSECURE-PERMISSIONS`| Permissions | `chmod -R 777`, `chmod a+rwx` | **High** |
| `RULE-MASS-PROCESS-KILL`| System Disruption | `kill -9 -1`, `killall -9 *` | **High** |
| `RULE-CREDENTIAL-EXPOSURE`| Credential Leak | AWS keys (`AKIA...`), inline tokens, private keys | **Medium** |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`
- (Optional) PostgreSQL instance running locally or via Docker

### 1. Clone the Repository
```bash
git clone https://github.com/CyborgX-hash/terminal-poltergeist.git
cd terminal-poltergeist
```

### 2. Install Dependencies
```bash
# Install root, backend, and frontend packages
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 3. Configure Backend Environment
Create `server/.env` based on `server/.env.example`:
```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/poltergeist_db
GROQ_API_KEY=your_groq_api_key_here
```
> *Note: If `GROQ_API_KEY` is not provided, the application runs automatically in offline deterministic rule mode.*

### 4. Run Database Migrations
```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
cd ..
```

### 5. Launch the Application
In terminal 1 (Backend):
```bash
cd server && npm run dev
```

In terminal 2 (Frontend):
```bash
cd client && npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🧪 Automated Testing & QA

Run the automated test suite across security rules, lexical parsers, AI guardrails, and API endpoints:

```bash
cd server
npm test
```

### Test Coverage Highlights:
- **Lexical Parsing:** Tokenization, quoted arguments, nested flags, and pipeline operators.
- **Rule Verification:** 100% detection of fork bombs, recursive root wipes, curl-pipes, raw disk writes, and AWS credentials.
- **Prompt Injection Defense:** Neutralization of jailbreak strings inside command arguments.
- **In-Memory Session Store:** Resilient CRUD and deletion tests verifying offline reliability.

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel)
1. Import repository into [Vercel](https://vercel.com).
2. Configure **Root Directory** as `client`.
3. Set **Framework Preset** to `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Set Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://terminal-poltergeist.onrender.com/api`)

### Backend Deployment (Render)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect this repository and set **Root Directory** to `server`.
3. Runtime: `Node`
4. Build Command: `npm install && npx prisma generate`
5. Start Command: `node src/index.js`
6. Add Environment Variables:
   - `PORT`: `5001`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `https://your-vercel-app.vercel.app`
   - `DATABASE_URL`: Your managed PostgreSQL connection URI
   - `GROQ_API_KEY`: Your Groq Cloud API key

### Database Provisioning (PostgreSQL)
Create a managed PostgreSQL database on Render, Supabase, Neon, or Railway. Once provisioned, copy the connection string and execute:
```bash
cd server
DATABASE_URL="your-connection-string" npx prisma migrate deploy
```

---

## 🔑 Environment Variables

| Variable | Target | Description | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend | Port for Express server | `5001` |
| `NODE_ENV` | Backend | Runtime environment | `production` |
| `CLIENT_URL` | Backend | Allowed CORS client origin | `https://terminal-poltergeist.vercel.app` |
| `DATABASE_URL` | Backend | PostgreSQL connection string | `postgresql://usr:pwd@host:5432/db` |
| `GROQ_API_KEY` | Backend | Groq Cloud API secret key | `gsk_...` |

---

## 📜 License & Disclaimers

**License:** MIT License. See [LICENSE](LICENSE) for details.

**Advisory Notice:** Terminal Poltergeist is an advisory assistant designed to identify common security mistakes and explain shell syntax. No automated static analysis tool can solve the Halting Problem or guarantee complete immunity against every complex or novel obfuscation technique. Always review shell commands and test in isolated virtual environments before running them in mission-critical environments.
