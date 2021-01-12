<template>
  <h1>{{ msg }}</h1>
  <button @click="$emit('click')">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    debugger
    this.$on('click', () => {
      console.log('-=-=-=-==-222222222')
    })
  }
}
</script>
