import { API_URL } from '@/config/api';
import Api from '@/lib/Api';

import mock from './mock';

import { query, search } from '@/lib/query';
import { requestEncrypt, returnDecrypt, DecryptDataType, EncryptDataType } from "@/lib/fuse.auth";

console.log(`API_URL->${API_URL}`);

Api.config({
  dataType: 'jsonp',
  domain: API_URL,
  urlModel: 1,
  useMock: typeof mock !== 'undefined'
});

const jsonp = (url:string, p:Record<string, any>, pk:Record<string, any>={}, cfg:Record<string, any>={}):Promise<RES<RES_ENCRYPT_DATA>> => {
  let ns = url.split('?')[0];
  let data = query(url);
  let key = String(new Date().getTime()).substr(0, 10);
  let req = {
    ...data,
    ...pk,
    p: (requestEncrypt(JSON.stringify(p), key) as EncryptDataType).e,
    ts: key,
    is_js_api: 1
  };
  return new Promise((resolve, reject) => {
    Api.require(ns, req, cfg).then((res:RES<RES_ENCRYPT_DATA>) => {
        if (res.data && res.data.d) {
          res.data = JSON.parse((returnDecrypt(res.data.d, String(res.data.ts)) as DecryptDataType).d)
        }
        console.log(ns, p, req, res);
        resolve(res)
      })
      .catch(e => {
        console.log("Api.jsonp error:", e)
      })
  })
}

export type RES_ENCRYPT_DATA = {
  d: string,
  ts: string|number
}

export type RES<T> = {
  code: number;
  msg: string;
  data: T;
};

export default {
  query,
  search,
  jsonp
};
