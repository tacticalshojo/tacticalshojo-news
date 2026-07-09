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
        label: "\u{1F4F0} \u6230\u8853\u65B0\u805E\u901A\u5831",
        path: "src/content/blog",
        format: "md",
        fields: [
          // 🎯 智慧改裝：加入清晰的交接指引，並移除獨立作者欄位防崩潰
          {
            type: "string",
            name: "title",
            label: "\u65B0\u805E\u6A19\u984C",
            isTitle: true,
            required: true,
            description: "\u26A0\uFE0F \u4EA4\u63A5\u63D0\u793A\uFF1A\u8ACB\u52D9\u5FC5\u5728\u6A19\u984C\u958B\u982D\u6216\u7D50\u5C3E\u52A0\u4E0A\u4F5C\u8005\u8B58\u5225\u78BC\uFF08\u4F8B\u5982\uFF1A[Nina] \u65B0\u805E\u6A19\u984C \u6216 [Yelena] \u65B0\u805E\u6A19\u984C\uFF09\uFF0C\u7CFB\u7D71\u524D\u7AEF\u6703\u81EA\u52D5\u5075\u6E2C\u4E26\u6E32\u67D3\u5C0D\u61C9\u7684\u4F5C\u8005\u7C21\u4ECB\u5361\u3002\u82E5\u672A\u586B\u5BEB\uFF0C\u7CFB\u7D71\u5C07\u9810\u8A2D\u70BA\u300C\u6230\u8853\u5C0F\u7DE8\u300D\u3002"
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
          // 🎯 全新配備：文章關鍵字標籤輸入清單
          {
            type: "string",
            name: "tags",
            label: "\u{1F3F7}\uFE0F \u6587\u7AE0\u95DC\u9375\u5B57\u6A19\u7C64 (Tags)",
            list: true,
            ui: {
              component: "tags"
            }
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
