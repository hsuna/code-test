"use strict";
exports.__esModule = true;
require("reflect-metadata");
//ioc容器
var classPool = [];
//注册该类进入容器
function Injectable() {
    return function (_constructor) {
        var paramTypes = Reflect.getMetadata('design:paramtypes', _constructor);
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
    var paramTypes = Reflect.getMetadata('design:paramtypes', _constructor);
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
