// --定数定義--
// Content-Type定義
const CONTENT_TYPE_HTML = "text/html; charset=utf-8";
const CONTENT_TYPE_TEXT = "text/plain";
const CONTENT_TYPE_CSS = "text/css";
const CONTENT_TYPE_JS = "application/javascript";

// デフォルトのエラーメッセージ
const ERROR_BAD_REQUEST = '<h1>エラー</h1><p>不正なリクエストです</p>';
const ERROR_NOT_FOUND = '<h1>404 Not Found</h1>';
const ERROR_SERVER = "Server Error";

// --レスポンスヘルパー関数--
// 基本のレスポンス送信関数
function sendResponse(res, statusCode, body, contentType = CONTENT_TYPE_HTML) {
    res.writeHead(statusCode, { "Content-Type": contentType });
    res.end(body);
}

// 200 OK
function sendOk(res, body, contentType = CONTENT_TYPE_HTML) {
    sendResponse(res, 200, body, contentType);
}

// 302 リダイレクト
function sendRedirect(res, location) {
    res.writeHead(302, { "Location": location });
    res.end();
}

// 400 Bad Request
function sendBadRequest(res, body = ERROR_BAD_REQUEST) {
    sendResponse(res, 400, body, CONTENT_TYPE_HTML);
}

// 404 Not Found
function sendNotFound(res, body = ERROR_NOT_FOUND) {
    sendResponse(res, 404, body, CONTENT_TYPE_HTML);
}

// 500 Server Error
function sendServerError(res, body = ERROR_SERVER) {
    sendResponse(res, 500, body, CONTENT_TYPE_TEXT);
}

module.exports = {
    CONTENT_TYPE_HTML,
    CONTENT_TYPE_TEXT,
    CONTENT_TYPE_CSS,
    CONTENT_TYPE_JS,
    sendOk,
    sendRedirect,
    sendBadRequest,
    sendNotFound,
    sendServerError
};
