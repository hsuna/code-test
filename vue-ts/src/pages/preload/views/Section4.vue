<template>
    <div class="section" :class="{ios: is_ios}">
        <div class="content">
            <template v-if="is_ios">
                <p>1.活动时间：4月1日10:00-游戏上线；</p>
                <p>2.活动期间，玩家完成手机认证预约即可获得1次抽奖机会；</p>
                <p>3.获得红包后，24小时内请尽快前往微信领取，逾期失效，不予补发；</p>
                <p>4.如使用外挂丶作弊器以及其他不正当方式参与本活动，官方将有权取消用户参与资格，抽奖资格；</p>
                <p>5.3K游戏保留在法律规定范围内对上述规则进行结束的权利。</p>
            </template>
            <template v-else>
                <p>1.活动时间：4月1日10:00-4月3日23:59；</p>
                <p>2.活动期间，玩家完成手机认证预约即可获得1次抽奖机会；</p>
                <p>3.获得红包后，24小时内请尽快前往微信领取，逾期失效，不予补发；</p>
                <p>4.获得华为Mate20的幸运玩家，活动名单公布的24小时内我们会通过您的预留信息与您取得联系，获取奖品收货地址；</p>
                <p>5.如使用外挂丶作弊器以及其他不正当方式参与本活动，官方将有权取消用户参与资格，抽奖资格；</p>
                <p>6.3K游戏保留在法律规定范围内对上述规则进行结束的权利。</p>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const PreloadStore = namespace('Preload')

@Component
export default class Section4 extends Vue {
    @PreloadStore.State is_ios
}
</script>

<style lang="scss" scoped>
.section{
    width: 7.5rem;
    height:8.35rem;
    background-image: url(~@/assets/prehot/img/img-bg_4-1.jpg);
    background-size: 100%;

    .content{
        line-height: 1.8;
        padding: 1.54rem 1.0rem 0;
        text-align: justify;
        font-size: .24rem;
        color: #1a1a1a;
    }

    &.ios{
        height:6.85rem;
        background-image: url(~@/assets/prehot/img/img-bg_4-2.jpg);
    }
}
</style>
