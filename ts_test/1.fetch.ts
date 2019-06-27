//javascript
export const fetch1 = function (url, params) {
    // dosomething
    return new Promise((resolve, reject) => {

    })
}


//typescript
interface RES {
    code: number,
    msg: string,
    data?: any
}

export const fetch2 = function (url:string, params?:any): Promise<RES> {
    // dosomething
    return new Promise((resolve, reject) => {

    })
}