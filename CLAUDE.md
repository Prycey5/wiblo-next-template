# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev                # Start development server with Turbopack on http://localhost:3000
pnpm build              # Build production bundle with Turbopack
pnpm start              # Start production server
pnpm lint               # Run ESLint for code linting
```

### TypeScript
```bash
npx tsc --noEmit        # Type check without emitting files
```

## Architecture

This is a Next.js 15.5.2 application using the App Router pattern with React 19.1.0. The project is set up as a template with comprehensive UI components.

### Key Technologies
- **Framework**: Next.js with Turbopack
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui components (pre-installed in `components/ui/`)
- **Forms**: React Hook Form with Zod validation
- **Package Manager**: pnpm

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - Uses Geist font family
  - Global styles in `app/globals.css`
- `components/ui/` - Complete shadcn/ui component library (30+ components)
- `lib/utils.ts` - Contains `cn()` utility for merging Tailwind classes

### Path Aliases
- `@/*` maps to the project root
- Common imports: `@/components/ui/`, `@/lib/utils`

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- JSX: preserve (for Next.js optimization)

### Component Library
All shadcn/ui components are pre-installed and configured with the "new-york" style. Components use Radix UI primitives with Tailwind styling. The `cn()` utility from `lib/utils.ts` should be used for className merging.

## Rules
- Before you do any work, MUST view files in .claude/tasks/context_session_x.md file to get the full context (x being the id of the session we are operate, if file doesnt exist, then create one)
- context_session_x.md should contain most of context of what we did, overall plan, and sub agents will continusly add context to the file
- After you finish the work, MUST update the .claude/tasks/context_session_x.md file to make sure others can get full context of what you did

### Sub agents

Sub agents will do research about the implementation, but you will do the actual implementation;
When passing task to sub agent, make sure you pass the context file, e.g. '.claude/tasks/session_context_x.md',
After each sub agent finish the work, make sure you read the related documentation they created to get full context of the plan before you start executing


Never write obvious comments.

ASSUME THE SERVER IS ALREADY RUNNING -- you do not need to run it ever.
