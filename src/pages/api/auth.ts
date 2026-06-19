export const prerender = false; // 強制動態執行

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  
  if (!supabaseUrl) {
    return new Response("錯誤：未偵測到 SUPABASE_URL 環境變數。", { status: 500 });
  }

  // 💡 修正：直接導向 Supabase 的原生帳密密鑰驗證端點，不透過任何第三方 Provider
  return redirect(`${supabaseUrl}/auth/v1/authorize?provider=email`);
};
