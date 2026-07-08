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
          { type: "image", name: "heroImage", label: "新聞首圖" },
          { type: "string", name: "heroImageCaption", label: "新聞首圖圖說" },
          
          // 🛰️ 收復項目 1：發布日期自動生成（後台可微調）
          { 
            type: "datetime", 
            name: "date", 
            label: "發布時間",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:mm",
            }
          },

          // 🛰️ 收復項目 2：大分類滑鼠下拉選單
          {
            type: "string",
            name: "category",
            label: "新聞大分類",
            options: ["軍事戰略", "全民防衛", "戰術自訓", "軍工產業", "軍風搜奇"],
          },

          // 🛰️ 收復項目 3：首頁權重與輪播勾選框
          { type: "boolean", name: "isHeroBanner", label: "登上頭條大圖輪播區 (Hero Banner)" },
          { type: "boolean", name: "isHotTopic", label: "標記為焦點熱門文章 (Hot Topic)" },
          { type: "boolean", name: "isFeatured", label: "標記為推薦精選文章 (Featured)" },

          // 🛰️ 收復項目 4：文字摘要導言
          { type: "string", name: "summary", label: "新聞簡短摘要/導言", ui: { component: "textarea" } },

          // 🛰️ 收復項目 5：隨文圖片集（可自由新增多張照片與圖說）
          {
            type: "object",
            name: "gallery",
            label: "🖼️ 隨文大圖圖片集",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.caption || "未命名圖片" }
              },
            },
            fields: [
              { type: "image", name: "image", label: "上傳圖片" },
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