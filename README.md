# Mergy

AI-powered repository intelligence for modern software teams.

## Overview

Mergy is a repository analytics platform that helps developers understand codebases, review pull requests, and identify engineering risks using GitHub data and AI-assisted analysis.

Instead of treating repositories as collections of commits, Mergy analyzes repository structure, source files, pull requests, and development activity to provide actionable insights that support better engineering decisions.

The platform combines GitHub integration with machine learning–assisted analysis to reduce manual review effort and improve repository visibility through an intuitive web interface.

---

## Motivation

Engineering teams spend a significant amount of time understanding unfamiliar repositories, reviewing pull requests, and identifying potential issues before code reaches production.

Mergy was built to streamline these workflows by bringing repository analytics, AI-assisted code understanding, and GitHub operations into a single platform.

---

## Core Capabilities

* Repository analysis powered by GitHub APIs
* AI-assisted source code analysis
* Pull request analysis and review support
* Repository file exploration
* Pull request creation workflows
* Repository forking
* GitHub OAuth authentication
* Repository health reporting
* Interactive engineering dashboard
* PDF report generation
* Responsive web interface

---

## Architecture

Mergy follows a modern full-stack architecture built on the Next.js App Router.

```text
Client
    │
    ▼
Next.js Application
    │
    ├── Authentication
    ├── Repository Dashboard
    ├── Analysis Engine
    ├── Report Generation
    └── GitHub Integration
                │
                ▼
          GitHub REST API
```

The application separates presentation, API routes, GitHub integrations, and reusable UI components into independent modules to improve maintainability and scalability.

---

## Analysis Workflow

1. Authenticate with GitHub.
2. Select a repository.
3. Retrieve repository metadata and source files.
4. Analyze repository contents.
5. Evaluate pull requests and repository structure.
6. Generate engineering insights.
7. Export findings through downloadable reports.

---

## Repository Features

### Repository Analysis

Analyze repositories to better understand project structure, development patterns, and repository health.

### File Analysis

Inspect individual files and receive contextual AI-assisted analysis to improve code understanding.

### Pull Request Analysis

Review pull requests with repository context to identify potential issues before merging.

### Pull Request Creation

Create pull requests directly through the platform using GitHub integration.

### Repository Forking

Fork repositories without leaving the application.

### Engineering Reports

Generate downloadable reports summarizing repository insights and analysis results.

---

## Technology Stack

| Layer           | Technology           |
| --------------- | -------------------- |
| Framework       | Next.js (App Router) |
| Language        | TypeScript           |
| Runtime         | Node.js              |
| UI              | React                |
| Styling         | Tailwind CSS         |
| Components      | Radix UI             |
| Charts          | Recharts             |
| Authentication  | GitHub OAuth         |
| API Integration | GitHub REST API      |
| PDF Generation  | jsPDF                |
| Icons           | Lucide React         |
| Package Manager | Bun / npm            |

---

## Project Structure

```text
app/
 ├── api/
 │    ├── auth/
 │    ├── github/
 │    └── user/
 │
 ├── components/
 ├── hooks/
 ├── lib/
 ├── public/
 ├── styles/
 └── layout.tsx

assets/
```

The project follows the App Router architecture with server-side API routes organized by feature.

---

## Installation

Clone the repository.

```bash
git clone https://github.com/AarjanAdhikari/Mergy.git
```

Move into the project directory.

```bash
cd Mergy
```

Install dependencies.

```bash
npm install
```

or

```bash
bun install
```

---

## Configuration

Create a local environment file.

```text
.env.local
```

Configure the required GitHub credentials and application settings using the values documented in `.env.example`.

---

## Running Locally

Start the development server.

```bash
npm run dev
```

or

```bash
bun dev
```

Open the application in your browser.

```text
http://localhost:3000
```

---

## Production Build

Generate a production build.

```bash
npm run build
```

Run the production server.

```bash
npm run start
```

---

## Security

Mergy relies on GitHub OAuth for authentication and communicates with GitHub through authenticated API requests.

Sensitive credentials should be stored exclusively through environment variables and never committed to source control.

---

## Performance Considerations

The application is designed around lightweight server routes and modular React components to minimize unnecessary rendering and improve responsiveness.

Repository analysis is executed through dedicated API endpoints, allowing compute-intensive operations to remain isolated from the user interface.

---

## Design Principles

* Simplicity over complexity
* Clear engineering workflows
* Modular architecture
* Maintainable code organization
* Responsive user experience
* Minimal interface with high information density

---

## Future Development

Planned areas of expansion include:

* Multi-repository analytics
* Organization-wide insights
* Historical engineering trends
* Advanced predictive models
* Repository benchmarking
* Team collaboration features
* CI/CD integration
* Repository health scoring
* Custom reporting
* Enterprise deployment support

---

## Contributing

Contributions are welcome.

If you would like to improve the project, please open an issue to discuss the proposed change before submitting a pull request.

---

## License

This repository is currently distributed under MIT license.

---

## Author

**Aarjan Adhikari**

Computer Engineering Student • Software Engineer • AI & Machine Learning

Official Website: **https://aarjanadhikari.com.np**
