"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class Analyzer {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Analyzer();
        }
        return this.instance;
    }
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courseItems = $('.course-item');
        const courseInfos = [];
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc');
            const title = descs.eq(0).text();
            const count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfos.push({
                title,
                count,
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    }
    analyzer(html, filePath) {
        const courseResult = this.getCourseInfo(html);
        const fileContent = this.genereateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent, null, 2);
    }
    genereateJsonContent(courseResult, filePath) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseResult.time] = courseResult.data;
        return fileContent;
    }
}
exports.default = Analyzer;
