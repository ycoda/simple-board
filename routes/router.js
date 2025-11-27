// 投稿関連の処理を読み込む
const { showPostsList, PostForm, createPost } = require('../handlers/postsHandler');
const Response = require('../utils/response');
const { serveStaticFile } = require('../utils/static');

// ルーティング部分
function handleRequest(req, res) {
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
}

module.exports = { handleRequest };
