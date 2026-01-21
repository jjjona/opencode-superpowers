# Deep Review: Complete OpenCode Migration Plan

**Review Date:** 2026-01-21  
**Reviewer:** AI Agent  
**Plan Document:** `docs/plans/2026-01-21-complete-opencode-migration.md`

## Executive Summary

**Overall Assessment:** ✅ **Plan is SOLID with minor improvements needed**

The migration plan is comprehensive and well-structured. However, several issues need addressing before execution:

1. ✅ Line numbers need verification (may have drifted)
2. ⚠️ RELEASE-NOTES.md should be addressed (historical changelog)
3. ⚠️ Need actual content outline for new opencode-best-practices.md
4. ✅ Git exclusions need refinement
5. ⚠️ Post-migration testing not included
6. ℹ️ Relationship to existing migration plan unclear

---

## Detailed Findings

### 1. Line Number Accuracy ⚠️

**Issue:** Plan references specific line numbers (e.g., "README.md line 4, line 112") but these weren't verified by reading the actual files.

**Current State:**
- README.md line 4: ✅ VERIFIED - "This is a fork of Jesse Vincent's fantastic Superpowers: https://github.com/obra/superpowers"
- README.md line 112: ✅ VERIFIED - "If Superpowers has helped you, consider [sponsoring Jesse's opensource work](https://github.com/sponsors/obra)."
- README.md line 121: ✅ VERIFIED - "- **Original**: https://github.com/obra/superpowers"

**Additional findings in README.md:**
- Line 33: Contains `github.com/jjjona/opencode-superpowers` (already updated)
- Line 103: Contains `github.com/jjjona/opencode-superpowers` (already updated)
- Line 120: Contains `github.com/jjjona/opencode-superpowers` (already updated)

**Recommendation:** 
- ✅ README.md line numbers are accurate
- ✅ Most URLs already point to jjjona/opencode-superpowers
- ⚠️ Only need to update lines 4, 112, 121 (obra → jjjona in URLs, but KEEP Jesse's name)

---

### 2. RELEASE-NOTES.md Not Addressed ⚠️

**Issue:** RELEASE-NOTES.md contains 30+ references to Claude/Anthropic/obra but plan doesn't address it.

**Analysis:**
```
Line 5: **BREAKING CHANGE:** This release removes support for Claude Code
Line 62: "Claude would skip invoking a skill"
Line 66: "Claude would sometimes take action"
Line 72: "verifies Claude correctly invokes skills"
Line 80: "Claude can no longer invoke these commands"
Line 82: "available for Claude to invoke autonomously"
Line 88: "how to access skills in Claude Code"
Line 90: "Claude would invoke a skill"
Line 152: tests/claude-code/ references
Line 164: "Claude follows the short description"
Line 264: "~/.claude/skills for Claude Code"
Line 281: "Key differences from Claude Code integration"
Line 304: "proper mechanism for invoking skills in Claude Code"
Line 378: "Plugin-provided commands are automatically namespaced by Claude Code"
Line 400: "Anthropic best practices integration"
Line 401: "skills/writing-skills/anthropic-best-practices.md - Official Anthropic skill authoring guide"
Line 416: "Alignment with Anthropic best practices"
Line 443: "We now use Anthropic's first-party skills system!"
Line 467: "obra/superpowers-skills" (multiple times)
Line 477: "obra/superpowers-skills"
Line 492: "obra/superpowers-skills"
Line 544: "CSO (Claude Search Optimization)"
```

**Decision Required:**
Should we update RELEASE-NOTES.md or leave historical changelogs as-is?

**Recommendation:**
- **Option A (Recommended):** Add note at top of RELEASE-NOTES.md: "Note: This project was forked from obra/superpowers and migrated to OpenCode. Historical entries below reference the original Claude Code implementation."
- **Option B:** Update all references throughout release notes (heavy lift, may lose historical context)
- **Option C:** Leave as-is (preserves history but creates confusion)

**Suggested approach:** Option A - minimal edit, preserves history, adds clarity

---

### 3. opencode-best-practices.md Content Not Defined ⚠️

**Issue:** Task 2 says "CREATE opencode-best-practices.md" but provides only high-level requirements, not actual content structure.

**Current plan says:**
> Structure should include:
> 1. Overview of skills in OpenCode
> 2. Skill file structure and frontmatter
> 3. Writing effective descriptions
> 4. Skill Discovery Optimization techniques
> 5. Testing and validation approaches
> 6. Common patterns and anti-patterns
> 7. OpenCode-specific features (agents, tools, permissions)

**Problem:** This is a substantial document (the Anthropic version was 1,150 lines). Creating this from scratch is a HIGH effort task that needs more definition.

**Recommendation:**
- ✅ Review existing `anthropic-best-practices.md` and extract vendor-neutral best practices
- ✅ Adapt useful sections to OpenCode context
- ✅ Add OpenCode-specific guidance (AGENTS.md, skill structure, agent system)
- ✅ Include references to OpenCode docs (https://opencode.ai/docs/skills)
- ⚠️ This task should be split into sub-tasks:
  - Task 2a: Outline opencode-best-practices.md structure
  - Task 2b: Adapt content from anthropic-best-practices.md
  - Task 2c: Add OpenCode-specific sections
  - Task 2d: Review and test with real skills

---

### 4. Git History Exclusions Need Refinement ✅

**Issue:** Verification grep commands might match unwanted files.

**Current plan:**
```bash
grep -ri "claude" . --exclude-dir=.git --exclude-dir=node_modules
```

**Problem:** This will still match:
- `.git/COMMIT_EDITMSG`
- `.git/logs/`
- `RELEASE-NOTES.md` (if we keep it as-is)

**Recommendation:**
```bash
# Better exclusions
grep -ri "claude" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude-dir=.opencode/node_modules \
  --exclude="RELEASE-NOTES.md" \
  --exclude="*-REVIEW.md"
```

---

### 5. Post-Migration Testing Missing ⚠️

**Issue:** No task for testing that skills still work after migration.

**Recommendation:** Add Task 12: Post-Migration Testing

**Suggested test plan:**
```bash
# Test 1: Verify plugin loads
opencode --version

# Test 2: Start OpenCode and verify bootstrap
opencode run "use the find_skills tool to list available skills"

# Test 3: Load a skill manually
opencode run "use the use_skill tool to load superpowers:brainstorming"

# Test 4: Verify skill content loads
# Check that skill descriptions are still correct
# Check that cross-references between skills work

# Test 5: Verify AGENTS.md references work
# Create a test AGENTS.md and reference it in a skill
```

---

### 6. Relationship to Existing Migration Plan Unclear ℹ️

**Issue:** There's already `docs/plans/2026-01-21-opencode-native-migration.md` which focuses on infrastructure changes (removing Claude Code/Codex support).

**Current state:**
- `2026-01-21-opencode-native-migration.md` - Infrastructure migration (DONE)
- `2026-01-21-complete-opencode-migration.md` - Terminology/references migration (THIS PLAN)

**Recommendation:**
- ✅ These are two separate concerns, both plans are valid
- ✅ Add cross-reference in introduction: "This plan completes the migration started in 2026-01-21-opencode-native-migration.md by updating all references and terminology."
- ✅ Update intro to clarify scope

---

## Specific File Review

### README.md Analysis ✅

**Current state:**
```markdown
Line 4: This is a fork of Jesse Vincent's fantastic Superpowers: https://github.com/obra/superpowers
Line 33: git clone https://github.com/jjjona/opencode-superpowers ... (ALREADY CORRECT)
Line 103: Fork https://github.com/jjjona/opencode-superpowers (ALREADY CORRECT)
Line 112: [sponsoring Jesse's opensource work](https://github.com/sponsors/obra)
Line 120: **Issues**: https://github.com/jjjona/opencode-superpowers/issues (ALREADY CORRECT)
Line 121: **Original**: https://github.com/obra/superpowers
```

**Changes needed:**
1. Line 112: KEEP AS-IS (this is Jesse's sponsor link, should remain obra)
2. Line 121: Keep as "Original" link (proper attribution to source)
3. Line 4: Update to clarify fork relationship

**Suggested change for line 4:**
```markdown
# BEFORE:
This is a fork of Jesse Vincent's fantastic Superpowers: https://github.com/obra/superpowers

# AFTER:
This is a fork of Jesse Vincent's fantastic [Superpowers](https://github.com/obra/superpowers) adapted for OpenCode.
```

**Conclusion:** README needs MINIMAL changes:
- Line 4: Add "adapted for OpenCode" to clarify the fork purpose
- Lines 112, 121: KEEP AS-IS (proper attribution)

---

### Task-Specific Issues

#### Task 1: DELETE anthropic-best-practices.md ✅
**Status:** Clear and correct

#### Task 2: CREATE opencode-best-practices.md ⚠️
**Issue:** Needs content outline and sub-task breakdown (see Finding #3)

**Recommended structure:**
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

## 3. Skill Discovery Optimization (SDO)
- How the AI agent discovers skills
- Writing trigger-focused descriptions
- The Description Trap (avoid workflow details in descriptions)

## 4. Writing Effective Skills
- Imperative tone
- Clear step-by-step instructions
- Testing and verification steps
- Anti-patterns to avoid

## 5. OpenCode-Specific Features
- Using AGENTS.md for project conventions
- Agent system (primary agents vs subagents)
- Permission system
- Tool access

## 6. Testing and Validation
- Testing with subagents
- Verifying skill invocation
- Common failure modes

## 7. Examples and Patterns
- Reference existing skills
- Common patterns
- Best practices from superpowers library
```

#### Task 3: UPDATE SKILL.md (writing-skills) ⚠️
**Issue:** Line numbers need verification

**Action required:** Read the actual file and verify:
- Line 22: anthropic-best-practices.md reference
- Line 60: CLAUDE.md reference
- Lines 144-223: CSO section location

#### Task 4: UPDATE README.md ✅
**Status:** Clear, but see analysis above (minimal changes needed)

#### Task 5-10: UPDATE various skill files ⚠️
**Issue:** All line numbers need verification before execution

#### Task 11: VERIFICATION ✅
**Status:** Commands are good but need refinement (see Finding #4)

---

## Additional Findings

### A. Files with "Claude" That Should Stay ✅

Some uses of "Claude" are appropriate and should NOT be changed:
1. **RELEASE-NOTES.md** - Historical changelog
2. **LICENSE** - Copyright (already excludes changes)
3. **Git history** - Cannot and should not change

### B. "the AI agent" vs "OpenCode" vs "the agent" 🤔

**Plan says:** Use "the AI agent" everywhere

**Question:** Is this the best choice? Consider:
- "the AI agent" - Very explicit, vendor-neutral
- "the agent" - More concise
- "OpenCode" - Specific but ties to platform
- "you" (2nd person) - Direct, common in docs

**Recommendation:** 
- ✅ Stick with "the AI agent" as planned (consistent with request)
- Consider allowing "you" in instructional content for skills (more natural)
- Example: "You should check AGENTS.md" vs "The AI agent should check AGENTS.md"

### C. CSO → SDO Naming 🤔

**Plan says:** "Claude Search Optimization (CSO)" → "Skill Discovery Optimization (SDO)"

**Analysis:**
- ✅ SDO is vendor-neutral
- ✅ Maintains the optimization framing
- ⚠️ Loses the catchy "SEO for AI" parallel

**Recommendation:**
- ✅ Proceed with SDO as planned
- Consider alternative: "Agent Discovery Optimization (ADO)" 
- Or keep it simple: "Skill Discovery" (no acronym)

Final recommendation: **Stick with SDO as planned**

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Line numbers drift during execution | HIGH | MEDIUM | Verify line numbers before each edit |
| Breaking skill functionality | LOW | HIGH | Add testing phase (Task 12) |
| Losing historical context | MEDIUM | LOW | Document fork relationship clearly |
| Incomplete migration (missed refs) | LOW | MEDIUM | Thorough verification (Task 11) |
| opencode-best-practices.md too generic | MEDIUM | MEDIUM | Use anthropic guide as template |

---

## Recommendations

### CRITICAL (Must address before execution)
1. ✅ **Add Task 12:** Post-migration testing
2. ⚠️ **Expand Task 2:** Break into sub-tasks with content outline
3. ⚠️ **Add Task 13:** Update RELEASE-NOTES.md with clarifying note

### IMPORTANT (Should address)
4. ✅ **Refine verification commands:** Better git exclusions
5. ✅ **Verify line numbers:** Read each file before editing
6. ✅ **Add cross-reference:** Link to infrastructure migration plan

### NICE-TO-HAVE
7. ℹ️ **Consider "you" vs "the AI agent"** in instructional content
8. ℹ️ **Document SDO rationale** in the best practices guide

---

## Updated Task List

### Additional Tasks to Add:

**Task 12: Post-Migration Testing**
**Priority:** HIGH
**Description:** Verify skills still work after migration

**Steps:**
1. Test plugin loads in OpenCode
2. Test find_skills tool
3. Test use_skill tool with multiple skills
4. Verify skill cross-references work
5. Test AGENTS.md reference in skills
6. Verify skill descriptions still trigger correctly

---

**Task 13: Update RELEASE-NOTES.md**
**Priority:** MEDIUM
**Description:** Add clarifying note about fork and historical references

**Specific change:**
Add at top of RELEASE-NOTES.md (after version number):
```markdown
> **Note:** This project is a fork of [obra/superpowers](https://github.com/obra/superpowers) adapted specifically for OpenCode. 
> Historical release notes below reference the original multi-platform implementation and may mention Claude Code, Codex, 
> and Anthropic-specific features that have been replaced with OpenCode-native equivalents.
```

---

## Conclusion

**Overall verdict:** ✅ **APPROVE WITH MODIFICATIONS**

The plan is well-structured and comprehensive. With the recommended additions:
- Add Task 12 (testing)
- Add Task 13 (RELEASE-NOTES clarification)
- Expand Task 2 (opencode-best-practices.md content)
- Refine verification commands

The plan will be ready for execution.

**Estimated time with modifications:** 3-4 hours (up from 2-3)
- Task 2 (creating opencode-best-practices.md) is the largest unknown

---

## Sign-off

**Reviewed by:** AI Agent  
**Date:** 2026-01-21  
**Recommendation:** APPROVE with modifications listed above  
**Next step:** Update plan document with findings from this review
