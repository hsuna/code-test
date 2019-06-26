var ts2;
(function (ts2) {
    var Colors;
    (function (Colors) {
        Colors[Colors["REB"] = 0] = "REB";
        Colors[Colors["GREEN"] = 1] = "GREEN";
        Colors[Colors["BLUE"] = 2] = "BLUE";
    })(Colors || (Colors = {}));
    ;
    console.log(Colors["REB"]); //0
    console.log(Colors["GREEN"]); //1
    console.log(Colors["BLUE"]); //2
    console.log(Colors[0]); //REB
    console.log(Colors[1]); //GREEN
    console.log(Colors[2]); //BLUE
    var Days;
    (function (Days) {
        Days[Days["Sun"] = 2] = "Sun";
        Days[Days["Mon"] = -1] = "Mon";
        Days[Days["Tue"] = 0] = "Tue";
        Days[Days["Wed"] = 1] = "Wed";
        Days[Days["Thu"] = 2] = "Thu";
        Days[Days["Fri"] = 3] = "Fri";
        Days[Days["Sat"] = 4] = "Sat";
    })(Days || (Days = {}));
    ;
    console.log(Days["Sun"]); //2
    console.log(Days["Mon"]); //-1
    console.log(Days["Tue"]); //0
    console.log(Days["Wed"]); //1
    console.log(Days["Thu"]); //2
    console.log(Days["Fri"]); //3
    console.log(Days["Sat"]); //4
})(ts2 || (ts2 = {}));
