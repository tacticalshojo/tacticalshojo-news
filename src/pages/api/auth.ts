export const prerender = false; // 💡 強制動態執行，徹底擊落瀏覽器下載檔案的錯誤

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  // 導向到 Supabase 的認證端點，這裡會自動帶入你在 Vercel 設定的環境變數
  const supabaseUrl = process.env.SUPABASE_URL;
  
  if (!supabaseUrl) {
    return new Response("錯誤：未偵測到 SUPABASE_URL 環境變數，請檢查 Vercel 設定。", { status: 500 });
  }

  return redirect(`${supabaseUrl}/auth/v1/authorize?provider=github`);
};
