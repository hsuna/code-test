/**
 * 抽象工厂模式（Abstract Factory）
 */
interface AbstractProductA {
    toString():string
}

interface AbstractProductB {
    toString():string
}

class ProductA1 implements AbstractProductA {
    private value:string = 'productA1';

    toString():string{
        return this.value;
    }
}

class ProductA2 implements AbstractProductA {
    private value:string = 'productA2';

    toString():string{
        return this.value;
    }
}

class ProductB1 implements AbstractProductB {
    private value:string = 'productB1';

    toString():string{
        return this.value;
    }
}

class ProductB2 implements AbstractProductB {
    private value:string = 'productB2';

    toString():string{
        return this.value;
    }
}

abstract class AbstractFactory {
    constructor() {
    }
    abstract createProductA():AbstractProductA;
    abstract createProductB():AbstractProductB;
}

class ConcreteFactory1 extends AbstractFactory {
    createProductA():AbstractProductA {
        return new ProductA1();
    }
    createProductB():AbstractProductB {
        return new ProductB1();
    }
}

class ConcreteFactory2 extends AbstractFactory {
    createProductA():AbstractProductA {
        return new ProductA2();
    }
    createProductB():AbstractProductB {
        return new ProductB2();
    }
}

let abstractFactory:AbstractFactory = new ConcreteFactory1();
let productA:AbstractProductA = abstractFactory.createProductA();
let productB:AbstractProductB = abstractFactory.createProductB();
productA.toString();
productB.toString();