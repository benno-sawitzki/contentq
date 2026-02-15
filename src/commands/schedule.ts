import chalk from 'chalk';
import { ensureInitialized, readQueue, writeQueue } from '../store';
import { isJsonMode, out } from '../output';

export function scheduleCommand(id: string, dateStr: string) {
  ensureInitialized();
  const posts = readQueue();
  const idx = posts.findIndex(p => p.id === id || p.id.startsWith(id));

  if (idx === -1) {
    if (isJsonMode()) return out({ success: false, error: 'Post not found' });
    console.error(chalk.red(`Post not found: ${id}`));
    process.exit(1);
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    if (isJsonMode()) return out({ success: false, error: 'Invalid date' });
    console.error(chalk.red('Invalid date format'));
    process.exit(1);
  }

  posts[idx].status = 'scheduled';
  posts[idx].scheduledFor = date.toISOString();
  writeQueue(posts);

  if (isJsonMode()) return out({ success: true, post: posts[idx] });
  console.log(chalk.green(`✓ Scheduled for ${date.toLocaleString()}`));
}
