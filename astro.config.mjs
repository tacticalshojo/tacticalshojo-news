import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tacticalshojo.com', // 預留未來驗收後的官方網址
  output: 'static', // 💡 100% 純靜態模式，完全不需要 Vercel 適配器
  integrations: [tailwind()],
});
