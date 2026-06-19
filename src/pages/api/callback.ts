export const prerender = false; // 💡 強制動態執行，確保與 auth.ts 同步擊落檔案下載錯誤

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response("錯誤：未接收到認證碼 (Code)，驗證流程可能已中斷。", { status: 400 });
  }

  // 將 Supabase 回傳的認證碼轉成 Decap CMS 看得懂的格式
  return new Response(`
    <script>
      const receiveMessage = (e) => {
        if (e.data === "authorizing:github") {
          window.opener.postMessage(
            'authorization:github:success:{"token":"${code}","provider":"github"}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
};
