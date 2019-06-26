var test1;
(function (test1) {
    // boolean
    var isDone = false;
    // error Type 'Boolean' is not assignable to type 'boolean'.
    var createdByNewBoolean = new Boolean(1);
    var createdByBoolean = Boolean(1);
    // number
    var decLiteral = 6;
    var hexLiteral = 0xf00d;
    var binaryLiteral = 10; //二进制表示法
    var octalLiteral = 484; //八进制表示法
    var notANumber = NaN;
    var infinityNumber = Infinity;
    // string
    var myName = 'Tom';
    var sentence = "Hello, my name is " + myName + ".";
    // void
    var unusable = undefined;
    // Null 和 Undefined
    var u = undefined;
    var n = null;
    var num = undefined; //所有类型子集
})(test1 || (test1 = {}));
var test2;
(function (test2) {
    // any 类型，则允许被赋值为任意类型。
    var myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    //未指定其类型，那么它会被识别为任意值类型
    var something;
    something = 'seven';
    something = 7;
})(test2 || (test2 = {}));
var test3;
(function (test3) {
    var myFavoriteNumber;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    myFavoriteNumber = true; // Type 'boolean' is not assignable to type 'string | number'.
})(test3 || (test3 = {}));
var TInterface;
(function (TInterface) {
    var tom = {
        //id: 897757,
        name: 'Tom',
        age: 25
    };
    //tom.id = 123456;
})(TInterface || (TInterface = {}));
var TArray;
(function (TArray) {
    var numArr = [1, 1, 2, 3, 5];
    var numArr2 = [1, 1, 2, '3', 5];
    var numArr3 = [1, 1, 2, '3', 5];
    var numArr4 = [1, '2', { a: 3 }];
    var arrayGeneric = [1, 1, 2, 3, 5];
    var iArr = [1, 1, 2, 3, 5];
})(TArray || (TArray = {}));
var TFunction;
(function (TFunction) {
    //函数声明
    function sum(x, y) {
        return x + y;
    }
    function init(x, y) {
        // Todo
    }
    //函数表达式
    var foo = function (x, y) {
        return x + y;
    };
    // 参数
    function bezier(a, b, c, d) {
        if (a === void 0) { a = 1; }
        return a + b + c;
    }
    bezier(1);
    bezier(1, 2);
    bezier(1, 2, 3);
    function reverse(x) {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        }
        else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    //TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
})(TFunction || (TFunction = {}));
var TControl;
(function (TControl) {
    var myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    // =>
    // let myFavoriteNumber:string = 'seven';
    // myFavoriteNumber = 7;
    function foo(something) {
        console.log(something.toString());
        console.log(something.length);
        console.log(something.length);
        console.log(something);
    }
    var event = 'click';
    var event2 = 'dbclick'; // Type '"dbclick"' is not assignable to parameter of type 'EventType'.
    function getName(n) {
        if (typeof n === 'string') {
            return n;
        }
        else {
            return n();
        }
    }
    var xcatliu = ['Xcat Liu', 25];
    xcatliu[0] = 'Xcat Liu';
    xcatliu[0] = 1; // Type '1' is not assignable to type 'string'.
    xcatliu.splice(0, 1);
    xcatliu.push(false); // Argument of type 'false' is not assignable to parameter of type 'string | number'.
    xcatliu.push('2');
    xcatliu.push(2);
    console.log(xcatliu);
})(TControl || (TControl = {}));
