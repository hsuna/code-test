function extendsClassES3(Child, Father) {
    //继承父类prototype中定义的实例属性和方法
    function ClassMiddle() {

    }
    ClassMiddle.prototype = Father.prototype;
    Child.prototype = new ClassMiddle();
    Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    for (var p in Father) {
        if (Father.hasOwnProperty(p)) {
            Child[p] = Father[p];
        }
    }
}

function extendsClassES5(Child, Father) {
    //继承父类prototype中定义的实例属性和方法
    Child.prototype = Object.create(Father.prototype);
    Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    Object.keys(Father).forEach(function(key) {
        Child[key] = Father[key];
    });
}

class Father{
    constructor(){

    }
}

class Child extends Father {
    constructor(){
        super()
    }
}


