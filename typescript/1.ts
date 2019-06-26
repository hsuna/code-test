namespace test1{
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
