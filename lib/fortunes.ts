import fs from 'fs';
import path from 'path';
import { Fortune } from './types';

export function getFortunes(): Fortune[] {
  const fortunesMap = new Map<string, Fortune>();
  const publicDir = path.join(process.cwd(), 'public');
  const fortunesDir = path.join(publicDir, 'fortunes');

  const filesToRead: { filepath: string; categoryHint: string }[] = [];

  if (fs.existsSync(fortunesDir)) {
    const files = fs.readdirSync(fortunesDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const categoryHint = path.basename(file, '.json');
        filesToRead.push({
          filepath: path.join(fortunesDir, file),
          categoryHint,
        });
      }
    }
  }

  // Also check publicDir if filesToRead is empty or contains quotes1/quotes2
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const categoryHint = path.basename(file, '.json');
        // Only add if not already read
        const fullpath = path.join(publicDir, file);
        if (!filesToRead.some((f) => f.filepath === fullpath)) {
          filesToRead.push({
            filepath: fullpath,
            categoryHint,
          });
        }
      }
    }
  }

  for (const { filepath, categoryHint } of filesToRead) {
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);
      const list = Array.isArray(data) ? data : (data.quotes || data.fortunes || []);

      for (const item of list) {
        if (!item || typeof item !== 'object') continue;
        const quoteText = item.quote || item.text;
        if (!quoteText || typeof quoteText !== 'string') continue;

        const cleanQuote = quoteText.trim();
        if (!cleanQuote || fortunesMap.has(cleanQuote)) continue;

        const author = item.author || 'Unknown';
        const source = item.source || item.sourceType || 'Interview';
        const category = item.category || (item.id ? String(item.id).split('-')[0] : categoryHint) || 'general';

        fortunesMap.set(cleanQuote, {
          quote: cleanQuote,
          author: String(author).trim(),
          source: String(source).trim(),
          category: String(category).trim(),
        });
      }
    } catch (err) {
      console.error(`Error reading fortunes file ${filepath}:`, err);
    }
  }

  const results = Array.from(fortunesMap.values());
  // Fallback fortune if none loaded
  if (results.length === 0) {
    results.push({
      quote: "Obstacles don't have to stop you. If you run into a wall, don't turn around and give up. Figure out how to climb it, go through it, or work around it.",
      author: "Michael Jordan",
      source: "Interview",
      category: "sports"
    });
  }

  return results;
}
