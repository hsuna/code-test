class Student implements Person {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
	toString():string{
		return 'test'
	}
}


class Student2 implements Person {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
	toString():string{
		return 'test'
	}
}

interface Person {
    firstName: string;
    lastName: string;
	toString();
}

function greeter(person : Student) {
    return "Hello, " + person.firstName + " " + person.lastName + "  " + person.toString();
}

let user:Student2 = new Student2("Jane", "M.", "User");

console.log(greeter(user))