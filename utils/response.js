class Response {
    static CONTENT_TYPE_HTML = "text/html; charset=utf-8";
    static CONTENT_TYPE_TEXT = "text/plain";
    static CONTENT_TYPE_CSS = "text/css";
    static CONTENT_TYPE_JS = "application/javascript";

    // デフォルトのエラーメッセージ
    static ERROR_BAD_REQUEST = '<h1>エラー</h1><p>不正なリクエストです</p>';
    static ERROR_NOT_FOUND = '<h1>404 Not Found</h1>';
    static ERROR_SERVER = "Server Error";

    // 内部ヘルパー
    static send(res, statusCode, body, contentType = Response.CONTENT_TYPE_HTML) {
        res.writeHead(statusCode, {"Content-Type": contentType});
        res.end(body);
    }

    static ok(res, body, contentType = Response.CONTENT_TYPE_HTML) {
        Response.send(res, 200, body, contentType);
    }

    static redirect(res, location) {
        res.writeHead(302, {"Location": location});
        res.end();
    }

    static badRequest(res, body = Response.ERROR_BAD_REQUEST) {
        Response.send(res, 400, body, Response.CONTENT_TYPE_HTML);
    }

    static notFound(res, body = Response.ERROR_NOT_FOUND) {
        Response.send(res, 404, body, Response.CONTENT_TYPE_HTML);
    }

    static serverError(res, body = Response.ERROR_SERVER) {
        Response.send(res, 500, body, Response.CONTENT_TYPE_TEXT);
    }
}

module.exports = Response;