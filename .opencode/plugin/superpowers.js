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
