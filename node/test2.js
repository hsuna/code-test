process.env['http_proxy'] = 'http://127.0.0.1:6666';
process.env['https_proxy'] = 'http://127.0.0.1:6666';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var http = require("http");
var request = require('request');

 request('http://www.baidu.com', function(error,response,body){
    if(!error && response.statusCode == 200){
        //输出返回的内容
        console.log(body);
    }
}); 

/* http.get('http://www.baidu.com', function(res){
    if(res.statusCode == 200){
        //输出返回的内容
        console.log(res);
    }
}) */