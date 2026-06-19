export const prerender = false; // 強制動態執行

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response("錯誤：未接收到驗證令牌，登入可能失敗。", { status: 400 });
  }

  // 💡 修正：將驗證成功的訊息與 token，以 email 提供商的格式回傳給 Decap CMS 後台
  return new Response(`
    <script>
      const receiveMessage = (e) => {
        if (e.data === "authorizing:email" || e.data === "authorizing:github") {
          window.opener.postMessage(
            'authorization:email:success:{"token":"${code}","provider":"email"}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:email", "*");
    </script>
  `, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
};
