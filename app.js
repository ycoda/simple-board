// Webサーバーを作るための機能
const http = require('http');
// 投稿関連の処理を読み込む
const { showPostsList, PostForm, createPost } = require('./handlers/postsHandler');
const Response = require('./utils/response');
const { serveStaticFile } = require('./middleware/static');

// ルーティング部分
const httpServer = http.createServer(function (req, res) {
    try {
        // 新しいURL APIを使用（セキュリティ向上）
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        console.log(`${method} ${pathname}`);

        if (pathname === "/" && method === "GET") {
            showPostsList(req, res);
        } else if (pathname === "/new" && method === "GET") {
            PostForm(req, res);
        } else if (pathname === "/create" && method === "POST") {
            createPost(req, res);
        } else if (pathname.startsWith("/public/") || pathname === "/favicon.ico") {
            serveStaticFile(pathname, res);
        } else {
            // Responseクラスの静的メソッドを正しく呼び出す
            Response.notFound(res);
        }
    } catch (error) {
        console.error('❌ Server Error:', error);
        Response.serverError(res, `Server Error: ${error.message}`);
    }
});

// サーバーを起動
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
