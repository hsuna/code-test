<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld @click="onTest" msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    onTest() {
      console.log('-==-=-=1111111')
    }
  }
}
</script>
