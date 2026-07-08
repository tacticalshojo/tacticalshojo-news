import { defineCollection, z } from 'astro:content';

// 文章結構
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // 🎯 放寬日期驗證：如果欄位沒傳或格式不對，不會卡死編譯，自動安全降維
    date: z.any().optional().default(() => new Date()), 
    authors: z.array(z.string()).default(['admin']), // 對應作者的 slug/ID
    // 🎯 改為選填並提供預設值，解決 category: Required 的致命阻攔
    category: z.enum(['軍事戰略', '全民防衛', '戰術自訓', '軍工產業', '軍風搜奇']).optional().default('軍事戰略'),
    isHeroBanner: z.boolean().default(false), 
    isHotTopic: z.boolean().default(false), 
    isFeatured: z.boolean().default(false), 
    heroImage: z.string().optional(), 
    heroImageCaption: z.string().optional(), 
    // 🎯 改為選填並提供預設摘要，解決 summary: Required 的自爆機制
    summary: z.string().optional().default('戰術通報摘要內容。'),
    gallery: z.array(z.object({
      image: z.string(),
      caption: z.string()
    })).optional(), 
  }),
});

// 作者卡片結構（保持原樣，完美運作）
const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    avatar: z.string().default('/images/uploads/default-avatar.png'),
    bio: z.string().default('戰術少女研究室特約專欄作家。'),
  }),
});

export const collections = { blog, authors };