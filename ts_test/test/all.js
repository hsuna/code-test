var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* namespace test1{
    // boolean
    let isDone: boolean = false;
    // error Type 'Boolean' is not assignable to type 'boolean'.
    let createdByNewBoolean: boolean = new Boolean(1);
    let createdByBoolean: boolean = Boolean(1);

    // number
    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;//二进制表示法
    let octalLiteral: number = 0o744;//八进制表示法
    let notANumber: number = NaN;
    let infinityNumber: number = Infinity;

    // string
    let myName: string = 'Tom';
    let sentence: string = `Hello, my name is ${myName}.`;

    // void
    let unusable: void = undefined;

    // Null 和 Undefined
    let u: undefined = undefined;
    let n: null = null;

    let num: number = undefined;//所有类型子集
}

namespace test2{
    // any 类型，则允许被赋值为任意类型。
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;

    //未指定其类型，那么它会被识别为任意值类型
    let something;
    something = 'seven';
    something = 7;
}

namespace test3{

    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;

    myFavoriteNumber = true; // Type 'boolean' is not assignable to type 'string | number'.
    
}

namespace TInterface{

    interface Person {
        //readonly id: number;
        name: string;
        age: number;
        //age?: number;
        //[propName: string]: string;
        //[propName: string]: any;
    }
    
    let tom: Person = {
        //id: 897757,
        name: 'Tom',
        age: 25,
        //gender: 'male'
    };
    //tom.id = 123456;
}

namespace TArray{

    let numArr: number[] = [1, 1, 2, 3, 5];
    let numArr2: number[] = [1, 1, 2, '3', 5];
    let numArr3: (number|string)[] = [1, 1, 2, '3', 5];
    let numArr4: any[] = [1, '2', {a:3}];

    let arrayGeneric: Array<number> = [1, 1, 2, 3, 5];

    interface NumberArray {
        [index: number]: number;
    }
    let iArr: NumberArray = [1, 1, 2, 3, 5];

}

namespace TFunction{
    //函数声明
    function sum(x:number, y:number):number {
        return x + y;
    }
    function init(x:number, y:number):void {
        // Todo
    }

    //函数表达式
    let foo = function(x:number, y:number):number {
        return x + y;
    }

    // 参数
    function bezier(a:number=1, b?:number, c:number, d?:number):number {
        return a + b + c;
    }
    bezier(1)
    bezier(1, 2)
    bezier(1, 2, 3)

    // 函数重载
    function reverse(x: number): number;//函数定义
    function reverse(x: string): string;//函数定义
    function reverse(x: number | string): number | string {//函数实现
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    //TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
}

namespace TControl{

    let myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    // =>
    // let myFavoriteNumber:string = 'seven';
    // myFavoriteNumber = 7;

    function foo(something: string|number):void{
        console.log(something.toString())
        console.log(something.length)
        console.log((<string>something).length)
        console.log(<boolean>something)
    }

    type EventType = 'click' | 'scroll' | 'mousemove';
    let event:EventType = 'click'
    let event2:EventType = 'dbclick'// Type '"dbclick"' is not assignable to parameter of type 'EventType'.

    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;
    function getName(n: NameOrResolver): Name {
        if (typeof n === 'string') {
            return n;
        } else {
            return n();
        }
    }

    let xcatliu: [string, number] = ['Xcat Liu', 25];
    xcatliu[0] = 'Xcat Liu';
    xcatliu[0] = 1; // Type '1' is not assignable to type 'string'.

    xcatliu.splice(0,1);
    xcatliu.push(false) // Argument of type 'false' is not assignable to parameter of type 'string | number'.
    xcatliu.push('2')
    xcatliu.push(2)
    console.log(xcatliu)
}
 */ 
var ts2;
(function (ts2) {
    var Colors;
    (function (Colors) {
        Colors[Colors["REB"] = 0] = "REB";
        Colors[Colors["GREEN"] = 1] = "GREEN";
        Colors[Colors["BLUE"] = 2] = "BLUE";
    })(Colors || (Colors = {}));
    ;
    console.log(Colors["REB"]); //0
    console.log(Colors["GREEN"]); //1
    console.log(Colors["BLUE"]); //2
    console.log(Colors[0]); //REB
    console.log(Colors[1]); //GREEN
    console.log(Colors[2]); //BLUE
    var Days;
    (function (Days) {
        Days[Days["Sun"] = 2] = "Sun";
        Days[Days["Mon"] = -1] = "Mon";
        Days[Days["Tue"] = 0] = "Tue";
        Days[Days["Wed"] = 1] = "Wed";
        Days[Days["Thu"] = 2] = "Thu";
        Days[Days["Fri"] = 3] = "Fri";
        Days[Days["Sat"] = 4] = "Sat";
    })(Days || (Days = {}));
    ;
    console.log(Days["Sun"]); //2
    console.log(Days["Mon"]); //-1
    console.log(Days["Tue"]); //0
    console.log(Days["Wed"]); //1
    console.log(Days["Thu"]); //2
    console.log(Days["Fri"]); //3
    console.log(Days["Sat"]); //4
})(ts2 || (ts2 = {}));
var A = /** @class */ (function () {
    function A() {
        this.length = 2;
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
        this.length = 10;
    }
    return B;
}());
var a = new A();
console.log(a.length + '');
var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.walk = function () {
    };
    Bird.prototype.swim = function () {
    };
    Bird.prototype.cry = function () {
        return 'jjzz';
    };
    return Bird;
}());
function say(duck) {
    console.log(duck.cry());
}
var bird = new Bird();
say(bird);
var Animal = /** @class */ (function () {
    function Animal(name) {
        this._name = name;
    }
    Animal.prototype.say = function () {
        return '';
    };
    Object.defineProperty(Animal.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.say = function () {
        return 'meow';
    };
    return Cat;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.say = function () {
        return 'woof';
    };
    return Dog;
}(Animal));
//let animal: Animal = new Animal('') // Cannot create an instance of an abstract class.
function animalSay(animal) {
    console.log(animal.name);
    console.log(animal.say());
    console.log('================');
}
var cat = new Cat('micro');
animalSay(cat);
var dog = new Dog('alex');
animalSay(dog);
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    Student.prototype.toString = function () {
        return 'test';
    };
    return Student;
}());
var Student2 = /** @class */ (function () {
    function Student2(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    Student2.prototype.toString = function () {
        return 'test';
    };
    return Student2;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName + "  " + person.toString();
}
var user = new Student2("Jane", "M.", "User");
console.log(greeter(user));
