# OpenCode-Native Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate superpowers from multi-platform (Claude Code/Codex/OpenCode) to pure OpenCode-native implementation using native skill discovery and automatic plugin enforcement.

**Architecture:** Remove all Claude Code and Codex specific code, simplify plugin to only handle session event injection (no custom tools), leverage OpenCode's native `skill` tool for discovery, update all skills to use OpenCode terminology.

**Tech Stack:** Node.js (plugin), OpenCode native skill system, OpenCode plugin events (session.created, session.compacted)

---

## Task 1: Delete Claude Code Infrastructure

**Files:**
- Delete: `.claude-plugin/` (entire directory)
- Delete: `hooks/` (entire directory)
- Delete: `commands/` (entire directory)
- Delete: `agents/` (entire directory)
- Delete: `tests/claude-code/` (entire directory)

**Step 1: Delete .claude-plugin directory**

Run: `rm -rf .claude-plugin/`
Expected: Directory removed

**Step 2: Delete hooks directory**

Run: `rm -rf hooks/`
Expected: Directory removed (SessionStart hooks no longer needed)

**Step 3: Delete commands directory**

Run: `rm -rf commands/`
Expected: Directory removed (slash commands were Claude Code specific)

**Step 4: Delete agents directory**

Run: `rm -rf agents/`
Expected: Directory removed (agent definitions were Claude Code specific)

**Step 5: Delete Claude Code tests**

Run: `rm -rf tests/claude-code/`
Expected: Directory removed

**Step 6: Verify deletions**

Run: `git status`
Expected: Shows deleted directories

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove Claude Code infrastructure"
```

---

## Task 2: Delete Codex Infrastructure

**Files:**
- Delete: `.codex/` (entire directory)
- Delete: `docs/README.codex.md`

**Step 1: Delete .codex directory**

Run: `rm -rf .codex/`
Expected: Directory removed

**Step 2: Delete Codex documentation**

Run: `rm -f docs/README.codex.md`
Expected: File removed

**Step 3: Verify deletions**

Run: `git status`
Expected: Shows deleted files

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Codex infrastructure"
```

---

## Task 3: Clean Up OpenCode Plugin Files

**Files:**
- Delete: `.opencode/package.json`
- Delete: `.opencode/bun.lock`
- Delete: `.opencode/.gitignore`
- Delete: `.opencode/INSTALL.md`
- Delete: `.opencode/node_modules/` (entire directory)
- Delete: `docs/README.opencode.md`
- Keep: `.opencode/plugin/superpowers.js` (will rewrite later)

**Step 1: Delete package.json**

Run: `rm -f .opencode/package.json`
Expected: File removed (plugin won't need dependencies)

**Step 2: Delete bun.lock**

Run: `rm -f .opencode/bun.lock`
Expected: File removed

**Step 3: Delete .gitignore**

Run: `rm -f .opencode/.gitignore`
Expected: File removed

**Step 4: Delete INSTALL.md**

Run: `rm -f .opencode/INSTALL.md`
Expected: File removed (installation will be in main README)

**Step 5: Delete node_modules**

Run: `rm -rf .opencode/node_modules/`
Expected: Directory removed

**Step 6: Delete OpenCode docs**

Run: `rm -f docs/README.opencode.md`
Expected: File removed

**Step 7: Verify only plugin file remains**

Run: `ls -la .opencode/plugin/`
Expected: Only `superpowers.js` exists

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: clean up OpenCode plugin dependencies"
```

---

## Task 4: Delete Shared Library

**Files:**
- Delete: `lib/` (entire directory)

**Step 1: Delete lib directory**

Run: `rm -rf lib/`
Expected: Directory removed (skills-core.js no longer needed)

**Step 2: Verify deletion**

Run: `ls lib/ 2>&1`
Expected: "No such file or directory"

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove shared library (no longer needed)"
```

---

## Task 5: Delete Test Directories

**Files:**
- Delete: `tests/opencode/` (entire directory)
- Delete: `tests/explicit-skill-requests/` (entire directory)
- Delete: `tests/skill-triggering/` (entire directory)
- Delete: `tests/subagent-driven-dev/` (entire directory)
- Delete: `tests/` (entire directory if empty)

**Step 1: Delete OpenCode tests**

Run: `rm -rf tests/opencode/`
Expected: Directory removed

**Step 2: Delete explicit skill request tests**

Run: `rm -rf tests/explicit-skill-requests/`
Expected: Directory removed

**Step 3: Delete skill triggering tests**

Run: `rm -rf tests/skill-triggering/`
Expected: Directory removed

**Step 4: Delete subagent driven dev tests**

Run: `rm -rf tests/subagent-driven-dev/`
Expected: Directory removed

**Step 5: Check if tests directory is empty**

Run: `ls tests/ 2>&1`
Expected: Either empty or "No such file or directory"

**Step 6: Delete tests directory if empty**

Run: `rmdir tests/ 2>/dev/null || true`
Expected: Directory removed if empty

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove platform-specific tests"
```

---

## Task 6: Delete AGENTS.md Template

**Files:**
- Delete: `AGENTS.md`

**Step 1: Delete AGENTS.md**

Run: `rm -f AGENTS.md`
Expected: File removed (was created for manual config approach, not needed with plugin)

**Step 2: Verify deletion**

Run: `ls AGENTS.md 2>&1`
Expected: "No such file or directory"

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove AGENTS.md template (plugin handles enforcement)"
```

---

## Task 7: Rewrite Plugin with Session Events Only

**Files:**
- Modify: `.opencode/plugin/superpowers.js` (complete rewrite)

**Step 1: Read current plugin**

Run: `cat .opencode/plugin/superpowers.js | head -50`
Expected: See current implementation with custom tools

**Step 2: Rewrite plugin**

Create: `.opencode/plugin/superpowers.js`

```javascript
/**
 * Superpowers plugin for OpenCode
 * 
 * Provides automatic skill enforcement via session event injection.
 * Uses OpenCode's native skill discovery system.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SuperpowersPlugin = async ({ client }) => {
  // Path to using-superpowers skill
  const superpowersRoot = path.resolve(__dirname, '../..');
  const usingSuperpowersPath = path.join(
    superpowersRoot, 
    'skills/using-superpowers/SKILL.md'
  );

  /**
   * Strip YAML frontmatter from skill content
   */
  const stripFrontmatter = (content) => {
    const lines = content.split('\n');
    let inFrontmatter = false;
    let frontmatterEnded = false;
    const contentLines = [];

    for (const line of lines) {
      if (line.trim() === '---') {
        if (inFrontmatter) {
          frontmatterEnded = true;
          continue;
        }
        inFrontmatter = true;
        continue;
      }

      if (frontmatterEnded || !inFrontmatter) {
        contentLines.push(line);
      }
    }

    return contentLines.join('\n').trim();
  };

  /**
   * Get bootstrap message for session injection
   */
  const getBootstrapMessage = (compact = false) => {
    try {
      const fullContent = fs.readFileSync(usingSuperpowersPath, 'utf8');
      const content = stripFrontmatter(fullContent);

      if (compact) {
        // Compact version for post-compaction re-injection
        return `<IMPORTANT>
You have superpowers via OpenCode's native skill system.

**Check for relevant skills BEFORE any action.** Use the native \`skill\` tool.

Core skills: brainstorming, systematic-debugging, test-driven-development, writing-plans, verification-before-completion

IF A SKILL APPLIES, YOU MUST USE IT. Load with: skill({ name: "skill-name" })
</IMPORTANT>`;
      }

      // Full version for session start
      return `<EXTREMELY_IMPORTANT>
You have superpowers.

**IMPORTANT: The using-superpowers skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT use the skill tool to load "using-superpowers" - that would be redundant. Use the skill tool only for OTHER skills.**

${content}
</EXTREMELY_IMPORTANT>`;
    } catch (error) {
      console.error('Failed to read using-superpowers skill:', error);
      return null;
    }
  };

  /**
   * Inject bootstrap content into session
   */
  const injectBootstrap = async (sessionID, compact = false) => {
    const bootstrapContent = getBootstrapMessage(compact);
    if (!bootstrapContent) return false;

    try {
      await client.session.prompt({
        path: { id: sessionID },
        body: {
          noReply: true,
          parts: [{ 
            type: "text", 
            text: bootstrapContent, 
            synthetic: true 
          }]
        }
      });
      return true;
    } catch (err) {
      console.error('Failed to inject bootstrap:', err);
      return false;
    }
  };

  return {
    event: async ({ event }) => {
      // Extract sessionID from various event structures
      const getSessionID = () => {
        return event.properties?.info?.id ||
               event.properties?.sessionID ||
               event.session?.id;
      };

      // Inject full bootstrap at session creation
      if (event.type === 'session.created') {
        const sessionID = getSessionID();
        if (sessionID) {
          await injectBootstrap(sessionID, false);
        }
      }

      // Re-inject compact bootstrap after context compaction
      if (event.type === 'session.compacted') {
        const sessionID = getSessionID();
        if (sessionID) {
          await injectBootstrap(sessionID, true);
        }
      }
    }
  };
};
```

**Step 3: Verify file was rewritten**

Run: `cat .opencode/plugin/superpowers.js | grep -c "SuperpowersPlugin"`
Expected: 1

**Step 4: Verify no custom tools**

Run: `cat .opencode/plugin/superpowers.js | grep -c "use_skill\|find_skills"`
Expected: 0

**Step 5: Commit**

```bash
git add .opencode/plugin/superpowers.js
git commit -m "feat: rewrite plugin for OpenCode-native session events"
```

---

## Task 8: Update skills/using-superpowers/SKILL.md

**Files:**
- Modify: `skills/using-superpowers/SKILL.md`

**Step 1: Read current content**

Run: `head -50 skills/using-superpowers/SKILL.md`
Expected: See current using-superpowers content

**Step 2: Replace "Skill tool" with "skill tool" (case-sensitive)**

Run: `sed -i '' 's/Skill tool/skill tool/g' skills/using-superpowers/SKILL.md`
Expected: File updated

**Step 3: Replace "`Skill`" with "`skill`"**

Run: `sed -i '' 's/`Skill`/`skill`/g' skills/using-superpowers/SKILL.md`
Expected: File updated

**Step 4: Remove "In Claude Code:" section**

Manually edit the file to remove:
```markdown
**In Claude Code:** Use the `Skill` tool. When you invoke a skill, its content is loaded and presented to you—follow it directly. Never use the Read tool on skill files.

**In other environments:** Check your platform's documentation for how skills are loaded.
```

Replace with:
```markdown
Use OpenCode's native `skill` tool. When you invoke a skill, its content is loaded and presented to you—follow it directly.
```

**Step 5: Remove tool mapping section**

Manually edit to remove entire "Tool Mapping for OpenCode:" section

**Step 6: Verify changes**

Run: `grep -c "Skill tool" skills/using-superpowers/SKILL.md`
Expected: 0 (all should be lowercase "skill tool")

**Step 7: Verify no tool mapping**

Run: `grep -c "Tool Mapping" skills/using-superpowers/SKILL.md`
Expected: 0

**Step 8: Commit**

```bash
git add skills/using-superpowers/SKILL.md
git commit -m "refactor: update using-superpowers for OpenCode-native"
```

---

## Task 9: Global Search and Replace in All Skills

**Files:**
- Modify: All `skills/*/SKILL.md` files

**Step 1: Replace "Skill tool" with "skill tool"**

Run: `find skills -name "*.md" -type f -exec sed -i '' 's/Skill tool/skill tool/g' {} \;`
Expected: All .md files updated

**Step 2: Replace "`Skill`" with "`skill`"**

Run: `find skills -name "*.md" -type f -exec sed -i '' 's/`Skill`/`skill`/g' {} \;`
Expected: All .md files updated

**Step 3: Replace "TodoWrite" with "update_plan"**

Run: `find skills -name "*.md" -type f -exec sed -i '' 's/TodoWrite/update_plan/g' {} \;`
Expected: All .md files updated

**Step 4: Replace "`TodoWrite`" with "`update_plan`"**

Run: `find skills -name "*.md" -type f -exec sed -i '' 's/`TodoWrite`/`update_plan`/g' {} \;`
Expected: All .md files updated

**Step 5: Verify Skill tool changes**

Run: `grep -r "Skill tool" skills/ | wc -l`
Expected: 0 (all should be lowercase)

**Step 6: Verify TodoWrite changes**

Run: `grep -r "TodoWrite" skills/ | wc -l`
Expected: 0 (all should be update_plan)

**Step 7: Commit**

```bash
git add skills/
git commit -m "refactor: update all skills to use OpenCode tool names"
```

---

## Task 10: Manually Update Task Tool References

**Files:**
- Modify: `skills/dispatching-parallel-agents/SKILL.md`
- Modify: `skills/subagent-driven-development/SKILL.md`
- Modify: `skills/executing-plans/SKILL.md`

**Step 1: Check for Task tool references**

Run: `grep -n "Task tool" skills/dispatching-parallel-agents/SKILL.md`
Expected: Shows line numbers with Task tool mentions

**Step 2: Update dispatching-parallel-agents**

Manually edit `skills/dispatching-parallel-agents/SKILL.md`:
- Find: "Use the Task tool"
- Replace with: "Use @mention to invoke subagents (e.g., @general, @explore)"
- Find: "Task tool invocation"
- Replace with: "@mention invocation"

**Step 3: Verify dispatching-parallel-agents**

Run: `grep -c "Task tool" skills/dispatching-parallel-agents/SKILL.md`
Expected: 0

**Step 4: Update subagent-driven-development**

Manually edit `skills/subagent-driven-development/SKILL.md`:
- Find: "Task tool"
- Replace with: "@mention subagent"
- Update examples to show @mention syntax

**Step 5: Verify subagent-driven-development**

Run: `grep -c "Task tool" skills/subagent-driven-development/SKILL.md`
Expected: 0

**Step 6: Update executing-plans**

Manually edit `skills/executing-plans/SKILL.md`:
- Find: "Task tool" references
- Replace with: "@mention" pattern

**Step 7: Verify executing-plans**

Run: `grep -c "Task tool" skills/executing-plans/SKILL.md`
Expected: 0

**Step 8: Verify no Task tool references remain**

Run: `grep -r "Task tool" skills/ | wc -l`
Expected: 0

**Step 9: Commit**

```bash
git add skills/
git commit -m "refactor: replace Task tool with @mention pattern"
```

---

## Task 11: Add/Update Frontmatter in Skills

**Files:**
- Modify: All `skills/*/SKILL.md` files (frontmatter)

**Step 1: Check current frontmatter in brainstorming**

Run: `head -10 skills/brainstorming/SKILL.md`
Expected: See frontmatter with name, description

**Step 2: Verify all skills have frontmatter**

Run: `for skill in skills/*/SKILL.md; do head -5 "$skill" | grep -q "^name:" || echo "Missing name: $skill"; done`
Expected: No output (all have name field)

**Step 3: Add compatibility field to all skills**

Manually edit each `skills/*/SKILL.md` to add:
```yaml
compatibility: opencode
```

Or use script:
```bash
for skill in skills/*/SKILL.md; do
  # Check if compatibility already exists
  if ! grep -q "^compatibility:" "$skill"; then
    # Add after description line
    sed -i '' '/^description:/a\
compatibility: opencode
' "$skill"
  fi
done
```

**Step 4: Add license field if missing**

For each skill without `license:`, add:
```yaml
license: MIT
```

**Step 5: Verify frontmatter format**

Run: `head -10 skills/brainstorming/SKILL.md`
Expected: See name, description, compatibility, license fields

**Step 6: Verify all skills updated**

Run: `grep -L "^compatibility: opencode" skills/*/SKILL.md`
Expected: No output (all have compatibility field)

**Step 7: Commit**

```bash
git add skills/
git commit -m "feat: add OpenCode compatibility to all skill frontmatter"
```

---

## Task 12: Rewrite README.md

**Files:**
- Modify: `README.md`

**Step 1: Backup current README**

Run: `cp README.md README.md.backup`
Expected: Backup created

**Step 2: Read current README**

Run: `head -50 README.md`
Expected: See current multi-platform content

**Step 3: Rewrite README**

Create: `README.md`

```markdown
# Superpowers for OpenCode

A complete software development workflow built on composable skills for OpenCode.

## What is Superpowers?

Superpowers is a collection of proven development workflows packaged as OpenCode skills. It guides AI agents through systematic processes for design, planning, implementation, testing, and debugging.

## How It Works

Superpowers leverages OpenCode's native skill system with automatic enforcement:

1. **Native skill discovery** - Skills are discovered via OpenCode's native `skill` tool
2. **Automatic enforcement** - Plugin injects "using-superpowers" guidance on session start
3. **Zero configuration** - Just install and it works

### The Workflow

1. **brainstorming** - Refines ideas through questions, explores alternatives, validates design
2. **writing-plans** - Breaks work into bite-sized tasks with verification steps
3. **test-driven-development** - Enforces RED-GREEN-REFACTOR cycle
4. **systematic-debugging** - 4-phase root cause process
5. **verification-before-completion** - Ensures work is actually complete

## Installation

### Quick Install

```bash
# 1. Clone superpowers to OpenCode config directory
git clone https://github.com/jjjona/opencode-superpowers ~/.config/opencode/superpowers

# 2. Symlink plugin for automatic enforcement
ln -sf ~/.config/opencode/superpowers/.opencode/plugin/superpowers.js ~/.config/opencode/plugins/superpowers.js

# 3. Symlink skills directory for native OpenCode discovery
ln -sf ~/.config/opencode/superpowers/skills ~/.config/opencode/skills
```

### Verify Installation

Start OpenCode and try loading a skill:

```
skill({ name: "brainstorming" })
```

You should see the brainstorming skill content loaded.

The plugin automatically ensures skills are used when appropriate - no manual configuration needed!

## Usage

Skills are loaded automatically when needed via the plugin's enforcement. You can also manually load skills:

```
skill({ name: "systematic-debugging" })
```

### Available Skills

**Process & Planning:**
- `brainstorming` - Interactive design refinement
- `writing-plans` - Create implementation plans
- `executing-plans` - Execute plans in batches

**Development & Testing:**
- `test-driven-development` - RED-GREEN-REFACTOR cycle
- `verification-before-completion` - Verify before claiming done

**Debugging & Quality:**
- `systematic-debugging` - Root cause analysis
- `requesting-code-review` - Pre-merge review
- `receiving-code-review` - Respond to feedback

**Workflow & Collaboration:**
- `using-git-worktrees` - Parallel development branches
- `finishing-a-development-branch` - Merge/PR decisions
- `dispatching-parallel-agents` - Concurrent work
- `subagent-driven-development` - Fast iteration

**Meta:**
- `writing-skills` - Create new skills

## Updating

```bash
cd ~/.config/opencode/superpowers
git pull
```

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

## Contributing

1. Fork https://github.com/jjjona/opencode-superpowers
2. Create a branch for your skill
3. Follow the `writing-skills` skill
4. Submit a PR

See `skills/writing-skills/SKILL.md` for the complete guide.

## Sponsorship

If Superpowers has helped you, consider [sponsoring Jesse's opensource work](https://github.com/sponsors/obra).

## License

MIT License - see LICENSE file for details

## Support

- **Issues**: https://github.com/jjjona/opencode-superpowers/issues
- **Original**: https://github.com/obra/superpowers
```

**Step 4: Verify new README**

Run: `grep -c "OpenCode" README.md`
Expected: Multiple matches

**Step 5: Verify no Claude Code references**

Run: `grep -c "Claude Code\|Codex" README.md`
Expected: 0

**Step 6: Remove backup**

Run: `rm README.md.backup`
Expected: Backup removed

**Step 7: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for OpenCode-native installation"
```

---

## Task 13: Update RELEASE-NOTES.md

**Files:**
- Modify: `RELEASE-NOTES.md`

**Step 1: Read first 50 lines**

Run: `head -50 RELEASE-NOTES.md`
Expected: See current release notes

**Step 2: Add new section at top**

Prepend to file:

```markdown
# Release Notes

## 5.0.0 - OpenCode Native (2026-01-21)

**BREAKING CHANGE:** This release removes support for Claude Code and Codex, focusing exclusively on OpenCode.

### Major Changes

- **Removed Claude Code support** - Deleted `.claude-plugin/`, hooks, commands, agents
- **Removed Codex support** - Deleted `.codex/` directory
- **Simplified plugin** - Removed custom tools, using OpenCode's native `skill` tool
- **Automatic enforcement** - Plugin injects "using-superpowers" on session start
- **Zero configuration** - No manual AGENTS.md editing required
- **Updated all skills** - Changed `Skill` tool to `skill` tool
- **Native skill discovery** - Uses OpenCode's built-in skill system

### Migration from 4.x

If you were using superpowers with OpenCode on 4.x:

1. Remove old installation:
   ```bash
   rm -rf ~/.config/opencode/superpowers
   rm ~/.config/opencode/plugin/superpowers.js
   rm ~/.config/opencode/skills
   ```

2. Follow new installation instructions in README.md

### Why This Change?

The multi-platform architecture added unnecessary complexity. OpenCode's native skill system provides everything we need. This change:

- Eliminates custom tools (`use_skill`, `find_skills`)
- Reduces maintenance burden
- Provides tighter OpenCode integration
- Maintains automatic enforcement (like Claude Code)
- Simplifies installation
- Makes skills more reliable

### What Changed for Users?

**Installation is even simpler:**
- Before: Multiple steps with custom tool setup
- After: Just 3 symlinks, automatic enforcement

**User experience is unchanged:**
- Skills still enforce automatically
- No manual configuration needed
- Same workflow as before

---

# Historical Release Notes (Pre-5.0)

[Existing content below...]
```

**Step 3: Verify addition**

Run: `head -20 RELEASE-NOTES.md`
Expected: See new 5.0.0 section

**Step 4: Commit**

```bash
git add RELEASE-NOTES.md
git commit -m "docs: add 5.0.0 release notes for OpenCode-native migration"
```

---

## Task 14: Update .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Read current .gitignore**

Run: `cat .gitignore`
Expected: See current gitignore content

**Step 2: Rewrite .gitignore**

Create: `.gitignore`

```gitignore
# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
```

**Step 3: Verify new .gitignore**

Run: `cat .gitignore`
Expected: See clean, minimal gitignore

**Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: simplify .gitignore for OpenCode-only"
```

---

## Task 15: Clean Up docs/ Directory

**Files:**
- Keep: `docs/plans/` (all implementation plans)
- Delete: `docs/windows/` (Claude Code specific)
- Review: `docs/testing.md` (keep if relevant)

**Step 1: Check docs directory**

Run: `ls -la docs/`
Expected: See current docs structure

**Step 2: Delete windows directory if exists**

Run: `rm -rf docs/windows/`
Expected: Directory removed

**Step 3: Review testing.md**

Run: `head -20 docs/testing.md`
Expected: See content (decide if relevant to OpenCode)

**Step 4: Delete testing.md if Claude-specific**

Run: `grep -c "Claude Code" docs/testing.md`
If > 0: `rm docs/testing.md`
Expected: File removed if Claude Code specific

**Step 5: Verify docs structure**

Run: `ls -la docs/`
Expected: Only `plans/` directory remains

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: clean up docs directory"
```

---

## Task 16: Remove Empty Directories

**Files:**
- Delete: Any empty directories

**Step 1: Find empty directories**

Run: `find . -type d -empty -not -path "./.git/*"`
Expected: List of empty directories

**Step 2: Remove empty directories**

Run: `find . -type d -empty -not -path "./.git/*" -delete`
Expected: Empty directories removed

**Step 3: Verify no empty directories**

Run: `find . -type d -empty -not -path "./.git/*"`
Expected: No output

**Step 4: Commit if changes**

```bash
git add -A
git commit -m "chore: remove empty directories"
```

---

## Task 17: Verify Final Directory Structure

**Files:**
- Verify: Complete repository structure

**Step 1: List top-level structure**

Run: `ls -la`
Expected: See .git, .gitignore, .opencode, LICENSE, README.md, RELEASE-NOTES.md, docs, skills

**Step 2: Verify .opencode structure**

Run: `ls -la .opencode/`
Expected: Only `plugin/` directory

**Step 3: Verify .opencode/plugin structure**

Run: `ls -la .opencode/plugin/`
Expected: Only `superpowers.js` file

**Step 4: Verify skills structure**

Run: `ls skills/`
Expected: List of skill directories

**Step 5: Verify docs structure**

Run: `ls -la docs/`
Expected: Only `plans/` directory

**Step 6: Count total files**

Run: `git ls-files | wc -l`
Expected: Significantly fewer files than before

**Step 7: Generate structure tree**

Run: `tree -L 2 -I '.git' .`
Expected: Clean directory tree

**No commit needed** - verification only

---

## Task 18: Test Installation Process

**Files:**
- Test: Installation in clean environment

**Step 1: Clean OpenCode config**

Run: `rm -rf ~/.config/opencode/superpowers ~/.config/opencode/plugins/superpowers.js ~/.config/opencode/skills`
Expected: Removed previous installation

**Step 2: Clone repository**

Run: `git clone https://github.com/jjjona/opencode-superpowers ~/.config/opencode/superpowers`
Expected: Repository cloned (use local path for testing: `cp -r . ~/.config/opencode/superpowers`)

**Step 3: Symlink plugin**

Run: `ln -sf ~/.config/opencode/superpowers/.opencode/plugin/superpowers.js ~/.config/opencode/plugins/superpowers.js`
Expected: Symlink created

**Step 4: Verify plugin symlink**

Run: `ls -la ~/.config/opencode/plugins/superpowers.js`
Expected: Shows symlink to superpowers plugin

**Step 5: Symlink skills**

Run: `ln -sf ~/.config/opencode/superpowers/skills ~/.config/opencode/skills`
Expected: Symlink created

**Step 6: Verify skills symlink**

Run: `ls -la ~/.config/opencode/skills`
Expected: Shows symlink to superpowers/skills

**Step 7: List skills**

Run: `ls ~/.config/opencode/skills/`
Expected: Shows all skill directories

**No commit needed** - testing only

---

## Task 19: Validate Plugin Loads

**Files:**
- Test: Plugin loading in OpenCode

**Step 1: Start OpenCode (if available)**

Run: `opencode --version`
Expected: OpenCode version displayed

**Step 2: Check plugin file syntax**

Run: `node --check .opencode/plugin/superpowers.js`
Expected: No syntax errors

**Step 3: Test plugin exports**

Run: `node --input-type=module -e "import('./opencode/plugin/superpowers.js').then(m => console.log(Object.keys(m)))"`
Expected: Shows "SuperpowersPlugin" export

**Step 4: Verify using-superpowers exists**

Run: `ls skills/using-superpowers/SKILL.md`
Expected: File exists

**Step 5: Test stripFrontmatter logic**

Manually verify frontmatter stripping works:
```bash
node --input-type=module -e "
const content = '---\nname: test\n---\nContent here';
const lines = content.split('\n');
let inFrontmatter = false;
let frontmatterEnded = false;
const contentLines = [];
for (const line of lines) {
  if (line.trim() === '---') {
    if (inFrontmatter) { frontmatterEnded = true; continue; }
    inFrontmatter = true;
    continue;
  }
  if (frontmatterEnded || !inFrontmatter) {
    contentLines.push(line);
  }
}
console.log(contentLines.join('\n').trim());
"
```
Expected: "Content here"

**No commit needed** - testing only

---

## Task 20: Validate All Skills Load

**Files:**
- Test: All SKILL.md files are valid

**Step 1: Check all skills have frontmatter**

Run: `for skill in skills/*/SKILL.md; do grep -q "^name:" "$skill" || echo "Missing frontmatter: $skill"; done`
Expected: No output (all have frontmatter)

**Step 2: Check no Skill tool references**

Run: `grep -r "Skill tool" skills/`
Expected: No matches (all should be "skill tool")

**Step 3: Check no TodoWrite references**

Run: `grep -r "TodoWrite" skills/`
Expected: No matches (all should be "update_plan")

**Step 4: Check no Task tool references**

Run: `grep -r "Task tool" skills/`
Expected: No matches (should be "@mention")

**Step 5: List all skills**

Run: `for skill in skills/*/SKILL.md; do basename $(dirname "$skill"); done`
Expected: List of all skill names

**Step 6: Count skills**

Run: `ls -1 skills/*/SKILL.md | wc -l`
Expected: 14 (total number of skills)

**No commit needed** - validation only

---

## Task 21: Create Final Migration Commit

**Files:**
- Verify: All changes committed

**Step 1: Check git status**

Run: `git status`
Expected: "nothing to commit, working tree clean"

**Step 2: Review commit history**

Run: `git log --oneline -20`
Expected: See all migration commits

**Step 3: Count commits**

Run: `git rev-list --count HEAD`
Expected: Shows total commits

**Step 4: Verify remote**

Run: `git remote -v`
Expected: Shows origin pointing to jjjona/opencode-superpowers

**Step 5: Create tag**

Run: `git tag -a v5.0.0 -m "OpenCode-native migration - breaking change"`
Expected: Tag created

**Step 6: Verify tag**

Run: `git tag -l`
Expected: Shows v5.0.0

**Step 7: Show tag details**

Run: `git show v5.0.0`
Expected: Shows tag information

**No push yet** - will be done after final review

---

## Task 22: Final Documentation Review

**Files:**
- Review: README.md, RELEASE-NOTES.md

**Step 1: Review README installation**

Run: `sed -n '/## Installation/,/## Usage/p' README.md`
Expected: Clear installation instructions

**Step 2: Verify GitHub URLs in README**

Run: `grep -n "github.com/obra" README.md`
Expected: Only in sponsorship link, not in installation

**Step 3: Verify correct repo URLs**

Run: `grep -n "github.com/jjjona/opencode-superpowers" README.md`
Expected: Shows line numbers with correct URLs

**Step 4: Review RELEASE-NOTES**

Run: `head -80 RELEASE-NOTES.md`
Expected: See 5.0.0 section with migration notes

**Step 5: Check for broken links**

Run: `grep -o 'https://[^)]*' README.md`
Expected: List of all URLs

**Step 6: Verify no Claude Code mentions in README**

Run: `grep -i "claude code\|codex" README.md`
Expected: No matches (except in sponsorship)

**No commit needed** - review only

---

## Execution Complete

All tasks completed. Ready for:

1. **Push to GitHub:**
   ```bash
   git push origin main
   git push origin v5.0.0
   ```

2. **Create GitHub Release:**
   - Go to https://github.com/jjjona/opencode-superpowers/releases/new
   - Tag: v5.0.0
   - Title: "OpenCode Native - v5.0.0"
   - Body: Copy from RELEASE-NOTES.md

3. **Update Repository Settings:**
   - Description: "Superpowers for OpenCode - Systematic development workflows"
   - Topics: opencode, skills, tdd, debugging, workflows
   - Remove: claude-code, codex tags

4. **Test Installation:**
   - Follow README.md instructions from scratch
   - Verify plugin loads and injects bootstrap
   - Test loading skills via `skill({ name: "..." })`

---

## Rollback Plan

If issues discovered:

```bash
# Revert all commits
git reset --hard <commit-before-migration>

# Or revert tag
git tag -d v5.0.0
git push origin :refs/tags/v5.0.0
```
