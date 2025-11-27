// ファイルを読み書きする為の機能
const fs = require('fs');
// ファイルパスを扱うための機能
const path = require('path');
// URLエンコードされたデータを解析
const querystring = require('querystring');
// レスポンス
const Response = require('../utils/response');

// 投稿データを保存する配列（本来はデータベースを使用）
let posts = [];

// HTMLエスケープ関数
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, char => map[char]);
}

// テンプレートを置換する関数
function renderTemplate(template, data) {
    let result = template;
    for (const key in data) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(placeholder, data[key]);
    }
    return result;
}

// 投稿一覧を表示する関数
function showPostsList(req, res) {
    fs.readFile("./views/index.html", "utf-8", (err, template) => {
        if (err) {
            Response.serverError(res);
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

        Response.ok(res, html);
    });
}

// 投稿フォームを表示する関数
function PostForm(req, res) {
    fs.readFile("./views/form.html", "utf-8", (err, html) => {
        if (err) {
            Response.serverError(res);
            return;
        }
        Response.ok(res, html);
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
            Response.badRequest(res, '<h1>エラー</h1><p>名前とメッセージを入力してください</p>');
            return;
        }

        const newPost = {
            id: posts.length + 1,
            name: data.name,
            message: data.message,
            timestamp: new Date()
        };

        posts.push(newPost);
        Response.redirect(res, "/");
    });
}

// 関数をエクスポート
module.exports = {
    showPostsList,
    PostForm,
    createPost
};