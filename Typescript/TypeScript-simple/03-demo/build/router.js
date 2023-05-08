"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Analyzer_1 = __importDefault(require("./Analyzer"));
const crowller_1 = __importDefault(require("./crowller"));
const router = (0, express_1.Router)();
function checkLogin(req, res, next) {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        res.send('请先登录');
    }
}
router.get('/', (req, res) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send(`<html>
      <body>
      <a href="/getData">开始抓取内容</a>
      <br />
      <a href="/logout">退出</a>
      </body>
    </html>`);
        return;
    }
    res.send(`<html>
    <body>
      <form action="/login" method="post">
        <input name="password" type="password" placeholder="请输入密码" />
        <button type="submit">提交</button>
      </form>
    </body>
  </html>`);
    res.send('hello word');
});
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.login = false;
    }
    res.redirect('/');
});
router.post('/login', (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send('已经登录过了');
        return;
    }
    if (password === '123' && req.session) {
        req.session.login = true;
        res.send('登录成功');
    }
    else {
        res.send('登录失败');
    }
});
router.get('/getData', checkLogin, (req, res) => {
    const sercret = 'serretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`;
    // const analyzer = new Analyzer()
    const analyzer = Analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.send('getData successful');
});
router.get('/showData', checkLogin, (req, res) => {
    try {
        const filePath = path_1.default.resolve(__dirname, '../data/course.json');
        const content = fs_1.default.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(content));
    }
    catch (error) {
        res.send('还没有爬取到内容');
    }
});
exports.default = router;
