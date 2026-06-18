import { defineCollection, z } from 'astro:content';

// 文章結構
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()).default(['admin']), // 對應作者的 slug/ID
    category: z.enum(['軍事戰略', '全民防衛', '戰術自訓', '軍工產業', '軍風搜奇']),
    isHeroBanner: z.boolean().default(false), 
    isHotTopic: z.boolean().default(false), 
    isFeatured: z.boolean().default(false), 
    heroImage: z.string().optional(), 
    heroImageCaption: z.string().optional(), 
    summary: z.string(),
    gallery: z.array(z.object({
      image: z.string(),
      caption: z.string()
    })).optional(), 
  }),
});

// 作者卡片結構
const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    avatar: z.string().default('/images/uploads/default-avatar.png'),
    bio: z.string().default('戰術少女研究室特約專欄作家。'),
  }),
});

export const collections = { blog, authors };
