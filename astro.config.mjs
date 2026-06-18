import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tacticalshojo.com', // 預留未來驗收後的官方網址
  output: 'static',
  integrations: [tailwind()],
});
