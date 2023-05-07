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
    res.send('hello word');
});
router.get('/getData', (req, res) => {
    const sercret = 'serretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`;
    // const analyzer = new Analyzer()
    const analyzer = Analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.send('getData successful');
});
exports.default = router;
