# Complete OpenCode Migration Plan

**Date:** 2026-01-21  
**Status:** Reviewed and ready for execution  
**Repository:** https://github.com/jjjona/opencode-superpowers  
**Review Document:** [2026-01-21-complete-opencode-migration-REVIEW.md](./2026-01-21-complete-opencode-migration-REVIEW.md)

## Overview

This plan outlines the complete migration from Claude/Anthropic references to OpenCode-native terminology and conventions. The goal is to make this project 100% vendor-neutral and fully aligned with OpenCode standards.

**This plan completes the migration started in** [2026-01-21-opencode-native-migration.md](./2026-01-21-opencode-native-migration.md) **by updating all references and terminology to be fully OpenCode-native.**

## Background

This project originated as a fork of Jesse Vincent's Superpowers for Claude Code. While we've made significant progress toward OpenCode compatibility, there remain numerous references to:
- Claude (the AI agent)
- Anthropic (the company)
- Claude Code specific conventions (CLAUDE.md)
- Original repository URLs (obra/superpowers)

## Research Findings

Based on official OpenCode documentation (https://opencode.ai/docs):

### OpenCode Standard Configuration Files

| Purpose | File Location | Description |
|---------|---------------|-------------|
| **Project conventions** | `AGENTS.md` | Project-specific rules committed to Git, shared with team |
| **Global conventions** | `~/.config/opencode/AGENTS.md` | Personal global rules and conventions |
| **Personal skills** | `~/.config/opencode/skills/` | User's personal skill directory |
| **Project skills** | `.opencode/skills/` | Project-specific skills |

### Claude Code Compatibility

OpenCode supports Claude Code file conventions as fallbacks:
- `CLAUDE.md` → Falls back to `AGENTS.md` if not found
- `~/.claude/CLAUDE.md` → Falls back to `~/.config/opencode/AGENTS.md`
- `~/.claude/skills/` → Falls back to `~/.config/opencode/skills/`

However, for a complete OpenCode-native port, we should use OpenCode's primary conventions.

## Scope of Changes

### Summary Statistics

- **Total files requiring updates:** 13 user-editable files
- **Claude references found:** ~100+ across all files
- **Anthropic references found:** ~8 references
- **Jesse Vincent references:** 6+ references (will be PRESERVED)
- **obra repository references:** 17+ references
- **RELEASE-NOTES.md:** 30+ historical references (will add clarifying note)

### Files by Priority

#### HIGH PRIORITY (6 tasks)
1. `skills/writing-skills/anthropic-best-practices.md` - **DELETE** (85 Claude refs + 4 Anthropic refs)
2. `skills/writing-skills/opencode-best-practices.md` - **CREATE NEW** (broken into sub-tasks)
3. `skills/writing-skills/SKILL.md` - 11 Claude refs + CSO terminology
4. `README.md` - Minimal changes (line 4 only)
5. **Post-migration testing** - Verify skills work after changes
6. **Final verification** - Search for remaining references

#### MEDIUM PRIORITY (6 files)
7. `skills/using-git-worktrees/SKILL.md` - ~6 CLAUDE.md references
8. `skills/receiving-code-review/SKILL.md` - 1 CLAUDE.md reference
9. `skills/systematic-debugging/CREATION-LOG.md` - Historical path reference
10. `skills/writing-skills/examples/CLAUDE_MD_TESTING.md` - Rename + update refs
11. `skills/writing-skills/testing-skills-with-subagents.md` - Cross-references
12. `RELEASE-NOTES.md` - Add clarifying note at top

#### LOW PRIORITY (1 file)
13. `skills/systematic-debugging/root-cause-tracing.md` - Example paths

## Transformation Reference

| Category | From | To | Rationale |
|----------|------|-----|-----------|
| **Project conventions file** | `CLAUDE.md` | `AGENTS.md` | OpenCode's standard project conventions file |
| **Global conventions path** | `~/.claude/CLAUDE.md` | `~/.config/opencode/AGENTS.md` | OpenCode's global conventions location |
| **Personal skills directory** | `~/.claude/skills` | `~/.config/opencode/skills` | OpenCode's personal skills location |
| **AI agent terminology** | "Claude" | "the AI agent" | Vendor-neutral, as requested |
| **Search optimization name** | "Claude Search Optimization (CSO)" | "Skill Discovery Optimization (SDO)" | Vendor-neutral terminology |
| **Repository URLs** | `obra/superpowers` | `jjjona/opencode-superpowers` | Current repository location |
| **Repository URLs** | `github.com/obra/superpowers` | `github.com/jjjona/opencode-superpowers` | Current repository location |
| **Jesse Vincent attribution** | ✅ PRESERVE | ✅ PRESERVE | Maintain proper attribution for original work |
| **Jesse Vincent copyright** | ✅ PRESERVE | ✅ PRESERVE | Respect original copyright (MIT License) |

## Detailed Task List

### Task 1: DELETE anthropic-best-practices.md
**Priority:** HIGH  
**File:** `skills/writing-skills/anthropic-best-practices.md`  
**Action:** Delete file entirely

**Reason:** This is Anthropic's official guide with 85+ Claude references. It's vendor-specific and should be replaced with OpenCode-native guidance.

**References to remove:**
- 85 references to "Claude"
- 4 references to "Anthropic"
- Multiple image URLs to `https://mintcdn.com/anthropic-claude-docs/`
- Documentation URLs to `https://platform.claude.com/docs/`

---

### Task 2: CREATE opencode-best-practices.md
**Priority:** HIGH  
**File:** `skills/writing-skills/opencode-best-practices.md` (NEW)  
**Action:** Create new vendor-neutral best practices guide

**Note:** This is a substantial task (~1,150 lines in the Anthropic version). Break into sub-tasks:

**Task 2a: Create document structure and outline**
- Set up frontmatter and main sections
- Define navigation structure

**Task 2b: Adapt content from anthropic-best-practices.md**
- Review existing guide and extract vendor-neutral best practices
- Adapt useful sections to OpenCode context
- Remove Anthropic-specific references

**Task 2c: Add OpenCode-specific sections**
- AGENTS.md configuration
- Agent system (primary agents vs subagents)
- Permission system
- Tool access patterns
- OpenCode native features

**Task 2d: Review and validate**
- Test examples work
- Verify cross-references
- Ensure consistency

**Content outline:**

```markdown
# OpenCode Skill Authoring Best Practices

## 1. Introduction
- What are skills in OpenCode
- How skills are discovered
- Skill priority system (project > personal > superpowers)

## 2. Skill File Structure
- SKILL.md format
- Frontmatter requirements
- Description best practices
- Metadata fields

## 3. Skill Discovery Optimization (SDO)
- How the AI agent discovers skills
- Writing trigger-focused descriptions
- The Description Trap (avoid workflow details in descriptions)
- Naming conventions

## 4. Writing Effective Skills
- Imperative tone and direct instructions
- Clear step-by-step structure
- Testing and verification steps
- Examples and patterns
- Anti-patterns to avoid

## 5. OpenCode-Specific Features
### 5.1 AGENTS.md Configuration
- Project conventions (AGENTS.md)
- Global conventions (~/.config/opencode/AGENTS.md)
- When to use each

### 5.2 Agent System
- Primary agents vs subagents
- How skills interact with agents
- Agent modes (build, plan, etc.)

### 5.3 Permission System
- Tool permissions
- Task permissions
- Bash command patterns

### 5.4 Tool Access
- Native OpenCode tools
- Custom tools
- MCP servers

## 6. Testing and Validation
- Testing with subagents
- Verifying skill invocation
- Common failure modes
- Session analysis

## 7. Examples and Patterns
- Reference existing superpowers skills
- Common patterns library
- Best practices from the field
- Case studies

## 8. Resources
- OpenCode documentation links
- Community resources
- Contributing guidelines
```

**References:**
- OpenCode Skills: https://opencode.ai/docs/skills
- OpenCode Agents: https://opencode.ai/docs/agents
- OpenCode Rules: https://opencode.ai/docs/rules

---

### Task 3: UPDATE SKILL.md (writing-skills)
**Priority:** HIGH  
**File:** `skills/writing-skills/SKILL.md`  
**Changes required:** 11 Claude references + 1 Anthropic reference + CSO section

**Specific updates:**
1. **Line 22:** Update reference from `anthropic-best-practices.md` to `opencode-best-practices.md`
2. **Line 60:** Update "CLAUDE.md" → "AGENTS.md" (project conventions)
3. **Lines 144-223:** Rename "Claude Search Optimization (CSO)" section to "Skill Discovery Optimization (SDO)"
4. **Throughout:** Replace "Claude" with "the AI agent" in all instructional text
5. **Throughout:** Update any references to Claude Code to OpenCode

**CSO → SDO Transformation:**
- Section title: "Claude Search Optimization (CSO)" → "Skill Discovery Optimization (SDO)"
- Update all explanations to be vendor-neutral
- Update terminology from "Claude discovers" → "the AI agent discovers"
- Update terminology from "Claude reads" → "the AI agent reads"

---

### Task 4: UPDATE README.md
**Priority:** HIGH  
**File:** `README.md`  
**Changes required:** MINIMAL - Only line 4 needs updating

**Analysis of current state:**
- Line 4: Contains fork reference that needs clarification
- Line 33: ✅ Already correct (`jjjona/opencode-superpowers`)
- Line 103: ✅ Already correct (`jjjona/opencode-superpowers`)
- Line 112: ✅ Keep as-is (Jesse's sponsor link to obra)
- Line 120: ✅ Already correct (`jjjona/opencode-superpowers`)
- Line 121: ✅ Keep as-is (Original repo attribution to obra)

**Specific update:**

**Line 4 ONLY:**
```markdown
# BEFORE:
This is a fork of Jesse Vincent's fantastic Superpowers: https://github.com/obra/superpowers

# AFTER:
This is a fork of Jesse Vincent's fantastic [Superpowers](https://github.com/obra/superpowers) adapted for OpenCode.
```

**IMPORTANT:** 
- Jesse Vincent's name MUST remain unchanged
- Line 112 sponsor link stays as `https://github.com/sponsors/obra` (proper attribution)
- Line 121 original repo link stays as `https://github.com/obra/superpowers` (proper attribution)
- Most repository URLs already point to `jjjona/opencode-superpowers` ✅

---

### Task 5: UPDATE using-git-worktrees/SKILL.md
**Priority:** MEDIUM  
**File:** `skills/using-git-worktrees/SKILL.md`  
**Changes required:** ~6 CLAUDE.md references

**Specific updates:**
- **Line 32:** "Check CLAUDE.md" → "Check AGENTS.md"
- **Line 35:** `grep -i "worktree.*director" CLAUDE.md` → `grep -i "worktree.*director" AGENTS.md`
- **Line 42:** "no CLAUDE.md preference" → "no AGENTS.md preference"
- **Line 153:** Table entry "CLAUDE.md" → "AGENTS.md"
- **Line 168:** "CLAUDE.md" → "AGENTS.md"
- **Lines 203, 206:** "CLAUDE.md" → "AGENTS.md"

**Also update Jesse reference:**
- **Line 66:** KEEP "Per Jesse's rule 'Fix broken things immediately'" (proper attribution)
- **Line 191:** Update example path `/Users/jesse/myproject/` → `/Users/user/myproject/` (generic example)

---

### Task 6: UPDATE receiving-code-review/SKILL.md
**Priority:** MEDIUM  
**File:** `skills/receiving-code-review/SKILL.md`  
**Changes required:** 1 CLAUDE.md reference

**Specific update:**
- **Line 32:** "(explicit CLAUDE.md violation)" → "(explicit AGENTS.md violation)"

---

### Task 7: UPDATE systematic-debugging/CREATION-LOG.md
**Priority:** MEDIUM  
**File:** `skills/systematic-debugging/CREATION-LOG.md`  
**Changes required:** Historical path reference

**Specific update:**
- **Line 7:** Update path reference for clarity:
  - Current: "Extracted debugging framework from `/Users/jesse/.claude/CLAUDE.md`"
  - New: "Extracted debugging framework from Jesse Vincent's personal conventions file (originally at `~/.claude/CLAUDE.md` in Claude Code)"

This maintains historical context while making it vendor-neutral.

---

### Task 8: UPDATE CLAUDE_MD_TESTING.md
**Priority:** MEDIUM  
**File:** `skills/writing-skills/examples/CLAUDE_MD_TESTING.md`  
**Action:** Rename to `AGENTS_MD_TESTING.md` and update all internal references

**Changes required:**
1. **Rename file:** `CLAUDE_MD_TESTING.md` → `AGENTS_MD_TESTING.md`
2. **Line 1:** Title "Testing CLAUDE.md Skills Documentation" → "Testing AGENTS.md Skills Documentation"
3. **Line 16:** `~/.claude/skills/debugging/` → `~/.config/opencode/skills/debugging/`
4. **Line 34:** `~/.claude/skills/testing/` → `~/.config/opencode/skills/testing/`
5. **Line 46:** `~/.claude/skills/` → `~/.config/opencode/skills/`
6. **Line 60:** `~/.claude/skills/coding/` → `~/.config/opencode/skills/coding/`
7. **Line 67:** "CLAUDE.md" → "AGENTS.md"
8. **Lines 73, 81:** `~/.claude/skills/` → `~/.config/opencode/skills/`
9. **Lines 84-85:** Update skill paths
10. **Lines 92-95:** Update skill paths
11. **Lines 107, 122-123:** Update skill paths

**Throughout:** Replace "CLAUDE.md" with "AGENTS.md"

---

### Task 9: UPDATE testing-skills-with-subagents.md
**Priority:** MEDIUM  
**File:** `skills/writing-skills/testing-skills-with-subagents.md`  
**Changes required:** Cross-reference update

**Specific update:**
- **Line 15:** Update reference to renamed file:
  - Current: "See examples/CLAUDE_MD_TESTING.md"
  - New: "See examples/AGENTS_MD_TESTING.md"

---

### Task 10: UPDATE root-cause-tracing.md
**Priority:** LOW  
**File:** `skills/systematic-debugging/root-cause-tracing.md`  
**Changes required:** Example path

**Specific update:**
- **Line with example path:** `/Users/jesse/project/packages/core` → `/Users/user/project/packages/core`

This makes the example generic rather than specific to Jesse's setup.

---

### Task 11: UPDATE RELEASE-NOTES.md
**Priority:** MEDIUM  
**File:** `RELEASE-NOTES.md`  
**Changes required:** Add clarifying note about fork and historical references

**Issue:** RELEASE-NOTES.md contains 30+ references to Claude/Anthropic/obra in historical changelogs.

**Decision:** Add clarifying note at top rather than rewriting history.

**Specific change:**
Add after the version header at the top of the file:

```markdown
---

> **Note:** This project is a fork of [obra/superpowers](https://github.com/obra/superpowers) 
> adapted specifically for OpenCode. Historical release notes below reference the original 
> multi-platform implementation and may mention Claude Code, Codex, and Anthropic-specific 
> features that have been replaced with OpenCode-native equivalents.

---
```

**Rationale:** 
- Preserves historical accuracy
- Provides context for readers
- Minimal change, maximal clarity
- Maintains git history integrity

---

### Task 12: POST-MIGRATION TESTING
**Priority:** HIGH  
**Action:** Verify skills still work after migration

**Test plan:**

**Test 1: Plugin loads**
```bash
opencode --version
opencode debug config | grep -i plugin
```
Expected: Plugin file appears in config

**Test 2: Skill discovery**
```bash
opencode run "use the find_skills tool to list all available skills"
```
Expected: Skills list appears, includes superpowers skills

**Test 3: Load a skill manually**
```bash
opencode run "use the use_skill tool to load superpowers:brainstorming"
```
Expected: Skill content loads without errors

**Test 4: Verify cross-references work**
- Check that skills referencing AGENTS.md still make sense
- Verify skills referencing other skills still work
- Test that SDO terminology is clear

**Test 5: Bootstrap injection**
Start a new OpenCode session and verify:
- using-superpowers skill is mentioned
- Skill discovery mechanism works
- No errors or warnings about missing files

**Test 6: Manual skill file check**
```bash
# Verify no broken references in skill files
grep -r "CLAUDE\.md" skills/ --include="*.md"
grep -r "\.claude/" skills/ --include="*.md"
```
Expected: No matches (all updated to AGENTS.md / .config/opencode/)

---

### Task 13: FINAL VERIFICATION
**Priority:** HIGH  
**Action:** Complete sweep to ensure all changes applied correctly

**Verification commands (refined):**

1. Search for remaining "Claude" references (case-insensitive):
   ```bash
   grep -ri "claude" . \
     --exclude-dir=.git \
     --exclude-dir=node_modules \
     --exclude-dir=.opencode/node_modules \
     --exclude="RELEASE-NOTES.md" \
     --exclude="*-REVIEW.md" \
     --exclude="*-migration.md"
   ```

2. Search for "Anthropic" references:
   ```bash
   grep -ri "anthropic" . \
     --exclude-dir=.git \
     --exclude-dir=node_modules \
     --exclude="RELEASE-NOTES.md" \
     --exclude="*-REVIEW.md"
   ```

3. Search for "obra" repository references (excluding proper attribution):
   ```bash
   grep -ri "obra" . \
     --exclude-dir=.git \
     --exclude-dir=node_modules \
     --exclude="LICENSE" \
     --exclude="RELEASE-NOTES.md" \
     --exclude="*-REVIEW.md" \
     | grep -v "sponsors/obra" \
     | grep -v "Original.*obra/superpowers"
   ```

4. Verify CLAUDE.md references replaced:
   ```bash
   grep -ri "CLAUDE\.md" . \
     --exclude-dir=.git \
     --exclude-dir=node_modules \
     --include="*.md"
   ```

5. Verify Claude Search Optimization renamed:
   ```bash
   grep -ri "\bCSO\b\|Claude Search Optimization" . \
     --exclude-dir=.git \
     --exclude-dir=node_modules \
     --exclude="RELEASE-NOTES.md" \
     --exclude="*-REVIEW.md"
   ```

6. Ensure Jesse Vincent attribution preserved:
   ```bash
   grep -i "jesse vincent" LICENSE README.md
   ```

**Expected results:**
- ✅ No "Claude" references (except RELEASE-NOTES.md with clarification)
- ✅ No "Anthropic" references (except RELEASE-NOTES.md)
- ✅ No "obra/" repository URLs in active documentation (except proper attribution)
- ✅ No "CLAUDE.md" references in skills
- ✅ No "CSO" references (replaced with SDO)
- ✅ Jesse Vincent's name appears in LICENSE and README with proper attribution
- ✅ All skills use `~/.config/opencode/` paths
- ✅ All skills reference `AGENTS.md` instead of `CLAUDE.md`

---

## Files Explicitly Excluded from Changes

### Git Metadata (Auto-generated)
- `.git/logs/HEAD`
- `.git/logs/refs/heads/main`
- `.git/COMMIT_EDITMSG`

**Reason:** These are git internal files and should not be manually modified.

### Files with Preserved Attribution
- `LICENSE` - Contains Jesse Vincent copyright (MUST be preserved)
- `README.md` - Jesse Vincent attribution and sponsor link (MUST be preserved)
- `RELEASE-NOTES.md` - Historical changelog (add clarifying note, preserve history)

---

## Post-Migration Validation

After completing all tasks, validate the migration by:

1. **Documentation consistency check:**
   - All references to configuration files use `AGENTS.md`
   - All skill directory references use `~/.config/opencode/skills/`
   - All AI agent references use "the AI agent" (vendor-neutral)

2. **Repository references check:**
   - All documentation points to `jjjona/opencode-superpowers`
   - Jesse Vincent's attribution remains intact
   - Sponsor links remain intact

3. **Terminology consistency check:**
   - "Skill Discovery Optimization (SDO)" used instead of "Claude Search Optimization (CSO)"
   - Vendor-neutral language throughout

4. **Functional validation:**
   - All cross-references between documents are valid
   - No broken links to renamed/deleted files
   - Skill descriptions remain accurate and useful

---

## Success Criteria

The migration is complete when:

- ✅ Zero references to "Claude" as the AI agent in active docs (vendor-neutral terminology used)
- ✅ Zero references to "Anthropic" in active documentation (except RELEASE-NOTES with context)
- ✅ All `CLAUDE.md` references updated to `AGENTS.md`
- ✅ README.md updated with clarification about OpenCode adaptation
- ✅ Jesse Vincent attribution and copyright preserved in LICENSE and README
- ✅ Sponsor links and original repository attribution maintained
- ✅ New `opencode-best-practices.md` created and referenced
- ✅ "Claude Search Optimization" renamed to "Skill Discovery Optimization"
- ✅ All skills use OpenCode-native paths (`~/.config/opencode/`)
- ✅ All skills reference `AGENTS.md` instead of `CLAUDE.md`
- ✅ RELEASE-NOTES.md has clarifying note about fork history
- ✅ All cross-references between documents valid
- ✅ Skills tested and working in OpenCode
- ✅ Documentation is consistent and vendor-neutral
- ✅ Verification commands pass with expected results

---

## Notes

### Attribution Philosophy

This project builds on Jesse Vincent's excellent work. All attribution to Jesse Vincent must be preserved:
- Copyright notice in LICENSE
- Attribution in README
- References to Jesse's rules and practices in skills (where contextually appropriate)
- Sponsor links

### OpenCode Compatibility Layer

Note that OpenCode maintains backward compatibility with Claude Code conventions:
- `CLAUDE.md` still works as a fallback to `AGENTS.md`
- `~/.claude/` paths still work as fallbacks

However, for this project to be truly OpenCode-native, we use OpenCode's primary conventions directly.

### Future Maintenance

When adding new skills or documentation:
- Use `AGENTS.md` for project conventions
- Use `~/.config/opencode/skills/` for personal skills
- Use vendor-neutral terminology ("the AI agent" not "Claude")
- Reference OpenCode documentation at https://opencode.ai/docs
- Maintain Jesse Vincent's attribution where appropriate

---

## Execution Timeline

**Estimated time:** 3-4 hours (updated from initial 2-3 hours estimate)

**Breakdown:**
- Tasks 1, 3, 4: 30 minutes (deletions and simple updates)
- Task 2 (opencode-best-practices.md): 90-120 minutes (largest task)
- Tasks 5-10: 45 minutes (medium priority updates)
- Task 11 (RELEASE-NOTES): 10 minutes
- Task 12 (testing): 30 minutes
- Task 13 (verification): 15 minutes

**Task order:**
1. **Phase 1: HIGH priority** (Tasks 1, 3, 4) - Critical path, quick wins
2. **Phase 2: Content creation** (Task 2) - Substantial effort, can be done incrementally
3. **Phase 3: MEDIUM priority** (Tasks 5-11) - Supporting documentation
4. **Phase 4: LOW priority** (Task 10) - Polish
5. **Phase 5: Validation** (Tasks 12, 13) - Quality assurance

---

## Related Documentation

- **Review Document:** [2026-01-21-complete-opencode-migration-REVIEW.md](./2026-01-21-complete-opencode-migration-REVIEW.md)
- **Infrastructure Migration:** [2026-01-21-opencode-native-migration.md](./2026-01-21-opencode-native-migration.md)
- **OpenCode Documentation:** https://opencode.ai/docs
- **OpenCode Rules:** https://opencode.ai/docs/rules
- **OpenCode Agents:** https://opencode.ai/docs/agents
- **OpenCode Skills:** https://opencode.ai/docs/skills
- **Original Superpowers:** https://github.com/obra/superpowers
- **This Repository:** https://github.com/jjjona/opencode-superpowers

---

**Plan created:** 2026-01-21  
**Plan reviewed:** 2026-01-21  
**Plan status:** Reviewed and ready for execution  
**Estimated effort:** 3-4 hours
