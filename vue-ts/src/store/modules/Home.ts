import FN from '@/lib/fn';

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

const ct: string = 'hd_cbzj';

export interface IHomeState{
    isLockPage:boolean
    isShowMask:boolean

    // 弹窗数据
    dialogPreCheck:any
    dialogPreNumber:any
    dialogPreJump:any
    dialogPreRedbag:any
    dialogPreSuccee:any
    dialogPreShare:any
    dialogImgPreview:any

    // 手机验证码冷却时间戳
    coleTimestamp:number

    is_book:number // 是否预约
    is_ios:number // 预约时是否为ios
    // is_ios_book:number = FN.isIOS?1:0, // 预约时是否是IOS预约
    book_number:string  // 预约编号
    book_user_num:number // 预约人数
    unlock_iphone_num:number // 解锁iphone数量
    is_recv:number // 是否领取预约奖品
    p_name:string  // 奖品名称
    p_img:string  // 奖品图片
    p_type:number // 奖品类型，2是礼包码，3是k钻，7是红包
    code:string  // 奖品是礼包码时，礼包码
    kz_num:string  // 奖品是k钻时，k钻数量
    red_num:string  // 奖品是红包时，红包数量
    card_num:string 
    card_pwd:string
}

@Module({ name: 'Home', namespaced: true }) 
export default class Home extends VuexModule implements IHomeState{

     //////////////////////////////////////////
    //////////  ///// state   ////// //////////
    //////////////////////////////////////////
    isLockPage:boolean = false
    isShowMask:boolean = false

    // 弹窗数据
    dialogPreCheck:any = null
    dialogPreNumber:any = null
    dialogPreJump:any = null
    dialogPreRedbag:any = null
    dialogPreSuccee:any = null
    dialogPreShare:any = null
    dialogImgPreview:any = null

    // 手机验证码冷却时间戳
    coleTimestamp:number = 0

    is_book:number = 0 // 是否预约
    is_ios:number = 0 // 预约时是否为ios
    // is_ios_book:number = FN.isIOS?1:0, // 预约时是否是IOS预约
    book_number:string = '' // 预约编号
    book_user_num:number = 0 // 预约人数
    unlock_iphone_num:number = 1 // 解锁iphone数量
    is_recv:number = 0 // 是否领取预约奖品
    p_name:string = '' // 奖品名称
    p_img:string = '' // 奖品图片
    p_type:number = 0 // 奖品类型，2是礼包码，3是k钻，7是红包
    code:string = '' // 奖品是礼包码时，礼包码
    kz_num:string = '' // 奖品是k钻时，k钻数量
    red_num:string = '' // 奖品是红包时，红包数量
    card_num:string = ''
    card_pwd:string = ''

    //////////////////////////////////////////
    /////////////// mutation  ////////////////
    //////////////////////////////////////////
    @Mutation
    TOGGLE_PAGE_LOCKED(type: boolean) {
        this.isLockPage = type;
    }
    @Mutation
    closeDialog(type: string) {
        this[`dialog${type}`] = null
        this.isShowMask = false
    }
    @Mutation
    openDialog(payload: string|any) {
        if('string' === typeof payload) payload = { type:payload }
        const { type, data= {} }:any = payload;
        this[`dialog${type}`] = data;
        this.isShowMask = true;
    }
    @Mutation
    init(data:any) {
        Object.assign(this, data/* , {
            // 已预约的用户，页面跟随服务器的预约设备类型；否则跟随用户设备类型
            is_ios_book: 1 == data.is_book ? data.is_ios_book : ( FN.isIOS ? 1 : 0 )
        } */)
    }
    @Mutation
    setColeTimestamp(value:number) {
        this.coleTimestamp = value
    }

    //////////////////////////////////////////
    //////////////// action  /////////////////
    //////////////////////////////////////////
    /** 预约初始化 */
    @Action
    async INIT():Promise<{}> {
        return FN.ajax('INIT', {
            ct,
            ac: 'bookInit',
        });
    }

    /**
     * 预约发送手机验证码
     * @params payload
     * @param {String} phone 手机号码
     */
    @Action
    async GET_SEND_VERIFY_CODE({ state }:any, payload:any):Promise<string|void> {
        const res = await FN.ajax('SEND_VERIFY_CODE', {
            ct,
            ac: 'sendVerifyCode',
            ...payload
        });
        if (0 == res.code) {
        }else if(200021 == res.code){
            return '手机号码已预约，请更换手机号码参与活动~'
        }else if(200181 == res.code){
            return '手机号码有误，请重新填写~'
        }else{
            return res.error
        }
    }

    /**
     * 预约提交预约
     * @params payload
     * @param {String} phone 手机号码
     * @param {String} code 验证码
     */
    @Action
    async GET_SUBMIT_BOOK({ state }:any, payload:any):Promise<string|void> {
        const res = await FN.ajax('SUBMIT_BOOK', {
            ct,
            ac: 'submitBook',
            ...payload
        });
        if (0 == res.code) {
            state.is_book = 1
            state.book_number = res.data.book_number
        }else if(200021 == res.code){
            return '手机号码已预约，请更换手机号码参与活动~'
        }else if(200188 == res.code){
            return '验证码错误，请重新输入，验证码5分钟内有效~'
        }else {
            return res.error
        }
    }

    /**
     * 预约领取奖励
     * @params payload 
     */
    @Action
    async GET_BOOK_PRIZE_RECV({ state }:any, payload:any):Promise<string|void> {
        const res = await FN.ajax('BOOK_PRIZE_RECV', {
            ct,
            ac: 'recvBookRedpkt',
            ...payload
        });
        if (0 == res.code) {
            state.is_recv = 1
            state.p_img = res.data.p_img
            state.p_name = res.data.p_name
            state.p_type = res.data.p_type
            state.code = res.data.code
            state.kz_num = res.data.kz_num
            state.red_num = res.data.red_num
            state.card_num = res.data.card_num
            state.card_pwd = res.data.card_pwd
            state.win_time = res.data.win_time
        }else {
            return res.error
        }
    }
}