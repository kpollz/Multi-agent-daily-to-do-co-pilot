# MAPE - Multi-Agent Personal Executive

A sophisticated web application for intelligent task planning and execution, built with Next.js 14, TypeScript, and Tailwind CSS. MAPE helps users plan their day through an AI-powered three-phase workflow.

## Features

### Phase 1: The Intention
- Clean, focused input interface for daily goals
- AI-powered task planning simulation
- Natural language input for describing daily priorities

### Phase 2: The Schedule (Review & Edit)
- Interactive timeline view of tasks
- Drag-and-drop task reordering
- Task editing with optional "reason for change" tracking
- Manual task creation
- AI summary of generated schedule

### Phase 3: Execution & Tracking
- Real-time task tracking with current task highlighting
- Visual task completion markers
- Progress tracking and daily summary
- Celebration screen upon completion

### Authentication
- Mock authentication system
- Session management
- User profile display

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Drag-and-Drop**: @dnd-kit

## Project Structure

```
├── app/
│   ├── (auth)/           # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (app)/            # Main app routes
│   │   └── app/
│   │       ├── page.tsx  # Phase 1 - Intention
│   │       ├── schedule/ # Phase 2 - Schedule
│   │       └── execution/# Phase 3 - Execution
│   ├── api/              # API routes (for FastAPI integration)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home redirect
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   ├── schedule/         # Schedule-specific components
│   └── execution/        # Execution-specific components
├── contexts/             # React contexts (Auth, App state)
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   └── mock.ts           # Mock data and API functions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

- **Email**: user@example.com
- **Password**: password

## API Integration

The frontend is designed to integrate with a Python FastAPI backend. Mock functions are provided in `lib/mock.ts`:

- `login(credentials)` - User authentication
- `signup(credentials)` - User registration
- `getPlan(input: string)` - Generate daily plan from AI
- `logout()` - End user session

To integrate with your FastAPI backend:

1. Replace mock functions with real API calls using the `fetch` API or a library like `axios`
2. Use the `/api` directory for Next.js API routes if needed for CORS handling
3. Update the mock data and types as needed for your backend

## Key Components

### UI Components
- `Button` - Primary, secondary, outline, and danger variants
- `Input` - Form input with label and error handling
- `Textarea` - Multi-line text input
- `Card` - Reusable card component with hover and glow effects
- `Modal` - Dialog component for task editing
- `Badge` - Status badges
- `LoadingSpinner` - Animated loading indicator

### Page Components
- `IntentionPage` - Daily goal input
- `SchedulePage` - Drag-and-drop task management
- `ExecutionPage` - Real-time task tracking

## State Management

The application uses React Context for state management:

- `AuthContext` - Authentication and session state
- `AppContext` - App phase, tasks, and summary state

## Styling

The application uses a custom dark theme inspired by productivity tools like Linear and Notion:

- Background colors for depth and hierarchy
- Primary color: Indigo (#6366f1)
- Success, warning, and danger semantic colors
- Smooth animations using Framer Motion

## Future Enhancements

- Real-time synchronization with backend
- Task reminders and notifications
- Calendar view integration
- Task dependencies
- Progress analytics
- Team collaboration features

## License

This project is part of a competition submission.