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
declare let cat: Cat;
declare let dog: Dog;
