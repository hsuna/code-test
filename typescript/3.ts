import { Injectable, classFactory } from './ioc'

@Injectable()
class C{
    constructor(){}

    sayHello(){
        console.log("hello")
    }
}

@Injectable()
class B{
    constructor(private c:C){

    }

    sayHello(){
        this.c.sayHello();
    }
}

@Injectable()
class A{
    constructor(private b:B){
    }    

    sayHello(){
        this.b.sayHello();
    }
}

//产生实例
let a:A = classFactory(A);
console.log(a.sayHello())