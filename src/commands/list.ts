import chalk from 'chalk';
import { ensureInitialized, readQueue } from '../store';
import { isJsonMode, out, formatPost } from '../output';

export function listCommand(opts: { status?: string; platform?: string }) {
  ensureInitialized();
  let posts = readQueue();

  if (opts.status) posts = posts.filter(p => p.status === opts.status);
  if (opts.platform) posts = posts.filter(p => p.platform === opts.platform);

  if (isJsonMode()) return out(posts);

  if (!posts.length) {
    console.log(chalk.dim('Queue is empty'));
    return;
  }

  console.log(chalk.bold(`\n  ID        Status      Platform  Text`));
  console.log(chalk.dim('  ' + '─'.repeat(70)));
  posts.forEach(p => console.log('  ' + formatPost(p, true)));
  console.log();
}
