"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var ioc_1 = require("./ioc");
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.sayHello = function () {
        console.log("hello");
    };
    C = __decorate([
        ioc_1.Injectable()
    ], C);
    return C;
}());
var B = /** @class */ (function () {
    function B(c) {
        this.c = c;
    }
    B.prototype.sayHello = function () {
        this.c.sayHello();
    };
    B = __decorate([
        ioc_1.Injectable()
    ], B);
    return B;
}());
var A = /** @class */ (function () {
    function A(b) {
        this.b = b;
    }
    A.prototype.sayHello = function () {
        this.b.sayHello();
    };
    A = __decorate([
        ioc_1.Injectable()
    ], A);
    return A;
}());
//产生实例
var a = ioc_1.classFactory(A);
console.log(a.sayHello());
