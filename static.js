// 静的ファイル配信関数
function serverStaticFile(pathname, res) {
    const filePath = "." + pathname;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            sendNotFound(res, "File Not Found");
            return;
        }

        const ext = pathname.split(".").pop();
        const contentType = {
            "css": "text/css",
            "js": "application/javascript",
            "html": "text/html"
        };

        sendOk(res, data, contentType[ext] || "text/plain");
    });
}
