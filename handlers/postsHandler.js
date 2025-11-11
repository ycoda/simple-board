// ファイルを読み書きする為の機能
const fs = require('fs');
// ファイルパスを扱うための機能
const path = require('path');

// 投稿一覧を表示する関数
function showPostsList(req, res) {
    fs.readFile("./views/index.html", "utf-8", (err, template) => {
        if (err) {
            sendServerError(res);
            return;
        }

        let postsHtml = "";
        posts.forEach(post => {
            const time = post.timestamp.toLocaleString("ja-JP");
            postsHtml += `
                <div class="post">
                  <div class="post-header">
                    <strong>${escapeHtml(post.name)}</strong>
                    <span class="timestamp">${time}</span>
                  </div>
                  <div class="post-message">${escapeHtml(post.message)}</div>
                </div>
              `;
        });

        const html = renderTemplate(template, {
            posts: postsHtml,
            count: posts.length
        });

        sendOk(res, html);
    });
}

// 投稿フォームを表示する関数
function showPostForm(req, res) {
    fs.readFile("./views/form.html", "utf-8", (err, html) => {
        if (err) {
            sendServerError(res);
            return;
        }
        sendOk(res, html);
    });
}

// 新規投稿を作成する関数
function createPost(req, res) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const data = querystring.parse(body);

        if (!data.name || !data.message) {
            sendBadRequest(res, '<h1>エラー</h1><p>名前とメッセージを入力してください</p>');
            return;
        }

        const newPost = {
            id: posts.length + 1,
            name: data.name,
            message: data.message,
            timestamp: new Date()
        };

        posts.push(newPost);
        sendRedirect(res, "/");
    });
}

// ⭐ レスポンスヘルパーを読み込む
const {
    sendOk,
    sendRedirect,
    sendBadRequest,
    sendServerError
} = require('../helper/responseHelper');
