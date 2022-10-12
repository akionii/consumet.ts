"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = exports.getDays = exports.capitalizeFirstLetter = exports.range = exports.genElement = exports.formatTitle = exports.floorID = exports.splitAuthor = exports.days = exports.USER_AGENT = void 0;
const cheerio_1 = require("cheerio");
exports.USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
exports.days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const splitAuthor = (authors) => {
    const res = [];
    let eater = '';
    for (let i = 0; i < authors.length; i++) {
        if (authors[i] == ' ' && (authors[i - 1] == ',' || authors[i - 1] == ';')) {
            continue;
        }
        if (authors[i] == ',' || authors[i] == ';') {
            res.push(eater.trim());
            eater = '';
            continue;
        }
        eater += authors[i];
    }
    res.push(eater);
    return res;
};
exports.splitAuthor = splitAuthor;
const floorID = (id) => {
    let imp = '';
    for (let i = 0; i < (id === null || id === void 0 ? void 0 : id.length) - 3; i++) {
        imp += id[i];
    }
    const idV = parseInt(imp);
    return idV * 1000;
};
exports.floorID = floorID;
const formatTitle = (title) => {
    const result = title.replace(/[0-9]/g, '');
    return result.trim();
};
exports.formatTitle = formatTitle;
const genElement = (s, e) => {
    if (s == '')
        return;
    const $ = (0, cheerio_1.load)(e);
    let i = 0;
    let str = '';
    let el = $();
    for (; i < s.length; i++) {
        if (s[i] == ' ') {
            el = $(str);
            str = '';
            i++;
            break;
        }
        str += s[i];
    }
    for (; i < s.length; i++) {
        if (s[i] == ' ') {
            el = $(el).children(str);
            str = '';
            continue;
        }
        str += s[i];
    }
    el = $(el).children(str);
    return el;
};
exports.genElement = genElement;
const range = ({ from = 0, to = 0, step = 1, length = Math.ceil((to - from) / step) }) => Array.from({ length }, (_, i) => from + i * step);
exports.range = range;
const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const getDays = (day1, day2) => {
    const day1Index = exports.days.indexOf((0, exports.capitalizeFirstLetter)(day1)) - 1;
    const day2Index = exports.days.indexOf((0, exports.capitalizeFirstLetter)(day2)) - 1;
    const now = new Date();
    const day1Date = new Date();
    const day2Date = new Date();
    day1Date.setDate(now.getDate() + ((day1Index + 7 - now.getDay()) % 7));
    day2Date.setDate(now.getDate() + ((day2Index + 7 - now.getDay()) % 7));
    day1Date.setHours(0, 0, 0, 0);
    day2Date.setHours(0, 0, 0, 0);
    return [day1Date.getTime() / 1000, day2Date.getTime() / 1000];
};
exports.getDays = getDays;
const isJson = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.isJson = isJson;
//# sourceMappingURL=utils.js.map