import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
const isProduction = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export default defineConfig({
  branch,
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
        name: "blog",
        label: "📰 戰術新聞通報",
        path: "src/content/blog",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "新聞標題", isTitle: true, required: true },
          // 🎯 只保留最基礎的圖片欄位與內文，其餘擴充欄位全部移除，強行對齊雲端突變
          { type: "image", name: "heroImage", label: "新聞首圖" },
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