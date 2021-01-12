
import Api from '@/api/index'

///////// 邀请好友模块 ////////

/** 初始化 */
export const init = (params:Record<string, any>) => Api.jsonp('init?ct=invite_activity&ac=init', params)

/** 授权 */
export const auth = (params:Record<string, any>) => Api.jsonp('auth?ct=invite_activity&ac=auth', params)

/** 查询用户 */
export const getUser = (params:Record<string, any>) => Api.jsonp('getUser?ct=invite_activity&ac=get_user', params)

/** 领取奖励 */
export const reward = (params:Record<string, any>) => Api.jsonp('reward?ct=invite_activity&ac=reward', params)

/** 记录下载日志 */
export const recordDownload = (params:Record<string, any>) => Api.jsonp('recordDownload?ct=invite_activity&ac=record_download', params)