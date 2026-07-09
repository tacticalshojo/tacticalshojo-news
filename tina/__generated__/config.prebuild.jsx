// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
var isProduction = false;
if (false) {
  isProduction = true;
}
if (process.env.VERCEL) {
  isProduction = true;
}
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "410a933e-c8db-45d4-8e1c-ae76904a70ef",
  token: process.env.TINA_TOKEN || "local-placeholder",
  isLocalEnv: !isProduction,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        // ✍️ 戰術強制重載：變更 label 加入閃電，強迫 Tina Cloud 重新載入最新 Schema 快取
        label: "\u{1F4F0}\u26A1\uFE0F \u6230\u8853\u65B0\u805E\u901A\u5831",
        path: "src/content/blog",
        format: "md",
        fields: [
          // 🎯 智慧改裝：更新交接指引，與 Tags 攔截雙防線併行
          {
            type: "string",
            name: "title",
            label: "\u65B0\u805E\u6A19\u984C",
            isTitle: true,
            required: true,
            description: "\u{1F4A1}\u3010\u6A19\u984C\u4E7E\u6DE8\u5EFA\u8B70\u3011\u73FE\u5728\u63A8\u85A6\u5C07\u6A19\u984C\u4FDD\u6301\u7D14\u6DE8\uFF08\u4F8B\u5982\uFF1A\u570B\u571F\u9632\u885B\u6F14\u7DF4\u6307\u5357\uFF09\u3002\u82E5\u7FD2\u6163\u820A\u65B9\u6CD5\uFF0C\u5728\u6A19\u984C\u5305\u542B\u4F5C\u8005\u540D\u5B57\uFF08\u5982 [Nina]\uFF09\u4EA6\u53EF\u89F8\u767C\u9023\u52D5\u3002\u672A\u6307\u5B9A\u6642\u9810\u8A2D\u70BA\u300C\u6230\u8853\u5C0F\u7DE8\u300D\u3002"
          },
          { type: "image", name: "heroImage", label: "\u65B0\u805E\u9996\u5716" },
          { type: "string", name: "heroImageCaption", label: "\u65B0\u805E\u9996\u5716\u5716\u8AAA" },
          // 🛰️ 收復項目 1：發布日期自動生成（後台可微調）
          {
            type: "datetime",
            name: "date",
            label: "\u767C\u5E03\u6642\u9593",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:mm"
            }
          },
          // 🛰️ 收復項目 2：大分類滑鼠下拉選單
          {
            type: "string",
            name: "category",
            label: "\u65B0\u805E\u5927\u5206\u985E",
            options: ["\u8ECD\u4E8B\u6230\u7565", "\u5168\u6C11\u9632\u885B", "\u6230\u8853\u81EA\u8A13", "\u8ECD\u5DE5\u7522\u696D", "\u8ECD\u98A8\u641C\u5947"]
          },
          // 🎯 全新配備：文章關鍵字標籤輸入清單（已追加作者提示說明）
          {
            type: "string",
            name: "tags",
            label: "\u{1F3F7}\uFE0F \u6587\u7AE0\u95DC\u9375\u5B57\u6A19\u7C64 (Tags)",
            list: true,
            ui: {
              component: "tags"
            },
            description: "\u{1F4A1}\u3010\u4F5C\u8005\u9023\u52D5\u63D0\u793A\u3011\u82E5\u8981\u6307\u5B9A\u6587\u7AE0\u4F5C\u8005\uFF0C\u8ACB\u5728\u6B64\u65B0\u589E\u4E00\u500B\u5C0D\u61C9\u7684\u6A19\u7C64\uFF08\u4F8B\u5982\uFF1A\u8F38\u5165\u300CNina\u300D\u4E26\u6309 Enter\u3002\u53EF\u9078\uFF1A\u6230\u8853\u5C0F\u7DE8\u3001\u7BC0\u76EE\u4F01\u5283\u3001Yelena\u3001Urica\u3001Nina\u3001Grace\u3001\u5BA2\u5EA7\u6295\u7A3F\uFF09\u3002\u7CFB\u7D71\u6703\u81EA\u52D5\u6C92\u6536\u524D\u53F0\u7684\u4F5C\u8005\u6A19\u7C64\uFF0C\u4E26\u5B8C\u7F8E\u9023\u52D5\u4E0B\u65B9\u7684\u4F5C\u8005\u8CC7\u8A0A\u5361\uFF01"
          },
          // 🛰️ 收復項目 3：首頁權重與輪播勾選框
          { type: "boolean", name: "isHeroBanner", label: "\u767B\u4E0A\u982D\u689D\u5927\u5716\u8F2A\u64AD\u5340 (Hero Banner)" },
          { type: "boolean", name: "isHotTopic", label: "\u6A19\u8A18\u70BA\u7126\u9EDE\u71B1\u9580\u6587\u7AE0 (Hot Topic)" },
          { type: "boolean", name: "isFeatured", label: "\u6A19\u8A18\u70BA\u63A8\u85A6\u7CBE\u9078\u6587\u7AE0 (Featured)" },
          // 🛰️ 收復項目 4：文字摘要導言
          { type: "string", name: "summary", label: "\u65B0\u805E\u7C21\u77ED\u6458\u8981/\u5C0E\u8A00", ui: { component: "textarea" } },
          // 🛰️ 收復項目 5：隨文圖片集
          {
            type: "object",
            name: "gallery",
            label: "\u{1F5BC}\uFE0F \u96A8\u6587\u5927\u5716\u5716\u7247\u96C6",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.caption || "\u672A\u547D\u540D\u5716\u7247" };
              }
            },
            fields: [
              { type: "image", name: "image", label: "\u4E0A\u50B3\u5716\u7247" },
              { type: "string", name: "caption", label: "\u5716\u7247\u63CF\u8FF0/\u5716\u8AAA" }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "\u8A73\u7D30\u65B0\u805E\u5167\u6587",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
