<template>
  <span v-html="state.msg"></span>
</template>

<script setup>
import { reactive } from 'vue'
import hljs from './hljs';

const state = reactive({ msg: '' })
state.msg = hljs.highlightAuto(`
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
`).value;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>