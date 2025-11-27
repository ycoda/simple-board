const http = require('http');
const { handleRequest } = require('./routes/router')
const Response = require('./utils/response');

// ルーティング部分
const app = http.createServer(function (req, res) {
    try {
        handleRequest(req, res);
    } catch (error) {
        console.error('❌ Server Error:', error);
        Response.serverError(res, `Server Error: ${error.message}`);
    }
});

// サーバーを起動
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
