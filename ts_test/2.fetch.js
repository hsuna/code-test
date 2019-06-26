"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch2 = function (url, params) {
    // dosomething
    return new Promise(function (resolve, reject) {
    });
};
exports.fetch2('url', {}).then(function (res) {
    if (res.code) {
        console.log(res.data);
    }
    else {
        console.log(res.msg);
    }
});
exports.fetch2('url', {}).then(function (res) {
    if (res.code) {
        console.log(res.data);
    }
    else {
        console.log(res.error);
    }
});
