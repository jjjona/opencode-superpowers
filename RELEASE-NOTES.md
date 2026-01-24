# Release Notes

## 5.0.0 - OpenCode Native (2026-01-21)

---

> **Note:** This project is a fork of [obra/superpowers](https://github.com/obra/superpowers)
> adapted specifically for OpenCode.

---

**BREAKING CHANGE:** This release removes support for Claude Code and Codex, focusing exclusively on OpenCode.

### Major Changes

- **Removed Claude Code support** - Deleted `.claude-plugin/`, hooks, commands, agents
- **Removed Codex support** - Deleted `.codex/` directory
- **Simplified plugin** - Removed custom tools, using OpenCode's native `skill` tool
- **Automatic enforcement** - Plugin injects "using-superpowers" on session start
- **Zero configuration** - No manual AGENTS.md editing required
- **Updated all skills** - Standardized on OpenCode's native `skill` tool
- **Native skill discovery** - Uses OpenCode's built-in skill system

### Migration from 4.x

If you were using superpowers with OpenCode on 4.x:

1. Remove old installation:
   ```bash
   # remove any symlinked superpowers skills
   for d in ~/.config/opencode/superpowers/skills/*; do rm -f ~/.config/opencode/skills/"$(basename "$d")"; done
   rm -rf ~/.config/opencode/superpowers
   rm ~/.config/opencode/plugins/superpowers.js
   ```

2. Follow installation instructions in `README.md`

### Why This Change?

The multi-platform architecture added unnecessary complexity. OpenCode's native plugin + skill system provides what we need.

### What Changed for Users?

- **Installation** is simpler and uses OpenCode's documented locations.
- **Skill usage** is unchanged: skills are still loaded on demand via the `skill` tool.

---

## Historical Notes (Upstream)

This repo is OpenCode-only. Pre-5.0 release notes from the upstream project were primarily about the multi-environment setup (Claude Code/Codex integrations, hooks, slash commands, etc.) and are intentionally omitted here to reduce confusion.

Upstream history and changelogs:

- https://github.com/obra/superpowers/releases
