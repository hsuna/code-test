

class A{
    constructor(){
        
    }
}

class B{
    public length:number = 10
    constructor(){
    }
}

var a:A = new A()
console.log((<B>a).length+'')