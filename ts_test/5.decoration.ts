//类装饰器
const classs = (constructor: Function) =>{
    Object.seal(constructor)
    Object.seal(constructor.prototype)
    //类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
    console.log('classs:', constructor)
}

//方法装饰器
const method = (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    // descriptor: 成员的属性描述符 {value: any, writable: boolean, enumerable: boolean, configurable: boolean}
    console.log('method:', target, propertyKey, descriptor)
}

//访问器装饰器
const visitor = (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    // descriptor: 成员的属性描述符 {value: any, writable: boolean, enumerable: boolean, configurable: boolean}
    console.log('visitor:', target, propertyKey, descriptor)
}


//属性装饰器
const attribute = (target, propertyKey: string) => {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    console.log('attribute:', target, propertyKey)
}

//参数装饰器
const params = (target, propertyKey: string, parameterIndex: number) => {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyKey: 成员的名字
    // parameterIndex: 参数在函数参数列表中的索引
    console.log('params:', target, propertyKey, parameterIndex)
}


@classs
class Test {
    @attribute
    _name: string = ''

    @method
    sayHello (@params test:string):void { 

    }

    @visitor
    get name ():string {
        return this._name
    }
}