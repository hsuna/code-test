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
declare let user: Student2;
