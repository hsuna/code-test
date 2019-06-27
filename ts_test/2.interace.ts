interface Duck{
    walk();
    swim();
    cry();
}

class Bird{
    walk(){

    }
    swim(){

    }
    cry(){
        return 'jjzz'
    }
}

function say(duck: Duck){
    console.log(duck.cry())
}

let bird:Bird = new Bird()
say(bird)