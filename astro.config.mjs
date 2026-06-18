import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel'; // 💡 引入 Vercel 專用適配器

export default defineConfig({
  site: 'https://tacticalshojo.com', // 預留未來驗收後的官方網址
  output: 'hybrid', // 💡 修正：將全靜態改為混合模式（網頁保持靜態，後台 API 走動態雲端函式）
  integrations: [tailwind()],
  adapter: vercel({
    webAnalytics: { enabled: true } // 💡 順手幫你開啟 Vercel 免費的網站流量數據分析
  }),
});
