// ⚔️ 核心戰術：在 hybrid 混合模式下，必須強制關閉預渲染，Vercel 才會為其建立獨立的 Serverless 動態後端。
export const prerender = false;

export const POST = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    // 🔒 升級防線：使用 Astro 內建標準環境變數接口，確保 100% 從 Vercel 雲端金庫撈取資料
    const correctEmail = import.meta.env.ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const correctPassword = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    const githubToken = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;

    // 檢查雲端金庫是否配置完成，防止空值對比漏洞
    if (!correctEmail || !correctPassword || !githubToken) {
      return new Response(
        JSON.stringify({ success: false, message: "後端防線宣告失敗：Vercel 環境變數未配置或未生效。" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 在 Vercel 伺服器內部進行極速核對
    if (email === correctEmail && password === correctPassword) {
      return new Response(
        JSON.stringify({
          success: true,
          token: githubToken // 核對通關，安全向前端發放代鑰
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "管理員帳號或密碼錯誤。" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "後端防線發生未知異常：" + error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
