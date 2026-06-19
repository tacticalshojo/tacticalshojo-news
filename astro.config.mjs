import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless'; // 💡 新增：引進 Vercel 專用適配器

export default defineConfig({
  site: 'https://tacticalshojo.com', // 預留未來驗收後的官方網址
  
  // 💡 修正：改成混合模式。前台所有文章網頁依然保持 100% 純靜態，只有 /api 認證改為動態執行
  output: 'hybrid', 
  
  // 💡 新增：告訴 Astro 使用 Vercel 平台來處理動態 API
  adapter: vercel(), 
  
  integrations: [tailwind()],
});
