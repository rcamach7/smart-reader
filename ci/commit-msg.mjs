import { readFileSync, writeFileSync } from 'fs';
import colors from 'picocolors';

// Map prefixes to emojis
const prefixToEmoji = {
  feat: '✨',
  fix: '🐛',
  refactor: '♻️',
  test: '✅',
  perf: '🚀',
  style: '🎨',
  asset: '🔧',
  doc: '📖',
  ci: '💚',
  chore: '🔨',
  wip: '🚧',
};

const msgFilePath = process.argv[2];
const msgFileContents = readFileSync(msgFilePath, 'utf-8');
const commitTitle = msgFileContents.split(/\r?\n/)[0];

// Enhanced regex to also match emojis at the start
const commitRE =
  /^(✨|🐛|♻️|✅|🚀|🎨|🔧|📖|💚|🔨|🚧)? ?(revert: )?(feat|fix|refactor|test|perf|style|asset|doc|ci|chore|wip)(\(.+\))?: [A-Z].{1,98}[^.]$/;

const match = commitRE.exec(commitTitle);

if (match) {
  const emoji = match[1]; // The emoji, if present
  const prefix = match[3]; // The actual prefix (feat, fix, etc.)

  if (!emoji) {
    // Only add emoji if not already present
    // Extract the prefix and determine the emoji
    const newEmoji = prefixToEmoji[prefix];

    // Add the emoji to the commit message
    const updatedMessage = commitTitle.replace(prefix, `${newEmoji} ${prefix}`);
    writeFileSync(
      msgFilePath,
      msgFileContents.replace(commitTitle, updatedMessage)
    );
  }
} else {
  console.error(
    `${colors.bgRed(colors.white(' ERROR '))} ${colors.white(
      `Invalid commit title format or length.`
    )}\n\n` +
      colors.white(
        `Please ensure your commit message follows these guidelines:\n`
      ) +
      `  ${colors.green(`1. Under 100 characters in length.`)}\n` +
      `  ${colors.green(`2. Starts with a recognized prefix:`)}\n` +
      `     feat, fix, refactor, test, perf, style, asset, doc, ci, chore, or wip\n` +
      `  ${colors.green(`3. Followed by a semi-colon and a space.`)}\n` +
      `  ${colors.green(
        `4. A capitalized title that does not end with a period.`
      )}\n\n` +
      colors.white(`Example:`) +
      `\n  ${colors.cyan(`feat: Add new cool feature`)}\n` +
      colors.white(
        `This will be automatically prefixed with the corresponding emoji.`
      ) +
      `\n\n`
  );
  process.exit(1);
}
