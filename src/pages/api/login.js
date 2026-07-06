export const POST = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    // 🔒 直接從 Vercel 雲端金庫撈取設定好的環境變數
    const correctEmail = process.env.ADMIN_EMAIL;
    const correctPassword = process.env.ADMIN_PASSWORD;
    const githubToken = process.env.GITHUB_TOKEN;

    // 在伺服器後端進行極速核對，路人完全無法攔截比對過程
    if (email === correctEmail && password === correctPassword) {
      return new Response(
        JSON.stringify({
          success: true,
          token: githubToken // 核對成功，安全發放鑰匙
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
      JSON.stringify({ success: false, message: "後端防線發生未知異常。" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
