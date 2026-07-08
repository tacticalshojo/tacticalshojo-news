import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
const isProduction = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export default defineConfig({
  branch,
  // 🎯 已精準修正為你當前 Tina Cloud 畫面上的真實新 ID
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "410a933e-c8db-45d4-8e1c-ae76904a70ef",
  token: process.env.TINA_TOKEN || "local-placeholder",
  isLocalEnv: !isProduction,

  build: {
    outputFolder: "admin", 
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "authors",
        label: "✍️ 編輯部作家管理",
        path: "src/content/authors",
        format: "json",
        fields: [
          { type: "string", name: "authorId", label: "作者代號 (英文/不可重複)", required: true },
          { type: "string", name: "name", label: "作者完整暱稱", required: true },
          { type: "image", name: "avatar", label: "作者大頭貼" },
          { type: "string", name: "bio", label: "作者簡介", ui: { component: "textarea" } },
        ],
      },
      {
        name: "blog",
        label: "📰 戰術新聞通報",
        path: "src/content/blog",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "新聞標題", isTitle: true, required: true },
          { 
            type: "string", 
            name: "description", 
            label: "新聞副標題 / 網址說明", 
            ui: {
              defaultValue: "戰術通報新聞"
            }
          },
          {
            type: "string",
            name: "authors",
            label: "✍️ 指定本文作者",
            list: true,
            ui: {
              component: "select",
              options: [
                { label: "戰術小編 (admin)", value: "src/content/authors/admin.json" }
              ]
            }
          },
          { type: "datetime", name: "date", label: "發布日期" },
          {
            type: "string",
            name: "category",
            label: "新聞大分類",
            options: ["軍事戰略", "全民防衛", "戰術自訓", "軍工產業", "軍風搜奇"],
          },
          { type: "boolean", name: "isHeroBanner", label: "登上頭條大圖輪播區 (Hero Banner)" },
          { type: "boolean", name: "isFeatured", label: "標記為焦點熱門文章" },
          { type: "boolean", name: "isHotTopic", label: "放入頂部臨時熱門專題橫幅" },
          { type: "image", name: "heroImage", label: "新聞首圖" },
          { type: "string", name: "heroImageCaption", label: "首圖圖說" },
          { type: "string", name: "summary", label: "新聞導言 / 前言摘要", ui: { component: "textarea" } },
          {
            type: "object",
            name: "gallery",
            label: "文內附加隨文圖片集",
            list: true,
            fields: [
              { type: "image", name: "image", label: "附加圖片" },
              { type: "string", name: "caption", label: "圖片描述/圖說" },
            ],
          },
          { 
            type: "rich-text", 
            name: "body", 
            label: "詳細新聞內文", 
            isBody: true
          },
        ],
      },
    ],
  },
});