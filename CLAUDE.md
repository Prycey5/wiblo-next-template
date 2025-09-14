# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev                # Start development server with Turbopack on http://localhost:3000
pnpm build              # Build production bundle with Turbopack
pnpm start              # Start production server
```


### Preferred checks (use these by default)
```bash
# Lint + type-check (preferred after every edit)
pnpm run check
```

## Available Agents

This project has specialized agents configured for streamlined development:

### Agent Names:
- **project-brief-generator** - Project brief creation
- **style-guide-generator** - Style guide and brand page generation
- **project-task-generator** - Task list generation from briefs

### Agent Descriptions:

#### project-brief-generator
Creates comprehensive project briefs for local business websites. Gathers business information, analyzes SEO requirements, defines website architecture, and creates detailed implementation plans. Use at the start of new website projects or when planning redesigns.

#### style-guide-generator
Generates comprehensive style guides and brand pages for local business websites. Creates color palettes, typography systems, UI components, and working brand pages that demonstrate the style guide in action. Use when setting up visual identity or creating brand documentation.

#### project-task-generator
Creates comprehensive task lists from project briefs. Analyzes project briefs and generates detailed, actionable tasks. Use after creating project brief and style guide, or when updating task lists based on requirement changes.

## Common Project Workflow

### Starting a New Project:

1. **Check Template Resources** (if cloning existing site)
   - First check `docs/template_to_clone/` folder for any existing templates or reference materials
   - Review any provided design files or brand guidelines

2. **Generate Project Brief**
   - Use `project-brief-generator` agent to create comprehensive project documentation
   - This will gather business requirements, SEO needs, and technical specifications
   - Output saved to `.claude/docs/project-brief.md`

3. **Create Style Guide**
   - Use `style-guide-generator` agent to establish visual identity
   - Generates color schemes, typography, and component styles
   - Creates working brand page at `app/brand/page.tsx`
   - Output saved to `.claude/docs/style-guide.md`

4. **Generate Task List**
   - Use `project-task-generator` agent to create actionable tasks from brief
   - Breaks down project into manageable implementation steps
   - Output saved to `.claude/tasks/project-tasks.md`

5. **Implementation**
   - Work through generated tasks systematically
   - Run `pnpm run check` after each major component/feature
   - Update context files as you progress
   - Build project with `pnpm build` after completing major milestones

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
- Always do a pnpm run check after you finish tasks and update the tasks file

### Sub Agents

**Available sub agents:** `project-brief-generator`, `style-guide-generator`, `project-task-generator`

Sub agents will do research about the implementation, but you will do the actual implementation.

When working with sub agents:
- Pass the context file when invoking (e.g. '.claude/tasks/session_context_x.md')
- After each sub agent completes, read their generated documentation before implementing
- Sub agents create documentation in `.claude/docs/` and task lists in `.claude/tasks/`


Never write obvious comments.

ASSUME THE SERVER IS ALREADY RUNNING -- you do not need to run it ever. Doing a build after finishing parent steps is helpful though
