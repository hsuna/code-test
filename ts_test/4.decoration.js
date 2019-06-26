var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//类装饰器
var classs = function (constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
    //类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
    console.log('classs:', constructor);
};
//方法装饰器
var method = function (target, propertyKey, descriptor) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    // descriptor: 成员的属性描述符 {value: any, writable: boolean, enumerable: boolean, configurable: boolean}
    console.log('method:', target, propertyKey, descriptor);
};
//访问器装饰器
var visitor = function (target, propertyKey, descriptor) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    // descriptor: 成员的属性描述符 {value: any, writable: boolean, enumerable: boolean, configurable: boolean}
    console.log('visitor:', target, propertyKey, descriptor);
};
//属性装饰器
var attribute = function (target, propertyKey) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    console.log('attribute:', target, propertyKey);
};
//参数装饰器
var params = function (target, propertyKey, parameterIndex) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    // parameterIndex: 参数在函数参数列表中的索引
    console.log('params:', target, propertyKey, parameterIndex);
};
var Test = /** @class */ (function () {
    function Test() {
        this._name = '';
    }
    Test.prototype.sayHello = function (test) {
    };
    Object.defineProperty(Test.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        attribute,
        __metadata("design:type", String)
    ], Test.prototype, "_name", void 0);
    __decorate([
        method,
        __param(0, params),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Test.prototype, "sayHello", null);
    __decorate([
        visitor,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], Test.prototype, "name", null);
    Test = __decorate([
        classs
    ], Test);
    return Test;
}());
