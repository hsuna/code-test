var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    Student.prototype.toString = function () {
        return 'test';
    };
    return Student;
}());
var Student2 = /** @class */ (function () {
    function Student2(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    Student2.prototype.toString = function () {
        return 'test';
    };
    return Student2;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName + "  " + person.toString();
}
var user = new Student2("Jane", "M.", "User");
console.log(greeter(user));
