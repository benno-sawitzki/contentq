import { Post, Config } from './types';
export declare function getCqDir(): string;
export declare function ensureInitialized(): void;
export declare function readQueue(): Post[];
export declare function writeQueue(posts: Post[]): void;
export declare function readHistory(): Post[];
export declare function writeHistory(posts: Post[]): void;
export declare function readConfig(): Config;
export declare function writeConfig(config: Config): void;
