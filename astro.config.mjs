import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tacticalshojo.com', // 你的官方網址
  
  // 💡 戰術調整：移除 output: 'hybrid' 與 adapter: vercel()
  // Astro 預設就會以 100% 純靜態（Static）模式編譯，這在 Vercel 上最穩定、絕對不會出錯
  integrations: [tailwind()],
});
