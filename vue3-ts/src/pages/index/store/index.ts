/*
 * @Description: 状态管理器
 * @Author: Hsuna
 */

import { reactive, computed } from "vue";

import { RES } from '@/api';
import * as Url from "@/api/url";
import {
  getToken,
  setToken,
  removeToken,
  getUserData,
  removeUserData
} from "@/api/token";
import { returnDecrypt, DecryptDataType } from "@/lib/fuse.auth";
import { search } from "@/lib/query";

const sdk_ext = (function() {
  let query;
  try {
    const p = search("p"),
      ts = search("ts");
    query = p ? JSON.parse((returnDecrypt(p, String(ts)) as DecryptDataType).d) : {};
  } catch (e) {
    console.error("query参数错误，请检查", window.location.search);
  }
  console.log("query->", query);
  return query;
})();

export type DialogState = {
  visible: boolean;
  [propName: string]: any;
};

/** 类型-邀请人分享数据 */
export type ShareState = {
  share: string; // 邀请人token
  server_id: string; // 邀请人服务器id
  server_name: string; // 邀请人服务器名
  role_id: string; // 邀请人角色id
  role_name: string; // 邀请人角色名
};

export interface IStoreState {
  // tab切換狀態
  tabActive: number;
  /////////弹窗状态/////////
  dialogLogin: DialogState;
  dialogReceive: DialogState;
  dialogRule: DialogState;

  //////////查询参数////////
  token: string; // 用户token
  inviter: ShareState; //邀请人分享数据
  share: ShareState; // 分享数据

  //////////后台数据/////////
  activity_id: string; // 活动ID
  activity_desc: string; // 活动说明
  facebook_url: string; // Facebook粉丝页地址
  download_url: string; // 下载链接

  user_info: Array<any>; // 用户信息
  server_id: string; // 服务器id
  server_name: string; // 服务器名
  role_id: string; // 角色id
  role_name: string; // 角色名
  user_type: number; // 用戶類型 1：老玩家  2：新玩家

  invite_num: number; // 邀请好友下载数量
  invite: Array<any>; // 邀请好友下载奖励
  friendLoginContinuous: {
    friend_num?:number, 
    items?:Array<any>,
  }; // 邀请好友连续登录奖励
  bind: Array<any>; // 在游戏内绑定Facebook账号奖励
  login_continuous_day: number; // 新玩连续登录天数
  loginContinuous: any; // 新玩连续登录奖励

  ///////////滲透參數//////////
  sdk_ext: any;
  user_id: string;
  /////////活动参数-固定（优先用渗透值）//////
  game_id: string | number;
  package_id: string | number;
}

export class Store {
  state:IStoreState = reactive({
    // tab切換狀態
    tabActive: 0,
    dialogLogin: {
      visible: false,
      server: [],
      close: false
    },
    dialogReceive: {
      visible: false,
      text: ""
    },
    dialogRule: {
      visible: false,
      content: ""
    },

    //////////查询参数////////
    token: getToken() || "", // 用户token
    inviter: {
      share: "", // 邀请人token
      server_id: "", // 邀请人服务器id
      server_name: "", // 邀请人服务器名
      role_id: "", // 邀请人角色id
      role_name: "" // 邀请人角色名
    }, //邀请人分享数据
    share: computed(() => ({
      share: this.state.token,
      server_id: this.state.server_id,
      server_name: this.state.server_name,
      role_id: this.state.role_id,
      role_name: this.state.role_name
    })),

    //////////后台数据/////////
    activity_id:  "", // 活动ID
    activity_desc:  "", // 活动说明
    facebook_url:  "", // Facebook粉丝页地址
    download_url:  "", // 下载链接

    user_info: [], // 用户信息
    server_id:  "", // 服务器id
    server_name:  "", // 服务器名
    role_id:  "", // 角色id
    role_name:  "", // 角色名
    user_type: 0, // 用戶類型 1：老玩家  2：新玩家

    invite_num: 0, // 邀请好友下载数量
    invite: [], // 邀请好友下载奖励
    friendLoginContinuous: {}, // 邀请好友连续登录奖励
    bind: [], // 在游戏内绑定Facebook账号奖励
    login_continuous_day: 0, // 新玩连续登录天数
    loginContinuous: {}, // 新玩连续登录奖励

    ///////////滲透參數//////////
    sdk_ext: sdk_ext,
    user_id: sdk_ext.user_id,
    /////////活动参数-固定（优先用渗透值）//////
    game_id: sdk_ext.game_id || 8,
    package_id: sdk_ext.package_id || 13,
  }) as IStoreState

  //////////// getters ///////////



  //////////// mutations ///////////
  //設置tab切換狀態
  setTabActive(data = 0) {
    this.state.tabActive = data;
  }
  //清除授权数据
  private clearUserData() {
    removeToken();
    removeUserData();
    this.state.token = "";
    this.state.server_id = "";
    this.state.server_name = "";
    this.state.role_id = "";
    this.state.role_name = "";
    this.state.user_type = 0;
  }
  //设置邀请人数据
  setInviterData(data: any = {}) {
    Object.assign(this.state.inviter, data);
  }
  //设置初始化数据
  private setInitData(data: any = {}) {
    this.state.activity_id = data.activity_id;
    this.state.activity_desc = data.activity_desc || "";
    this.state.facebook_url = data.facebook_url || "";
    this.state.download_url = data.download_url || "";
  }
  //设置用户数据
  private setUserData(data: any = {}) {
    this.state.user_info = data.user_info || []; // 用户信息列表
    if (data.token) {
      // 授权信息
      this.state.token = data.token || "";
      setToken(this.state.token);
    }
  }
  //设置角色数据
  private setRoleData(data: any = {}) {
    this.state.server_id = data.server_id;
    this.state.server_name = data.server_name || "";
    this.state.role_id = data.role_id;
    this.state.role_name = data.role_name || "";
    this.state.user_type = Number(data.user_type) || 1;
    this.state.tabActive = 2 == this.state.user_type ? 1 : 0;
    this.setUserData(data);
  }
  //设置奖励数据
  private setRewardData(data: any = {}) {
    this.state.invite_num = data.invite_num || 0;
    this.state.invite = data.invite || [];
    this.state.friendLoginContinuous = data.friendLoginContinuous || {};
    this.state.bind = data.bind || [];
    this.state.login_continuous_day = data.login_continuous_day || 0;
    this.state.loginContinuous = data.loginContinuous || {};
  }
  //打开弹窗
  openDialog(data: any = {}) {
    this.state[data.dialog] = {
      visible: true,
      ...data.data
    };
  }

  //////////// actions ///////////
  async init(payload: any = {}): Promise<RES<any>> {
    let res: RES<any> = await Url.init({
      game_id: this.state.game_id,
      package_id: this.state.package_id
    });

    if (0 == res.code) {
      this.setInitData(res.data);
    } else if (res.msg) {
      // this._vm.$toast(res.msg)
    }
    return res;
  }
  async auth(payload: any = {}): Promise<RES<any>> {
    let res: RES<any> = await Url.auth({
        activity_id: this.state.activity_id,
        token: this.state.token,
        link: `${window.location.origin + window.location.pathname.replace(/\/([^/]*.html)?$/, "")}/auth.html?orgin=${encodeURIComponent(window.location.href)}`
    })
    if (0 == res.code) {
      this.setUserData(res.data);
      if (this.state.user_info.length > 0) {
        if (payload.dialogLogin) {
          this.openDialog({
            dialog: "dialogLogin",
            data: {
              server: this.state.user_info,
              close: true
            }
          })
        } else {
          const userData = getUserData(); //獲取緩存用戶數據
          if (userData.role_id) {
            try {
              await this.getUser(userData);
            } catch (err) {
              removeUserData(); //刪除緩存用戶數據
            }
          }
        }
      }
    }else if (res.data && res.data.url) {
      this.clearUserData(); //清除授权数据
      if (!payload.noJump) {
        window.location.href = res.data.url;
      }
    } else if (res.msg) {
      //this._vm.$toast(res.msg)
    }
    return res
  }
  async getUser(payload: any = {}): Promise<RES<any>> {
    let res: RES<any> = await Url.getUser({
      activity_id: this.state.activity_id,
      token: this.state.token,
      server_id: payload.server_id,
      role_id: payload.role_id
    })
    if (0 == res.code) {
      this.setRoleData(payload);
      this.setRewardData(res.data);
    } else if (res.msg) {
      //this._vm.$toast(res.msg)
    }
    return res
  }
  async reward(payload: any = {}): Promise<RES<any>> {
    let res: RES<any> = await Url.reward({
      activity_id: this.state.activity_id,
      token: this.state.token,
      server_id: this.state.server_id,
      role_id: this.state.role_id,
      ...payload
    })
    this.openDialog({
      dialog: "dialogReceive",
      data: { text: 
        0 == res.code
        ? "領取成功，請到遊戲內確認。" 
        : "領取失敗，請稍後重試。"
      }
    })
    return res
  }
  async recordDownload(payload: any = {}): Promise<RES<any>> {
    return await Url.recordDownload({
      activity_id: this.state.activity_id,
      token: this.state.token,
      download_url: this.state.download_url,
      ...this.state.inviter
    })
  }
}

export default new Store();