const fs = require('fs');
const path = require('path');
const Response = require('../utils/response');

// 静的ファイルを提供する関数
function serveStaticFile(pathname, res) {
    const filePath = path.join('.', pathname);
    console.log(`📁 Attempting to serve static file: ${filePath}`);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`❌ Static file not found: ${filePath}`);
            Response.notFound(res);
            return;
        }

        const ext = path.extname(pathname).slice(1);
        const contentTypeMap = {
            "css": Response.CONTENT_TYPE_CSS,
            "js": Response.CONTENT_TYPE_JS,
            "html": Response.CONTENT_TYPE_HTML,
            "ico": "image/x-icon",
            "png": "image/png",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "gif": "image/gif"
        };

        const contentType = contentTypeMap[ext] || Response.CONTENT_TYPE_TEXT;
        console.log(`✅ Serving ${filePath} as ${contentType}`);
        Response.ok(res, data, contentType);
    });
}

// 関数をエクスポート
module.exports = { serveStaticFile };
