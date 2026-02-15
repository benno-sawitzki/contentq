import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { Post, Config, InboxItem } from './types';

const CQ_DIR = '.contentq';

export function getCqDir(): string {
  return path.resolve(process.cwd(), CQ_DIR);
}

export function ensureInitialized(): void {
  if (!fs.existsSync(getCqDir())) {
    console.error('Not initialized. Run: contentq init');
    process.exit(1);
  }
}

export function readQueue(): Post[] {
  const p = path.join(getCqDir(), 'queue.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

export function writeQueue(posts: Post[]): void {
  fs.writeFileSync(path.join(getCqDir(), 'queue.json'), JSON.stringify(posts, null, 2));
}

export function readHistory(): Post[] {
  const p = path.join(getCqDir(), 'history.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

export function writeHistory(posts: Post[]): void {
  fs.writeFileSync(path.join(getCqDir(), 'history.json'), JSON.stringify(posts, null, 2));
}

export function readConfig(): Config {
  const p = path.join(getCqDir(), 'config.yaml');
  if (!fs.existsSync(p)) return { platforms: {} };
  return yaml.parse(fs.readFileSync(p, 'utf-8')) || { platforms: {} };
}

export function writeConfig(config: Config): void {
  fs.writeFileSync(path.join(getCqDir(), 'config.yaml'), yaml.stringify(config));
}

export function readInbox(): InboxItem[] {
  const p = path.join(getCqDir(), 'inbox.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

export function writeInbox(items: InboxItem[]): void {
  fs.writeFileSync(path.join(getCqDir(), 'inbox.json'), JSON.stringify(items, null, 2));
}

export function ensureInboxDirs(): void {
  const dir = getCqDir();
  for (const sub of ['social', 'inspo', 'ideas', 'general']) {
    fs.mkdirSync(path.join(dir, 'inbox', sub), { recursive: true });
  }
}
