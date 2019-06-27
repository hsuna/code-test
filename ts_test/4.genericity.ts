//typescript
interface RES {
    code: number,
    msg: string,
    data?: any
}
interface RES2 {
    code: number,
    error: string,
    data?: any
}
interface RES3 {
    code: number,
    message: string,
    data?: any
}

export const fetch2 = function<T> (url:string, params?:any): Promise<T|Error> {
    // dosomething
    return new Promise((resolve, reject) => {

    })
}

fetch2<RES>('url', {}).then((res:RES) => {
    if(res.code){
        console.log(res.data)
    }else{
        console.log(res.msg)
    }
})

fetch2<RES2>('url', {}).then((res:RES2) => {
    if(res.code){
        console.log(res.data)
    }else{
        console.log(res.error)
    }
})