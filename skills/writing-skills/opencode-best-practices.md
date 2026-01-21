# OpenCode Best Practices for Skills

This guide provides best practices for writing effective skills that work well with OpenCode.

## Overview of Skills in OpenCode

Skills are reusable bundles of knowledge, procedures, and workflows that the AI agent can use to complete tasks more effectively. A well-designed skill:

- **Solves a specific problem** - Focused scope with clear boundaries
- **Is discoverable** - Clear naming and descriptions help the agent find relevant skills
- **Is learnable** - Well-structured content that's easy to understand
- **Is reusable** - Principles that apply across multiple projects and contexts
- **Is maintainable** - Clear structure and documentation for future updates

## Skill File Structure and Frontmatter

OpenCode skills have a consistent structure:

```
.opencode/skills/skill-name/
├── SKILL.md          # Main skill content
├── SKILL.yaml        # Metadata (optional)
└── examples/         # Example files (optional)
```

### SKILL.md Structure

The main skill file should have:

1. **Title** - Clear, action-oriented name (e.g., "Writing Skills")
2. **When to Use** - Scenarios that trigger this skill
3. **Core Principles** - Philosophy and approach
4. **The Process** - Step-by-step workflow
5. **Common Patterns** - Patterns that appear in the skill's domain
6. **Troubleshooting** - Solutions for common issues
7. **Examples** - Real-world applications

### Frontmatter (Optional SKILL.yaml)

```yaml
name: Skill Name
description: What this skill helps with
tags:
  - tag1
  - tag2
category: Category name
when_to_use: "Situations requiring this skill"
```

## Writing Effective Descriptions

Good descriptions help the AI agent discover skills at the right time:

- **Be specific** - Describe the exact problem, not generic scenarios
- **Use action verbs** - "Debugging" rather than "About debugging"
- **Include context** - What makes this skill different from related ones
- **Add triggers** - Keywords that signal when the skill applies

Example:
```
Use when you need to write new skills that will be used by the AI agent.
Consider using this skill when:
- Creating a new skill from scratch
- Editing existing skills
- Adding examples to a skill
- Verifying skills work before deployment
```

## Skill Discovery Optimization (SDO)

Skill Discovery Optimization helps the AI agent find the right skills at the right time. Here are key techniques:

### 1. Clear Naming

- Use consistent prefixes for related skills
- Example: `systematic-debugging`, `writing-skills`, `dispatching-parallel-agents`
- Avoid abbreviations that obscure meaning

### 2. Descriptive Sections

Organize content with clear headers that signal intent:

```markdown
## When to Use
## Overview
## The Process
## Examples
## Troubleshooting
```

### 3. Cross-References

Link between related skills to help the agent navigate:

```markdown
Related skills:
- another-skill - When you need X
- partner-skill - For the next step
```

### 4. Keywords and Terminology

Use consistent terminology throughout your skills:
- Define specialized terms
- Reference broader categories
- Create semantic connections

Example:
```markdown
This skill is for **task execution** and complements:
- Planning skills (defining what to do)
- Verification skills (confirming it's correct)
- Completion skills (finalizing the work)
```

### 5. Purpose Statements

Make the purpose unmistakable in the opening:

```markdown
# Systematic Debugging
Use this skill when debugging anything - unexpected behavior, test failures,
or errors. This systematic approach prevents guessing and ensures you find
root causes efficiently.
```

## Testing and Validation Approaches

### 1. Skill Clarity Testing

Before deploying a skill, verify:

- **Can someone unfamiliar with the skill understand it?** - Read it fresh
- **Are all steps actionable?** - No vague instructions
- **Do examples match the instructions?** - Consistency check
- **Are all cross-references valid?** - No broken links

### 2. Scenario Testing

Test your skill against real scenarios:

- **Does the skill apply to the scenarios you described?** - Validation
- **Does the skill help with related scenarios?** - Coverage check
- **Are there scenarios it shouldn't apply to?** - Boundary definition

### 3. Integration Testing

Verify the skill works with OpenCode conventions:

- All paths use OpenCode format (`~/.config/opencode/skills/`)
- References to conventions use `AGENTS.md`
- Tool references match available OpenCode tools
- No vendor-specific terminology (use "the AI agent" instead of product names)

## Common Patterns and Anti-Patterns

### Effective Patterns

**Pattern: The Workflow**
```markdown
## The Process

### Step 1: Preparation
[What to do first]

### Step 2: Execution  
[Main work steps]

### Step 3: Verification
[How to confirm success]
```

**Pattern: Decision Trees**
```markdown
## Choosing the Right Approach

- If condition A: Use approach X
- If condition B: Use approach Y
- If unsure: Default to approach Z
```

**Pattern: When NOT to Use**
```markdown
## When NOT to Use This Skill

This skill is not for:
- Scenario X (use other-skill instead)
- Scenario Y (requires different approach)
```

### Anti-Patterns to Avoid

- **Vague instructions** - "Do the right thing" (instead: "Follow step 1, 2, 3")
- **Assuming knowledge** - Not explaining specialized terms
- **Too many responsibilities** - Skills should be focused
- **Missing context** - Not explaining why steps matter
- **No examples** - Theory without practical application

## OpenCode-Specific Features

### Working with AGENTS.md

Skills often reference project conventions in `AGENTS.md`:

```markdown
For project-specific rules, see AGENTS.md in the project root.
Follow any rules about code style, naming, or processes.
```

### Tool Availability

Reference OpenCode tools that skills can use:

- File operations (read, write, edit)
- Git operations (commit, branch, push)
- Code execution (bash, node, python)
- External APIs (through OpenCode tool system)

Example:
```markdown
This skill uses the AI agent's access to:
- The file system (read and write)
- Git repository operations
- Terminal commands
```

### Handling Agent Types

OpenCode supports multiple agent types. Consider:

- **General agents** - Can do anything
- **Specialized agents** - Good at specific domains

Clarify when to use specialized agents:

```markdown
This task can be parallelized. Use the dispatching-parallel-agents skill
to assign independent work to multiple agents simultaneously.
```

### Environment Variables

When skills reference configuration:

```markdown
Configuration is stored in `~/.config/opencode/AGENTS.md` for global rules
or `.opencode/AGENTS.md` for project-specific rules.
```

## Best Practices Summary

1. **Focus** - One skill, one clear purpose
2. **Clarity** - Instructions that are unmistakable
3. **Structure** - Consistent, scannable layout
4. **Examples** - Real scenarios showing the skill in action
5. **Openness** - Vendor-neutral, works with any AI agent
6. **Integration** - Follows OpenCode conventions
7. **Maintenance** - Easy to update and improve

## References

- [OpenCode Documentation](https://opencode.ai/docs)
- [OpenCode Skills Guide](https://opencode.ai/docs/skills)
- [AGENTS.md Convention](https://opencode.ai/docs/rules)

---

**Last updated:** 2026-01-21  
**Framework:** OpenCode Native
