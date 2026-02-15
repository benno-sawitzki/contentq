import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { getCqDir, writeConfig, writeQueue, writeHistory, writeInbox, ensureInboxDirs } from '../store';
import { Config } from '../types';
import { isJsonMode, out } from '../output';

export function initCommand() {
  const dir = getCqDir();
  if (fs.existsSync(dir)) {
    if (isJsonMode()) return out({ success: false, error: 'Already initialized' });
    console.log(chalk.yellow('Already initialized in .contentq/'));
    return;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(dir, 'templates'), { recursive: true });

  const config: Config = {
    platforms: {
      linkedin: {
        adapter: 'linkedin',
        apiKey: '',
        accountId: '698f07784525118cee8daad0',
        profileId: '698e1a7211ffd99f0d2eebd9',
      },
    },
    defaults: {
      platform: 'linkedin',
    },
  };

  writeConfig(config);
  writeQueue([]);
  writeHistory([]);
  ensureInboxDirs();
  writeInbox([]);

  if (isJsonMode()) return out({ success: true, path: dir });
  console.log(chalk.green('✓ Initialized .contentq/'));
  console.log(chalk.dim('  Edit .contentq/config.yaml to add your API keys'));
}
