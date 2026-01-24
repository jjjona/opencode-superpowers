### Disclaimer
I forked and altered this because I thought the OpenCode integration acted somewhat instable because it was added on later in a Claude Code first system. After further testing it turns out that it was a skill issue (pun intended) on my part. I just had to reframe my prompts slightly to trigger Jesse's Superpowers consistently.

You can of course use this version if you want to, but if you want to use Superpowers you might be better off with the original: [Superpowers](https://github.com/obra/superpowers)

---
---

# Superpowers for OpenCode

A complete software development workflow built on composable skills for OpenCode.
This is a fork of Jesse Vincent's fantastic [Superpowers](https://github.com/obra/superpowers) adapted for OpenCode.
All I did was strip anything non-opencode from it to see if a tighter coupling would result in more robust skill discovery and enforcement.

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
mkdir -p ~/.config/opencode/plugins
rm -f ~/.config/opencode/plugins/superpowers.js
ln -s ~/.config/opencode/superpowers/.opencode/plugins/superpowers.js ~/.config/opencode/plugins/superpowers.js

# 3. Install skills (global discovery expects ~/.config/opencode/skills/<name>/SKILL.md)
mkdir -p ~/.config/opencode/skills

for d in ~/.config/opencode/superpowers/skills/*; do
  name="$(basename "$d")"
  ln -s "$d" ~/.config/opencode/skills/"$name"
done
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

## License

MIT License - see LICENSE file for details

## Support

- **Issues**: https://github.com/jjjona/opencode-superpowers/issues
- **Original**: https://github.com/obra/superpowers
