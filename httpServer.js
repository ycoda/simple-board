// Webサーバーを作るための機能
const http = require('http');
// 投稿関連の処理を読み込む
const postsHandler = require('./handlers/postsHandler');
const { showPostsList, showPostForm, createPost } = require('./routes/posts');
const { serverStaticFile } = require('./static');
const { sendNotFound } = require('./helper/responseHelper');
// ルーティング部分
const httpServer = http.createServer(function (req, res) {
    console.log("======================");
    console.log("メソッド：", req.method);
    console.log("URL: ", req.url);
    console.log("ヘッダー：", req.headers);
    console.log("======================");

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    if (pathname === "/" && method === "GET") {
        showPostsList(req, res);
    } else if (pathname === "/new" && method === "GET") {
        showPostForm(req, res);
    } else if (pathname === "/create" && method === "POST") {
        createPost(req, res);
    } else if (pathname.startsWith("/public/")) {
        serverStaticFile(pathname, res);
    } else {
        sendNotFound(res);
    }
});

// サーバーを起動
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

