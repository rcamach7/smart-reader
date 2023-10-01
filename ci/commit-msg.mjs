import { readFileSync } from 'fs';
import colors from 'picocolors';

// get $1 from commit-msg script
const msgFilePath = process.argv[2];
const msgFileContents = readFileSync(msgFilePath, 'utf-8');
const commitTitle = msgFileContents.split(/\r?\n/)[0];

const commitRE =
  /^(revert: )?(feat|fix|refactor|test|perf|style|asset|doc|ci|chore|wip)(\(.+\))?: [A-Z].{1,98}[^.]$/;

if (!commitRE.test(commitTitle)) {
  console.log();
  console.error(
    `${colors.bgRed(colors.white(' ERROR '))} ${colors.white(
      `Invalid commit title, format, or length.`
    )}\n\n` +
      colors.white(
        `Please ensure your commit message follows these guidelines:\n`
      ) +
      `  ${colors.green(`1. Under 100 characters in length.`)}\n` +
      `  ${colors.green(`2. Starts with one of the following prefixes:`)}\n` +
      `     - feat, fix, refactor, test, perf, style, asset, doc, ci, chore, or wip\n` +
      `  ${colors.green(`3. Followed by a semi-colon and a space.`)}\n` +
      `  ${colors.green(
        `4. A capitalized title that does not end with a period.`
      )}\n\n` +
      colors.white(`Example:`) +
      `\n  ${colors.cyan(`feat: Add new cool feature`)}\n\n`
  );
  process.exit(1);
}
