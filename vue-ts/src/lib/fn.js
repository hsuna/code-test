import md5 from 'md5'
import Api from './Api'
import './liveUrl';
import prload from './prload';

const userAgent = navigator.userAgent.toLowerCase()

const isMobile = /mobile/i.test(userAgent)

const isAndroid = /android/i.test(userAgent)

const isIOS = /iphone|ipad|ipod/i.test(userAgent)

const systemVersion = isMobile && parseInt(navigator.userAgent.toLowerCase().match(/(os|android).(\d+)/g)[0].slice(-1))

const isLowAndroid = isAndroid ? systemVersion < 5 : false

const isLowIOS = isIOS ? (systemVersion > 4 && systemVersion < 9) : false

const isiOS12 = isIOS?(systemVersion==12):false

const isWX = /micromessenger/i.test(userAgent)

const sleep = (time = 1000) => new Promise(resolve => setTimeout(resolve, time))

const getLocal = key => JSON.parse(localStorage.getItem(key) || '{}')
const saveLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const removeLocal = key => localStorage.removeItem(key)

const getSession = key => JSON.parse(sessionStorage.getItem(key) || '{}')
const saveSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value))
const removeSession = key => sessionStorage.removeItem(key)

let params = window.GD.URLparams;

if (params.setENV) window.domain = '//' + vipList[params.setENV] + '/main3.0.php'
Api.config({
	methods: 'GET', // GET POST ...
	dataType: window.useMock?'json':'jsonp',
	domain: domain,
	// useMock: Number(params.useMock) || false,
	// useMock: true,
	urlModel: window.useMock?0:1,
	// debug: true, //Boolean(Number(params.debug)) || false,
	filter(obj) {
		
	    // 如果签名已存在将跳过，不会重新生成（活动接口会使用activityParams生成）
	    if (obj.signature) return obj
	    const deal = obj => {     
			let signature = ''
		
	        Object.keys(obj)
	            .sort()
	            .forEach(key => (signature += '&' + key + '=' + obj[key]));
	        signature = signature.replace('&', '');
			signature += '3kwan_wechat_!@#$%^&*';
	        return {
	            ...obj,
	            ...{ _: new Date().getTime() },
	            signature: md5(signature).toLocaleUpperCase()
	        }
		}
	    return deal({
			...obj,
			...fromGame,
	    })
	}
})

const getGameId=e=>{

}

let fromGame = { //公共参数
	// 'param': 'test',
	'from_id': params.from_id || '0', //来源渠道id
	'from_type': params.from_type || '0', //标识社区或者公众号或其他来源
	'game_id': params.game_id || '0',
	'shequ_id':params.shequ_id||'0',
	'is_share': params.is_share || '0',
	// 'param': params.hd || 'test',
	'pf': isAndroid ? 1 : (isIOS ? 2 : 3), //1/2/3 =>安卓/ios/其他
	'origin_type': 1
	//	'type': !isMobile ? 1 : (isWX ? 2 : 3) //1PC2微信3移动端
}

let fixIosTime = (time) => {
	if (fromGame.pf == "2" && typeof time != "number") {
		return time.replace(/-/g, function ($0) {
			return $0 = "/";
		})
	} else {
		return time;
	}
}

let scrollTop
const addFixed = () => { // 添加防穿透
	scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	document.body.style.position = "fixed";
	document.body.style.top = -scrollTop + 'px';
}

const removeFixed = () => { // 删除防穿透
	document.body.style.position = "static";
	document.body.style.top = '0px'
	window.scrollTo(0, scrollTop)
}


const ajax = (name,param,...arg) => { //接口请求
	if(window.isFormal){
		param.is_formal=1
	}
	return new Promise((resolve, reject) => {
		Api.require(name,param,...arg).then(res => {
			if(res.code===400){
				if(process.env && process.env.NODE_ENV == 'production'){
					window.go2login();
				}
			}
			resolve(res)
		}).catch(e => {
			resolve({code:500,error:"系统繁忙，稍后重试"})
		})
	})
}

const getUrl = param => {
	const input = {
		...param,
		...fromGame
	}
	return domain + '?' + Object.keys(input).map(k => `${k}=${input[k]}`).join('&')
}

const log = (event_id, param, others = {}, href = location.href) => {
	return ajax(
		'LOG',
		{
			ct: 'hd_logapi',
			ac: 'page',
			param,
			event_id,
			shequ_id: window.GD.URLparams.shequ_id || 0,
			url: encodeURI(href),
			...others
		}
	);
}

const updateSearch=(key,value)=>{
	const rxp = new RegExp(`([&\\?])${key}=([^&]+)`,'ig');
	let search = location.search;
	if(!search){
		search=`?${key}=${value}`;
	}
	if(!rxp.test(search)){
		search+=`&${key}=${value}`;
	}else{
		search = search.replace(rxp,`$1${key}=${value}`)
	}

	history.replaceState(
		{},
		'',
		location.origin + location.pathname + search
	);
}

const getUserName=()=>{
	let res = document.cookie.match(/ptnickname=([^;]+)/);
	if(res&&res[1]){
		return decodeURIComponent(res[1])
	}
	return ''
}

window.routeTab = '';
export default {
	addFixed,
	removeFixed,
	params,
	ajax,
	log,
	isAndroid,
	isIOS,
	isLowAndroid,
	isLowIOS,
	isiOS12,
	isWX,
	sleep,
	getUrl,
	getLocal,
	saveLocal,
	removeLocal,
	getSession,
	saveSession,
	removeSession,
	fromGame,
	fixIosTime,
	md5,
	updateSearch,
	getUserName,
	prload,
}