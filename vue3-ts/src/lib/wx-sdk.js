import Api from "../lib/Api.js";
import wx from 'weixin-js-sdk';
/*
    param {}
     title
     desc
     img
*/
export default function(opt) {

    var appid, nonceStr, signature, timestamp;
    var shareimg, sharelink, desc, uname, title;
    // var geturl = AJAXURL.domain; //'http://ptapi.test.3k.com/';

    Api.require('share', {
            ct:'user',
            ac:'ajax_ticket',
            url:encodeURIComponent(window.location.href)
    },{
        domain: window.pList[ENV],
        dataType: 'jsonp',
        urlModel: 1,
//      debug: false
    }).then(res => {
		console.log('myShare',res)
        var data = res;
        
        if (data.data) {
            appid = data.data.info.app_id;
            nonceStr = data.data.info.noncestr;
            signature = data.data.info.signature;
            timestamp = data.data.info.timestamp;
            sharelink = window.location.href;
            title =opt.title?opt.title:"";
            desc = opt.desc?opt.desc:"";
            shareimg =opt.img?opt.img:"";
            wx.config({
                debug: false,
                appId: appid, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名，见附录1
                jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.error(function(res) {
               // alert(JSON.stringify(res))

                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });

            wx.ready(function() {
                wx.checkJsApi({
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ],
                    success: function(res) {
                       // alert("初始化")
                      // alert(JSON.stringify(res))
                    }
                });

                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: sharelink, // 分享链接from=timeline&isappinstalled=0
                    imgUrl: shareimg, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                      // alert('弹窗成功')
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: sharelink, // 分享链接  from=singleessage&isappinstalled=0
                    imgUrl: shareimg, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                       //alert('弹窗成功')
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        //alert("用户取消分享后执行的回调函数");
                    }
                });

            });
        }
    });



}
