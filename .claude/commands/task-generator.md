# Rule: Generating the projects tasks from the project brief

## Goal

To guide an AI assistant in creating a detailed, step-by-step task list in Markdown format based on an existing project brief. The task list should help a developer know what to build and keep track of what they have built.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/tasks.md`
- **Filename:** `tasks.md`

## Process

1. **Review the project brief:** /docs/project_brief.md
2. **Analyze the brand guide and brand page:** /docs/project_style.md app/brand/page.tsx. Maku sure to reference the paths to these files at the top of the tasks file so the engineer does not forgot to look at them.
3. ** Generate Parent Tasks:** Generate the main, high-level tasks required to implement the feature (usually ≈ 5).
5. **Phase 2 – Generate Sub-Tasks:** Break down each parent task into smaller, actionable sub-tasks.
6. **Identify Relevant Files:** List potential files to create or modify under **Relevant Files**, including test files.
8. **Generate Final Output:** Assemble the parent tasks, sub-tasks, relevant files, notes, into the final Markdown structure.
9. **Save Task List:** Save the document in `/docs/tasks.md` as `tasks.md`.

## Output Format

The generated task list **must** follow this structure:

```markdown
## Relevant Files

- `path/to/potential/file1.ts` – main component for this feature
- `path/to/another/file.tsx` – API route handler for data submission
- `path/to/another/file.test.tsx` – unit tests for `another/file.tsx`
- `lib/utils/helpers.ts` – utility functions needed for calculations
- `lib/utils/helpers.test.ts` – unit tests for `helpers.ts`

## Tasks

- [ ] **1.0 Parent Task Title**
  - [ ] 1.1 Sub-task description 1.1
  - [ ] 1.2 Sub-task description 1.2
- [ ] **2.0 Parent Task Title**
  - [ ] 2.1 Sub-task description 2.1
- [ ] **3.0 Parent Task Title** (may not require sub-tasks if purely structural or configuration)
