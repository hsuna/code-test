import Api from "./Api"
import lrz from "./lrz.all.bundle"
// => files []  => picList []

const domain = {
  TOKEN: "//api.ftegame.com/",
  UPLOAD: "//v0.api.upyun.com/",
  //CDN: "//yxfile.ftegame.com/"
  CDN: "http://yxfile.ftegame.com/"
}

export const uploadSequence = async (pkg = []) => {
  console.log("........", pkg)
  let fileList = [...pkg]
  let picList = []

  if (!fileList.length) {
    console.warn("empty upload sequence")
    return []
  }

  return new Promise((resolve, reject) => {
    const uploader = async file => {
      let token = await Api.require(
        "getAuthorization",
        {
          ct: "upyun", //请求接口的控制器名
          ac: "get_upload_sign", //请求接口的方法名
          is_allow: 1
        },
        {
          domain: domain.TOKEN,
          dataType: "jsonp",
          urlModel: 1
        }
      ).catch(e => {
        console.log(e)
      })
      if (token.code != 0) {
        return alert(res.error)
      }
      console.log(token)

      let res = await Api.require(
        "hwupload",
        {
          ...token.data,
          ...{
            file: file,
            b64encoded: "on"
          }
        },
        {
          domain: domain.UPLOAD,
          dataType: "stream",
          methods: "POST",
          urlModel: 0,
          filter(obj) {
            return obj
          }
        }
      ).catch(e => {
        console.log(e)
      })

      let pic = domain.CDN + res.url
      console.log(pic)
      picList.push(pic)
      if (!fileList.length) {
        resolve(picList)
        return
      }
      uploader(fileList.shift())
    }
    uploader(fileList.shift())
  })
}

const zipImg = file => {
  return new Promise((resolve, reject) => {
    lrz(file, {
      width: 750,
      quality: 0.8
    })
      .then(rst => {
        if (rst.fileLen > 5 * 1024 * 1024) {
          opt.before_errFn({
            title: "请勿上传超过5M图片"
          })
          reject(error)
        }
        return rst
      })
      .then(rst => {
        resolve(rst.file)
      })
  })
}

const getFormData = obj => {
  console.log(obj)
  let data = new FormData()
  Object.keys(obj).forEach(key => {
    data.append(key, obj[key])
  })
  return data
}

const uuid = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
}

export default {
  uploadSequence,
  zipImg,
  getFormData,
  uuid
}
