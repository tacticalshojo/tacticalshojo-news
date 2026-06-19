export const prerender = false; // 💡 強制動態執行，確保與 auth.js 同步擊落檔案下載錯誤

export async function GET({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

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
    headers: { 'Content-Type': 'text/html' }
  });
}
