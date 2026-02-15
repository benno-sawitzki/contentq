import chalk from 'chalk';
import { ensureInitialized, readConfig } from '../store';
import { listAdapters } from '../adapters';
import { isJsonMode, out } from '../output';

export function platformsCommand() {
  ensureInitialized();
  const config = readConfig();
  const available = listAdapters();
  const configured = Object.keys(config.platforms || {});

  if (isJsonMode()) return out({ available, configured, platforms: config.platforms });

  console.log(chalk.bold('\n📡 Platforms\n'));
  console.log(chalk.bold('Configured:'));
  configured.forEach(p => {
    const hasKey = !!(config.platforms[p].apiKey || process.env.LATE_API_KEY);
    const status = hasKey ? chalk.green('●') : chalk.red('● no API key');
    console.log(`  ${status} ${p} (${config.platforms[p].adapter})`);
  });
  console.log(chalk.bold('\nAvailable adapters:'), available.join(', '));
  console.log();
}
