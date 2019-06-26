const fs = require('fs')
   
const decrypt = (data) => {
    var S;
    var i = 0;
    var j = 0;
    var k = 0;
    var n = 0;
    var u = 0;
    var v = 0;

    if (data.length > 0)
    {
        S = new ArrayBuffer(),
        n = data.length - 32,
        i;
        while (i < 256)
        {
            
            S.writeByte(i);
            i = (i + 1);
        }
        j;
        i;
        while (i < 256)
        {
            
            j = j + S[i] + data[n + (i & 31)] & 255;
            u = S[i];
            S[i] = S[j];
            S[j] = u;
            i = (i + 1);
        }
        if (n > 131072)
        {
            n;
        }
        var _loc_2 = 0;
        j;
        i = _loc_2;
        k;
        while (k < n)
        {
            
            i = (i + 1) & 255;
            u = S[i];
            j = j + u & 255;
            v = S[j];
            S[i] = v;
            S[j] = u;
            data[k] = data[k] ^ S[u + v & 255];
            k = (k + 1);
        }
    }
    return data
}


fs.readFile('./data/7.bin', function(err, data){
    if (err) throw err;
    console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true

    const dd = decrypt(data)
    console.log(dd)
})
   