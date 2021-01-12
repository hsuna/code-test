import Api from '../lib/Api'

//获取初始化数据接口
Api.define("init", {
  input: {
    'ct': 'invite_activity',
    'ac': 'init'
  },
  mock: {
    'code': 0, //错误码
    'msg': '', //错误信息
    'data': {
      "activity_id":1,
      "activity_desc":"玩家拉好友活动说明",
      "facebook_url":"https://www.facebook.com/WuXiaGame/",
      "download_url":"http://bit.ly/32atnVK",
    }
  }
})

//获取授权数据接口
Api.define("auth", {
  input: {
    'ct': 'invite_activity',
    'ac': 'auth'
  },
  mock: {
    'code': 0, //错误码
    'msg': '', //错误信息
    'data': {
      "user_info": [
        {
          "server_id": "10000",
          "server_name": "两仪末那",
          "role": [
            {
              "role_id": 10000,
              "role_name": "aaaaa"
            },
            {
              "role_id": 10001,
              "role_name": "bbbbbbb"
            }
          ]
        },
        {
          "server_id": "10001",
          "server_name": "走向复兴",
          "role": [
            {
              "role_id": 10011,
              "role_name": "角色名1"
            },
            {
              "role_id": 10012,
              "role_name": "角色名2"
            }
          ]
        }
      ]
    }
  }
})

Api.define("getUser", {
  input: {
    'ct': 'invite_activity',
    'ac': 'get_user',
  },
  mock: {
    'code': 0, //错误码
    'msg': '', //错误信息
    'data': {
      "invite_num": 2,
      "login_continuous_day": 3,
      "invite": [
        {
          "product_id": "11",
          "sign": 1,
          "status": 1
        },
        {
          "product_id": "22",
          "sign": 1,
          "status": 0
        }
      ],
      "friendLoginContinuous": {
        "3": {
          "friend_num": 10,
          "items": [
            {
              "product_id": "11",
              "product_day": "3",
              "sign": 1,
              "status": 1
            }
          ]
        },
        "7": {
          "friend_num": 5,
          "items": [
            {
              "product_id": "22",
              "product_day": "7",
              "sign": 1,
              "status": 0
            }
          ]
        }
      },
      "bind": [
        {
          "product_id": "11",
          "sign": 1,
          "status": 1
        },
        {
          "product_id": "22",
          "sign": 1,
          "status": 0
        }
      ],
      "loginContinuous": {
        "3": [
          {
            "product_id": "11",
            "product_day": "3",
            "sign": 1,
            "status": 1
          }
        ],
        "7": [
          {
            "product_id": "22",
            "product_day": "7",
            "sign": 0,
            "status": 0
          }
        ]
      }
    }
  }
})

Api.define("reward", {
  input: {
    'ct': 'invite_activity',
    'ac': 'reward',
  },
  mock: {
    'code': 0, //错误码
    'msg': '', //错误信息
    'data': {}
  }
})

Api.define("recordDownload", {
  input: {
    'ct': 'invite_activity',
    'ac': 'record_download',
  },
  mock: {
    'code': 0, //错误码
    'msg': '', //错误信息
    'data': {}
  }
})

export default {}