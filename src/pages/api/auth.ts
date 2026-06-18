// 💡 關鍵修正：宣告此路徑為動態渲染（Server-side Rendered），打包時直接跳過，避免 req.headers 報錯
export const prerender = false;

import { auth } from '@openlab/vercel-netlify-cms-github';

export const ALL = auth;
