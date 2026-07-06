import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel'; // 💡 優化：通常新版 Astro 直接引進 @astrojs/vercel 即可

export default defineConfig({
  site: 'https://tacticalshojo.com', // 預留未來驗收後的官方網址
  
  // 💡 核心優勢：混合模式，前台新聞 100% 靜態快取，僅 API 後端動態處理
  output: 'hybrid', 
  
  // 告訴 Astro 部署到 Vercel 平台
  adapter: vercel(), 
  
  integrations: [tailwind()],
});
