# Installing Superpowers for OpenCode

These instructions install this fork as an OpenCode plugin + skill bundle under `~/.config/opencode/`.

## Prerequisites

- OpenCode installed
- Git installed

## Installation

### 1. Clone This Repo

```bash
git clone https://github.com/jjjona/opencode-superpowers ~/.config/opencode/superpowers
```

### 2. Register The Plugin

Create a symlink so OpenCode discovers the plugin:

```bash
mkdir -p ~/.config/opencode/plugins
rm -f ~/.config/opencode/plugins/superpowers.js
ln -s ~/.config/opencode/superpowers/.opencode/plugins/superpowers.js ~/.config/opencode/plugins/superpowers.js
```

### 3. Install Skills

OpenCode discovers global skills from `~/.config/opencode/skills/<name>/SKILL.md`.

To avoid overwriting your entire `~/.config/opencode/skills/` directory, symlink each skill folder individually:

```bash
mkdir -p ~/.config/opencode/skills

for d in ~/.config/opencode/superpowers/skills/*; do
  name="$(basename "$d")"
  ln -s "$d" ~/.config/opencode/skills/"$name"
done
```

If you already have a skill with the same name, `ln` will fail for that entry. In that case, decide which one you want to keep.

### 4. Restart OpenCode

Restart OpenCode so it picks up the plugin.

Verify by asking: `do you have superpowers?`

## Usage

Load a skill with OpenCode's native `skill` tool:

```
skill({ name: "brainstorming" })
```

## Updating

```bash
cd ~/.config/opencode/superpowers
git pull
```

## Troubleshooting

### Plugin not loading

1. Check plugin symlink: `ls -l ~/.config/opencode/plugins/superpowers.js`
2. Check source exists: `ls ~/.config/opencode/superpowers/.opencode/plugins/superpowers.js`
3. Restart OpenCode and check logs

### Skills not found

1. Check one skill symlink: `ls -l ~/.config/opencode/skills/brainstorming`
2. Verify it points to: `~/.config/opencode/superpowers/skills/brainstorming`
3. Use the `skill` tool to list what's discovered
