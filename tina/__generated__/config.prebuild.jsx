// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
var isProduction = !!process.env.VERCEL;
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "905a08c7-f409-47d2-a265-4f3388c1ede1",
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
        name: "authors",
        label: "\u270D\uFE0F \u7DE8\u8F2F\u90E8\u4F5C\u5BB6\u7BA1\u7406",
        path: "src/content/authors",
        format: "json",
        fields: [
          { type: "string", name: "authorId", label: "\u4F5C\u8005\u4EE3\u865F (\u82F1\u6587/\u4E0D\u53EF\u91CD\u8907)", required: true },
          { type: "string", name: "name", label: "\u4F5C\u8005\u5B8C\u6574\u66B1\u7A31", required: true },
          { type: "image", name: "avatar", label: "\u4F5C\u8005\u5927\u982D\u8CBC" },
          { type: "string", name: "bio", label: "\u4F5C\u8005\u7C21\u4ECB", ui: { component: "textarea" } }
        ]
      },
      {
        name: "blog",
        label: "\u{1F4F0} \u6230\u8853\u65B0\u805E\u901A\u5831",
        path: "src/content/blog",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "\u65B0\u805E\u6A19\u984C", isTitle: true, required: true },
          {
            type: "string",
            name: "description",
            label: "\u65B0\u805E\u526F\u6A19\u984C / \u7DB2\u5740\u8AAA\u660E",
            required: true
          },
          {
            type: "string",
            name: "authors",
            label: "\u270D\uFE0F \u6307\u5B9A\u672C\u6587\u4F5C\u8005",
            list: true,
            ui: {
              component: "select",
              options: [
                { label: "\u6230\u8853\u5C0F\u7DE8 (admin)", value: "src/content/authors/admin.json" }
              ]
            }
          },
          { type: "datetime", name: "date", label: "\u767C\u5E03\u65E5\u671F" },
          {
            type: "string",
            name: "category",
            label: "\u65B0\u805E\u5927\u5206\u985E",
            options: ["\u8ECD\u4E8B\u6230\u7565", "\u5168\u6C11\u9632\u885B", "\u6230\u8853\u81EA\u8A13", "\u8ECD\u5DE5\u7522\u696D", "\u8ECD\u98A8\u641C\u5947"]
          },
          { type: "boolean", name: "isHeroBanner", label: "\u767B\u4E0A\u982D\u689D\u5927\u5716\u8F2A\u64AD\u5340 (Hero Banner)" },
          { type: "boolean", name: "isFeatured", label: "\u6A19\u8A18\u70BA\u7126\u9EDE\u71B1\u9580\u6587\u7AE0" },
          { type: "boolean", name: "isHotTopic", label: "\u653E\u5165\u9802\u90E8\u81E8\u6642\u71B1\u9580\u5C08\u984C\u6A6B\u5E45" },
          { type: "image", name: "heroImage", label: "\u65B0\u805E\u9996\u5716" },
          { type: "string", name: "heroImageCaption", label: "\u9996\u5716\u5716\u8AAA" },
          { type: "string", name: "summary", label: "\u65B0\u805E\u5C0E\u8A00 / \u524D\u8A00\u6458\u8981", ui: { component: "textarea" } },
          {
            type: "object",
            name: "gallery",
            label: "\u6587\u5167\u9644\u52A0\u96A8\u6587\u5716\u7247\u96C6",
            list: true,
            fields: [
              { type: "image", name: "image", label: "\u9644\u52A0\u5716\u7247" },
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
