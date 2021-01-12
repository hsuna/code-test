<template>
    <div ref="el" class="select-item">
        <label v-html="label"></label>
        <div class="select-control" :class="{active: state.isActive}" @click="state.isActive=!state.isActive">
            {{state.activeItem.text || '請選擇'}}
            <ul>
                <li v-for="(item,index) in $props.list" :key="item.value" @click="$emit('change', index)">{{item.text}}</li>
                <li v-show="$props.list.length<=0" class="empty">暫無角色</li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts">
import { reactive, inject, computed, onMounted, onUnmounted, ref, Ref } from 'vue'

export default {
    name: 'SelectItem',
    props: {
        label: {
            type: String,
            default: 'Label'
        },
        list: {
            type: Array,
            default: () => []
        },
        active: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const el:Ref<HTMLElement|null> = ref(null)
        const state = reactive({
            isActive: false,
            activeItem: computed(() => {
                console.log(props.list, props.active)
                return props.list[props.active] || {}
            })
        })

        const handlerWinClick = (evt) => {
            if((el.value as HTMLElement).contains(evt.target)) return;
            state.isActive = false
        }

        onMounted(() => {
            document.addEventListener('click', handlerWinClick)
        })

        onUnmounted(() => {
            document.removeEventListener('click', handlerWinClick)
        })

        return {
            el,
            state,
        }
    }
}
</script>

<style lang="less" scoped>
.select-item{
    label{
        display: inline-block;
        width: 120px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 34px;
        font-weight: bold;
        color: #5e4d35;
        vertical-align: middle;
    }

    .select-control{
        position: relative;
        display: inline-block;
        width: 242px;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        padding-right: 50px;
        text-align: left;
        background-color: #625037;
        vertical-align: middle;
        color: #fff;
    
        &:after{
            content: '';
            display: block;
            position: absolute;
            top: 1px;
            right: 1px;
            width: 46px;
            height: 46px;          
            background-size: 100%;
            background-image: url(~@/assets/images/img-item_2.jpg);
        }
    
        &.active{
            &:after{
                transform: scaleY(-1);
            }

            ul{
                display: block;
            }
        } 
    
        ul{
            display: none;
            position: absolute;
            top: 48px;
            left: 0;
            right: 0;
            z-index: 9;
            background-color: #251714;
        }
    
        li{
            height: 48px;
            line-height: 46px;
            padding-left: 20px;
            color: #fff;
            cursor: pointer;
    
            &:active{
                background-color: #c45450;
            }
            &.empty{
                color: #c45450;
                &:active{
                    background-color: transparent;
                }
            }
        }
    }
}
</style>
