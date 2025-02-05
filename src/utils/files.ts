import { globby } from 'globby';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';

export const findFiles = async (pattern: string): Promise<string[]> => {
  return await globby(pattern, {
    dot: true,
    gitignore: true
  });
};

export const removeFiles = async (patterns: string[]): Promise<void> => {
  for (const pattern of patterns) {
    const files = await globby(pattern, { dot: true });
    await Promise.all(files.map(file => 
      rm(join(process.cwd(), file), { recursive: true, force: true })
    ));
  }
};