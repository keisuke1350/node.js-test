const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native");
const cors = require("cors");



//local
//http://localhost:5000/nodejs-firebase-41128/us-central1/helloWorld)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();

app.use(cors());

// APIにリクエストを送る関数を定義
const getDataFromApi = async (keyword) => {
    // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
    const requestUrl =
        "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
};

app.get('/gbooks/:keyword', async(req, res) => {
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
});

app.get('/hello',(req,res) => {
    res.send('Hello, Express');
});

app.get('/user/:userId',(req, res) => {
    const users = [
        { id: 1, name: "ジョナサン" },
        { id: 2, name: "ジョセフ" },
        { id: 3, name: "承太郎" },
        { id: 4, name: "仗助" },
        { id: 5, name: "ジョルノ" },
    ];
    const targetUser = users.find(user => user.id === Number(req.params.userId));
    res.send(targetUser);
});

// 出力
const api = functions.https.onRequest(app);
module.exports = { api };

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
