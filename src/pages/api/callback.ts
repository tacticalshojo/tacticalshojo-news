// 💡 關鍵修正：宣告此路徑為動態渲染（Server-side Rendered），打包時直接跳過，防止編譯噴錯
export const prerender = false;

import { callback } from '@openlab/vercel-netlify-cms-github';

export const ALL = callback;
