export async function GET({ redirect }) {
  // 導向到 Supabase 的認證端點，這裡會自動帶入你在 Vercel 設定的環境變數
  const supabaseUrl = process.env.SUPABASE_URL;
  return redirect(`${supabaseUrl}/auth/v1/authorize?provider=github`);
}
