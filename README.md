# Student Portfolio & Full-Stack React Client

A modern React portfolio and task management client built with Vite, featuring modular component architecture, props-based data flow, client-side routing, external REST API integration, full-stack MongoDB synchronization, route-level code splitting, Docker containerization, and AI-powered task description assistance.

- **Author:** Parita Shah
- **Roll Number:** 24AIML062
- **Course:** Advanced Web Development Frameworks (`ITUE301`)
- **Institution:** CHARUSAT — Faculty of Technology & Engineering (FTE), Dept. of AIML
- **Repository:** [https://github.com/24aiml062/awdf_portfolio](https://github.com/24aiml062/awdf_portfolio)

---

## Practicals Covered in this Repository

| Practical | Title | Core Features Implemented |
|---|---|---|
| **Practical 1** | React & Component Architecture | Vite scaffolding, 4 modular components (`Header`, `About`, `Skills`, `Footer`), props-driven data flow. |
| **Practical 2** | State Management & Routing | React Router v6 navigation (`Home`, `Projects`, `Contact`), active route indicators, `useState` toggles and controlled form input. |
| **Practical 3** | REST API Integration | Public GitHub REST API integration fetching repositories for `24aiml062` via `useEffect`, loading spinner, error message with retry button, and search filtering. |
| **Practical 6** | Full-Stack Integration | Connected React task UI to Express + MongoDB backend with live CRUD operations and persistent state. |
| **Practical 8** | Performance Optimization | Route-level code splitting with `React.lazy()` and `<Suspense fallback={...}>` on `Projects` and `Contact` routes. |
| **Practical 11** | Containerization | Multi-stage production `Dockerfile` serving optimized Vite static bundle. |
| **Practical 13** | AI API Integration | Integrated backend AI description suggestion endpoint (`POST /api/ai/generate-description`) with interactive UI trigger. |

---

## Tech Stack

- **Framework:** React 19 / Vite
- **Routing:** React Router v6
- **Styling:** Modular dark-themed CSS
- **Containerization:** Docker

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/24aiml062/awdf_portfolio.git
cd awdf_portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

### Docker Usage

```bash
docker build -t portfolio-frontend .
docker run -p 5173:5173 portfolio-frontend
```
