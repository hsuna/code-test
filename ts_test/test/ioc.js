"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var reflect_metadata_1 = require("reflect-metadata");
//ioc容器
var classPool = [];
//注册该类进入容器
function Injectable() {
    return function (_constructor) {
        var paramTypes = reflect_metadata_1.default.getMetadata('design:paramtypes', _constructor);
        //已注册
        if (classPool.indexOf(_constructor) != -1)
            return;
        for (var _i = 0, paramTypes_1 = paramTypes; _i < paramTypes_1.length; _i++) {
            var val = paramTypes_1[_i];
            if (val === _constructor)
                throw new Error('不能依赖自己');
            else if (classPool.indexOf(val) == -1)
                throw new Error(val + "\u6CA1\u6709\u88AB\u6CE8\u518C");
        }
        //注册
        classPool.push(_constructor);
    };
}
exports.Injectable = Injectable;
//实例化工厂
function classFactory(_constructor) {
    var paramTypes = reflect_metadata_1.default.getMetadata('design:paramtypes', _constructor);
    //参数实例化
    var paramInstance = paramTypes.map(function (val) {
        //依赖的类必须全部进行注册
        if (classPool.indexOf(val) == -1)
            throw new Error(val + "\u6CA1\u6709\u88AB\u6CE8\u518C");
        //参数还有依赖
        else if (val.length) {
            return classFactory(val);
        }
        //没有依赖直接创建实例
        else {
            return new val();
        }
    });
    return new (_constructor.bind.apply(_constructor, [void 0].concat(paramInstance)))();
}
exports.classFactory = classFactory;
var Injectable = function () { return function (target) { }; };
var OtherService = /** @class */ (function () {
    function OtherService() {
        this.a = 1;
    }
    return OtherService;
}());
var TestService = /** @class */ (function () {
    function TestService(otherService) {
        this.otherService = otherService;
    }
    TestService.prototype.testMethod = function () {
        console.log(this.otherService.a);
    };
    TestService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [OtherService])
    ], TestService);
    return TestService;
}());
var Factory = function (target) {
    // 获取所有注入的服务
    var providers = reflect_metadata_1.default.getMetadata('design:paramtypes', target); // [OtherService]
    var args = providers.map(function (provider) { return new provider(); });
    return new (target.bind.apply(target, [void 0].concat(args)))();
};
Factory(TestService).testMethod(); // 1
