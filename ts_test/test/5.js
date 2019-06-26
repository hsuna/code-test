var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.walk = function () {
    };
    Bird.prototype.swim = function () {
    };
    Bird.prototype.cry = function () {
        return 'jjzz';
    };
    return Bird;
}());
function say(duck) {
    console.log(duck.cry());
}
var bird = new Bird();
say(bird);
