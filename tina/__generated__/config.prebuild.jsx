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
          { type: "string", name: "title", label: "\u65B0\u805E\u6A19\u984C", isTitle: true, required: true },
          { type: "image", name: "heroImage", label: "\u65B0\u805E\u9996\u5716" },
          { type: "string", name: "heroImageCaption", label: "\u65B0\u805E\u9996\u5716\u5716\u8AAA" },
          // ✍️ 全新配備：戰術作者群下拉式單選
          {
            type: "string",
            name: "authors",
            label: "\u8CA0\u8CAC\u4F5C\u8005",
            list: true,
            options: [
              { value: "editor", label: "\u6230\u8853\u5C0F\u7DE8" },
              { value: "producer", label: "\u7BC0\u76EE\u4F01\u5283" },
              { value: "yelena", label: "Yelena" },
              { value: "urica", label: "Urica" },
              { value: "nina", label: "Nina" },
              { value: "grace", label: "Grace" },
              { value: "guest", label: "\u5BA2\u5EA7\u6295\u7A3F" }
            ]
          },
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
      },
      // ✍️ 獨立連動：作者名單管理集合（JSON 資料集格式）
      {
        name: "authors",
        label: "\u270D\uFE0F \u4F5C\u8005\u540D\u55AE\u7BA1\u7406",
        path: "src/content/authors",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "\u4F5C\u8005\u986F\u793A\u540D\u7A31", isTitle: true, required: true },
          { type: "image", name: "avatar", label: "\u4F5C\u8005\u5927\u982D\u8CBC" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
