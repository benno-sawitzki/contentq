export interface Post {
  id: string;
  text: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: string;
  scheduledFor: string | null;
  publishedAt: string | null;
  publishResult: Record<string, any>;
  tags: string[];
  template: string | null;
}

export interface Config {
  platforms: {
    [key: string]: {
      adapter: string;
      apiKey?: string;
      accountId?: string;
      profileId?: string;
      [key: string]: any;
    };
  };
  defaults?: {
    platform?: string;
  };
}

export interface PublishResult {
  success: boolean;
  platformPostId?: string;
  url?: string;
  error?: string;
  raw?: any;
}

export interface PlatformAdapter {
  name: string;
  publish(post: Post, config: any): Promise<PublishResult>;
}
