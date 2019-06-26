const request = require('request');
const cheerio = require('cheerio')

const urls = [
    'http://www.baidu.com',
    'https://www.zhihu.com',
    test2('https://www.runoob.com/')
]

const itest = test(urls)

function* test(urls){
    for(let i=0; i<urls.length; i++){
        const url = urls[i]
        if(typeof url === 'string') yield test2(url)
        else if(typeof url === 'function') yield url
    }
}

function test2(url){
    return new Promise((resolve, reject) => {
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){
                //输出返回的内容
                const $ = cheerio.load(body, { decodeEntities: false })
                const title = $('title').html()
                console.log(title)
                resolve(title)
            }
        }); 
    })
}
