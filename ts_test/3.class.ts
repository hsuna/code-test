interface IAnimal{
    readonly name: string;
    say():string;
}


abstract class Animal implements IAnimal {
    private _name: string;
    constructor(name:string){
        this._name = name;
    }
    say():string {
        return ''
    }
    get name():string {
        return this._name;
    }
}

class Cat extends Animal{
    say():string {
        return 'meow'
    }
}

class Dog extends Animal{
    say():string {
        return 'woof'
    }
}

//let animal: Animal = new Animal('') // Cannot create an instance of an abstract class.

function animalSay(animal:IAnimal){
    console.log(animal.name)
    console.log(animal.say())
    console.log('================')
}

let cat: Cat = new Cat('micro');
animalSay(cat)

let dog: Dog = new Dog('alex');
animalSay(dog)

