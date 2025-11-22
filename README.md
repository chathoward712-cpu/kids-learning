# Kids Learning App

## Project Overview
A pure frontend educational website designed specifically for 3-year-olds. The goal is to provide a fun, engaging, and simple interface for learning numbers and letters, with a future roadmap to expand into an encyclopedia.

## Key Requirements
- **Target Audience**: 3-year-olds (Preschoolers).
- **Core Features**:
    - **Numbers**: Interactive 0-9 number cards with audio feedback.
    - **Letters**: Interactive A-Z letter cards with audio feedback.
    - **Encyclopedia** (Planned): Categorized learning content.
- **Design Philosophy**:
    - **Vibrant & Engaging**: Use a "Candy" color palette (Bright Pink, Teal, Yellow).
    - **Interactive**: Immediate visual and audio feedback (animations, TTS).
    - **Simple Navigation**: Large buttons, minimal clicks, no complex menus.
    - **Responsive**: Works well on tablets and desktops.

## Technical Architecture

### Tech Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (with CSS Variables for theming)
- **State Management**: React `useState` (Local state is sufficient for now)
- **Routing**: Conditional rendering (Simple View state) for simplicity, scalable to React Router if needed.

### Design System
- **Colors**: Defined in `src/index.css` as CSS variables (`--color-primary`, `--color-secondary`, etc.).
- **Typography**: 'Comic Sans MS', 'Chalkboard SE', or rounded sans-serifs for readability.
- **Components**:
    - `Button`: Reusable, variant-based (primary, secondary, outline).
    - `Card`: Interactive container for learning items with hover/click effects.
    - `Grid`: Responsive layout wrapper.

### Project Structure
```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components (Button, Card, Grid)
├── features/       # Feature-specific views (Numbers, Letters)
├── App.tsx         # Main entry point & Navigation logic
├── index.css       # Global styles, variables, and animations
└── main.tsx        # React root
```

## Getting Started
1.  Install dependencies: `npm install`
2.  Start development server: `npm run dev`
3.  Build for production: `npm run build`
