import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

// 🚀 戰術修正：改用最傳統穩健的布林判定，徹底繞過 Tina CMS 編譯器的 "&&" 轉譯 Bug
let isProduction = false;
if (process.env.NODE_ENV === "production") {
  isProduction = true;
}
if (process.env.VERCEL) {
  isProduction = true;
}

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
        // ✍️ 戰術強制重載：變更 label 加入閃電，強迫 Tina Cloud 重新載入最新 Schema 快取
        label: "📰⚡️ 戰術新聞通報",
        path: "src/content/blog",
        format: "md",
        fields: [
          // 🎯 智慧改裝：更新交接指引，與 Tags 攔截雙防線併行
          { 
            type: "string", 
            name: "title", 
            label: "新聞標題", 
            isTitle: true, 
            required: true,
            description: "💡【標題乾淨建議】現在推薦將標題保持純淨（例如：國土防衛演練指南）。若習慣舊方法，在標題包含作者名字（如 [Nina]）亦可觸發連動。未指定時預設為「戰術小編」。"
          },
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

          // 🎯 全新配備：文章關鍵字標籤輸入清單（已追加作者提示說明）
          {
            type: "string",
            name: "tags",
            label: "🏷️ 文章關鍵字標籤 (Tags)",
            list: true,
            ui: {
              component: "tags",
            },
            description: "💡【作者連動提示】若要指定文章作者，請在此新增一個對應的標籤（例如：輸入「Nina」並按 Enter。可選：戰術小編、節目企劃、Yelena、Urica、Nina、Grace、客座投稿）。系統會自動沒收前台的作者標籤，並完美連動下方的作者資訊卡！"
          },

          // 🛰️ 收復項目 3：首頁權重與輪播勾選框
          { type: "boolean", name: "isHeroBanner", label: "登上頭條大圖輪播區 (Hero Banner)" },
          { type: "boolean", name: "isHotTopic", label: "標記為焦點熱門文章 (Hot Topic)" },
          { type: "boolean", name: "isFeatured", label: "標記為推薦精選文章 (Featured)" },

          // 🛰️ 收復項目 4：文字摘要導言
          { type: "string", name: "summary", label: "新聞簡短摘要/導言", ui: { component: "textarea" } },

          // 🛰️ 收復項目 5：隨文圖片集
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