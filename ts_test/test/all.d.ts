declare namespace ts2 {
}
interface Duck {
    walk(): any;
    swim(): any;
    cry(): any;
}
declare class Bird {
    walk(): void;
    swim(): void;
    cry(): string;
}
declare function say(duck: Duck): void;
declare let bird: Bird;
interface IAnimal {
    readonly name: string;
    say(): string;
}
declare abstract class Animal implements IAnimal {
    private _name;
    constructor(name: string);
    say(): string;
    readonly name: string;
}
declare class Cat extends Animal {
    say(): string;
}
declare class Dog extends Animal {
    say(): string;
}
declare function animalSay(animal: IAnimal): void;
declare let cat: Cat;
declare let dog: Dog;
declare class Student implements Person {
    firstName: any;
    middleInitial: any;
    lastName: any;
    fullName: string;
    constructor(firstName: any, middleInitial: any, lastName: any);
    toString(): string;
}
declare class Student2 implements Person {
    firstName: any;
    middleInitial: any;
    lastName: any;
    fullName: string;
    constructor(firstName: any, middleInitial: any, lastName: any);
    toString(): string;
}
interface Person {
    firstName: string;
    lastName: string;
    toString(): any;
}
declare function greeter(person: Student): string;
declare let user: Student2;
