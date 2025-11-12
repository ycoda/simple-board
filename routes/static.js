const Response = require('../utils/response');

function serveStaticFile(pathname, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            Response.notFound(res);
            return;
        }

        const ext = pathname.split(".").pop();
        const contentTypeMap = {
            "css": Response.CONTENT_TYPE_CSS,
            "js": Response.CONTENT_TYPE_JS
        };
        const contentType = contentTypeMap[ext] || Response.CONTENT_TYPR_HTML;
        Response.ok(res, data, contentType);
    });
}