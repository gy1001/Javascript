"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Analyzer_1 = __importDefault(require("./Analyzer"));
const crowller_1 = __importDefault(require("./crowller"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`<html>
    <body>
      <form action="/getData" method="post">
        <input type="password" placeholder="请输入密码" />
        <button type="submit">提交</button>
      </form>
    </body>
  </html>`);
    res.send('hello word');
});
router.post('/getData', (req, res) => {
    if (req.body.password === '123') {
        const sercret = 'serretKey';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`;
        // const analyzer = new Analyzer()
        const analyzer = Analyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('getData successful');
    }
    else {
        res.send('Password Error !');
    }
});
exports.default = router;
