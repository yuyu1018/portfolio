import { cp, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// ローカルの制作サイトから配信用ファイルだけを同期する。ビルド・公開時の依存は増やさない。
const source = new URL('../../kiwa-komuten/dist/', import.meta.url);
const destination = new URL('../public/demos/kiwa-komuten/', import.meta.url);
const pages = ['index.html', 'philosophy.html', 'works.html', 'work-natural.html', 'news.html', 'news-open-house.html', 'events.html', 'event-open-house.html', 'event-consultation.html'];
for (const page of pages) {
  if (!(await stat(new URL(page, source))).isFile()) throw new Error('デモのページが見つかりません: ' + page);
}
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
console.log('木和工務店のデモ9ページを同期しました: ' + fileURLToPath(destination));
