let requestKey:string = ""
let returnKey:string = ""

export type EncryptDataType = {
  base64_encode: string,
  e: string,
}

export type DecryptDataType = {
  base64_encode: string,
  d: string,
}

export function returnEncrypt(data:string, key = ""):EncryptDataType | void {
  returnKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(returnKey)) return
  let base_e_str:string = Buffer.from(data).toString('base64')
  let t:string = base_e_str + returnKey
  let len:number = t.length
  let per:number = Math.floor(len / 4)

  if (per < 2) {
    return {
      base64_encode: base_e_str,
      e: t
    }
  }
  let i:number = 0
  let t_len:number = len
  let arr_per:Array<string> = []
  let arr_last:Array<string> = []
  let t_start:number = 0

  while(true){
    if(t_len/per>1){
      arr_per.push(t.substr(t_start, per))
    }else{
      arr_last.push(t.substr(t_start))
      break;
    }
    t_start += per;
    t_len = t_len - per;
    i++;
  }
  return {
    base64_encode: base_e_str,
    e: arr_last.join("") + arr_per.join("")
  } 
}

export function requestEncrypt(data, key = ""):EncryptDataType | void {
  requestKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(requestKey)) return
  let base_e_str:string = Buffer.from(data).toString('base64')
  let t:string = base_e_str + requestKey
  let len:number = t.length
  let per:number = Math.floor(len / 6)
  let per_0:number = per - 1
  let i:number = 0
  let t_len:number = len
  let arr_per:Array<string> = []
  let arr_per_0:Array<string> = []
  let arr_last:Array<string> = []
  let t_start:number = 0

  if (per < 2) {
    return {
      base64_encode: base_e_str,
      e: encodeURIComponent(t)
    }
  }

  while (true) {
    if (i % 2 === 0) {
      if (t_len / per_0 > 1) {
        arr_per_0.push(t.substr(t_start, per_0))
      } else {
        arr_last.push(t.substr(t_start))
        break
      }
      t_start += per_0
      t_len = t_len - per_0
    } else {
      if (t_len / per > 1) {
        arr_per.push(t.substr(t_start, per))
      } else {
        arr_last.push(t.substr(t_start))
        break
      }
      t_start += per
      t_len = t_len - per
    }
    i++
  }
  return {
    base64_encode: base_e_str,
    e: encodeURIComponent(arr_last.join("") + arr_per.join("") + arr_per_0.join(""))
  }
}

export function returnDecrypt(data:string, key:string = ""):DecryptDataType | void {
  returnKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(returnKey)) return
  let t:string = decodeURIComponent(data)
  let len:number = t.length
  let per:number = Math.floor(len / 4)
  let len_key:number
  let base64_estr:string
  if (per < 2) {
    len_key = returnKey.length
    base64_estr = t.substr(0, len - len_key)
    return {
      base64_encode: base64_estr,
      d: Buffer.from(base64_estr, 'base64').toString()
    }
  }
  let i:number = 0
  let t_len:number = len
  let arr_per_num:Array<number> = []
  while (true) {
    if (t_len / per > 1) {
      arr_per_num.push(per)
    } else {
      break
    }
    t_len = t_len - per
    i++
  }
  let arr_per:Array<string> = []
  let t_start:number = 0
  let t_count:number = arr_per_num.length
  arr_per_num.forEach((v, i) => {
    t_start -= per
    arr_per[t_count - 1 - i] = t.substr(t_start, per)
  })

  let last_str:string = t.substr(0, len + t_start)
  i = 0
  let max:number = arr_per.length
  let str:string = ""
  for (i = 0; i < max; i++) {
    if (arr_per[i]) {
      str += arr_per[i]
    }
  }
  str += last_str
  len_key = returnKey.length
  str = str.substr(0, len - len_key)
  return {
    base64_encode: str,
    d: Buffer.from(str, 'base64').toString()
  }
}

export function requestDecrypt(data:string, key:string = ""):DecryptDataType | void {
  requestKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(requestKey)) return
  let t:string = decodeURIComponent(data)
  let len:number = t.length
  let per:number = Math.floor(len / 6)
  let per_0:number = per - 1
  let i:number = 0
  let t_len:number = len
  let arr_per_0_num:Array<number> = []
  let arr_per_num:Array<number> = []
  let len_key:number
  let base64_estr:string
  if (per < 2) {
    len_key = requestKey.length
    base64_estr = t.substr(0, len - len_key)
    return {
      base64_encode: base64_estr,
      d: Buffer.from(base64_estr, 'base64').toString()
    }
  }
  while (true) {
    if (i % 2 === 0) {
      if (t_len / per_0 > 1) {
        arr_per_0_num.push(per_0)
      } else {
        break
      }
      t_len = t_len - per_0
    } else {
      if (t_len / per > 1) {
        arr_per_num.push(per)
      } else {
        break
      }
      t_len = t_len - per
    }
    i++
  }

  let arr_per_0:Array<string> = []
  let arr_per:Array<string> = []
  let t_start:number = 0

  let t_count:number = arr_per_0_num.length

  arr_per_0_num.forEach((v, i) => {
    t_start -= per_0
    arr_per_0[t_count - 1 - i] = t.substr(t_start, per_0)
  })

  t_count = arr_per_num.length
  arr_per_num.forEach((v, i) => {
    t_start -= per
    arr_per[t_count - 1 - i] = t.substr(t_start, per)
  })

  let last_str:string = t.substr(0, len + t_start)

  i = 0
  let max:number = Math.max(arr_per_0.length, arr_per.length)
  let str:string = ""
  for (i = 0; i < max; i++) {
    if (arr_per_0[i]) {
      str += arr_per_0[i]
    }

    if (arr_per[i]) {
      str += arr_per[i]
    }
  }

  str += last_str
  len_key = requestKey.length
  str = str.substr(0, len - len_key)
  return {
    base64_encode: str,
    d: Buffer.from(str, 'base64').toString()
  }
}
