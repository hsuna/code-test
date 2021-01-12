<template>
    <div class="dialog">
        <div class="dialog-mask" @click="$emit('mask');"></div>
        <div :class="['dialog-wrap', $props.className]"><slot></slot></div>
    </div>
</template>

<script lang="ts">
import { inject } from 'vue';

export default {
    name: 'DialogBase',
    props: {
        className: {
            type: String,
            default: ''
        }
    },
}
</script>

<style lang="less">
.dialog{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    .dialog-mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .dialog-wrap{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>

