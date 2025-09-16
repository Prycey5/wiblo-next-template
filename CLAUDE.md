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
- **component-designer** - Component implementation and enhancement

### Agent Descriptions:

#### project-brief-generator
Creates comprehensive project briefs for local business websites. Gathers business information, analyzes SEO requirements, defines website architecture, and creates detailed implementation plans. Use at the start of new website projects or when planning redesigns.

#### style-guide-generator
Generates comprehensive style guides and brand pages for local business websites. Creates color palettes, typography systems, UI components, and working brand pages that demonstrate the style guide in action. Use when setting up visual identity or creating brand documentation.

#### project-task-generator
Creates comprehensive task lists from project briefs. Analyzes project briefs and generates detailed, actionable tasks. Use after creating project brief and style guide, or when updating task lists based on requirement changes.

#### component-designer
Designs and implements React/Next.js components following the project's established design system. This agent should be used when:
- Creating NEW sections or components (not when copying existing templates)
- Implementing custom UI features from scratch
- Adding micro-interactions or animations to components
- Enhancing existing components with new functionality
- Building complex interactive elements
- Adapting pre-built components to match brand guidelines

DO NOT use this agent when:
- Directly copying or cloning existing template code
- Making simple text or content changes
- Updating basic styles or colors
- Performing routine maintenance tasks

IMPORTANT IMAGE HANDLING:
- ALWAYS use actual images from the template (docs/template_to_clone/) when available
- Extract image URLs from content.html in the template folder
- If we do not have actual images, use placeholder images from Unsplash or other stock photo sites
- All images should reference the actual URLs from the template

## Common Project Workflow

### Scraping a Website with Firecrawl

To scrape a website and save it as a template:
```bash

# Scrape with custom output directory
node scrape.js https://example.com -o docs/template_to_clone


```

**Requirements:**
- Set `FIRECRAWL_API_KEY` in your `.env` file
- Get API key from: https://firecrawl.dev

**Output files:**
- `content.html` - Full HTML with actual image URLs
- `content.md` - Markdown version of content
- `metadata.json` - SEO metadata and page info
- `screenshot.png` - Page screenshot (if available)

### Starting a New Project:

1. **Scrape Target Website** (if cloning)
   - Run `node scrape.js [URL] -o docs/template_to_clone`
   - This creates template files with all content and actual image URLs

2. **Check Template Resources**
   - Check `docs/template_to_clone/` for any existing templates or reference materials
   - Extract all image URLs from `content.html` - these are the ACTUAL images to use
   - IMPORTANT: Never substitute template images with stock photos or placeholders

3. **Generate Project Brief**
   - Use `project-brief-generator` agent to create comprehensive project documentation
   - This will gather business requirements, SEO needs, and technical specifications
   - Output saved to `.claude/docs/project-brief.md`

4. **Create Style Guide**
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
   - Use `component-designer` agent when creating NEW components or sections
   - Run `pnpm run check` after each major component/feature
   - Update context files as you progress
   - Build project with `pnpm build` after completing major milestones
   - Remind the component-designer agent to use actual images from the template

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

### Image Handling Rules
- **ALWAYS use actual template images** - When cloning a template, extract and use the exact image URLs from docs/template_to_clone/content.html
- **Never use placeholder images** - Do not use Unsplash, Pexels, or any stock photo placeholders
- **Store image URLs in constants** - All image URLs should be defined in lib/constants/content.ts
- **Configure Next.js for external images** - Add required domains to next.config.ts remotePatterns
- **Decode HTML entities** - Convert &amp; to & in image URLs when extracting from HTML

### Sub Agents

**Available sub agents:** `project-brief-generator`, `style-guide-generator`, `project-task-generator`, `component-designer`

Sub agents have different responsibilities:
- **Planning agents** (project-brief-generator, style-guide-generator, project-task-generator): Do research and create documentation
- **Implementation agent** (component-designer): Actually implements components and features

When working with sub agents:
- Pass the context file when invoking (e.g. '.claude/tasks/session_context_x.md')
- Planning agents create documentation in `.claude/docs/` and task lists in `.claude/tasks/`
- component-designer should be used for NEW component creation, NOT for copying templates
- After each sub agent completes, review their output before proceeding

#### When to use component-designer:
✅ USE when:
- Creating new sections from scratch
- Building custom interactive components
- Adding animations or micro-interactions
- Implementing complex UI features
- Enhancing components with new functionality

❌ DO NOT USE when:
- Copying/cloning existing template code
- Making simple content updates
- Changing colors or basic styles
- Following a provided template exactly


Never write obvious comments.

ASSUME THE SERVER IS ALREADY RUNNING -- you do not need to run it ever. Doing a build after finishing parent steps is helpful though
