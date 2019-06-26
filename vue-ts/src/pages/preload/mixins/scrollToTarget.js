/* 竟然不识别Symbol，我也是醉了 */
const timeScroll = 'Symbol_scrollToTarget_timeScroll'
const clearTimer = 'Symbol_scrollToTarget_clearTimer'
const handlerTouchMove = 'Symbol_scrollToTarget_handlerTouchMove'

export default {
    data(){
        return{
            [timeScroll]: null,
        }
    },
    created(){
        document.addEventListener('touchmove', this[handlerTouchMove])
    },
    destroyed(){
        document.removeEventListener('touchmove', this[handlerTouchMove])
        this[clearTimer]()
    },
    methods:{
        [clearTimer](){
            if(this[timeScroll]){
                clearInterval(this[timeScroll])
                this[timeScroll] = null
            }
        },
        [handlerTouchMove](){
            this[clearTimer]()
        },
        scrollToTarget(id){
            this[clearTimer]()
            
            const target = document.getElementById(id)
            const scrollTop = target.offsetTop
            this[timeScroll] = setInterval(() => {
                const curScrollTop = document.body.scrollTop || document.documentElement.scrollTop
                if(Math.abs(scrollTop-curScrollTop) < 20){
                    this[clearTimer]()
                    document.body.scrollTop = document.documentElement.scrollTop = scrollTop
                }else{
                    document.body.scrollTop = document.documentElement.scrollTop = Math.max(20, (scrollTop-curScrollTop)*0.2) + curScrollTop
                }
            }, 50)
        },
    },
}