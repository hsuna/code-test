namespace ts2{

   


    enum Colors {REB, GREEN, BLUE};
    console.log(Colors["REB"]);     //0
    console.log(Colors["GREEN"]);   //1
    console.log(Colors["BLUE"]);    //2
    console.log(Colors[0]);         //REB
    console.log(Colors[1]);         //GREEN
    console.log(Colors[2]);         //BLUE

    
    enum Days {Sun = 2, Mon = -1, Tue, Wed, Thu, Fri, Sat};
    console.log(Days["Sun"]);   //2
    console.log(Days["Mon"]);   //-1
    console.log(Days["Tue"]);   //0
    console.log(Days["Wed"]);   //1
    console.log(Days["Thu"]);   //2
    console.log(Days["Fri"]);   //3
    console.log(Days["Sat"]);   //4
    
}