<template>
  <div>
		<!--banner-->
		<banner/>
		<!-- 预约抽红包 -->
		<section-1 class="section-1"/>
		<!-- 预约赢手机 -->
		<section-2 class="section-2" v-if="!is_ios"/>
		<!-- 新游抢先看 -->
		<section-3 class="section-3" />
		<!-- 活动规则 -->
		<section-4 class="section-4" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

import Banner from "./Banner.vue"
import Section1 from "./Section1.vue"
import Section2 from "./Section2.vue"
import Section3 from "./Section3.vue"
import Section4 from "./Section4.vue"

const PreloadStore = namespace('Preload')

@Component({
  components: { 
    Banner,
    Section1,
    Section2,
    Section3,
    Section4
  },
})
export default class Prehot extends Vue {
	@State state
	@PreloadStore.State is_ios
	
	created() {
		console.log(this.is_ios)
	}
}
</script>

<style lang="scss">
body{
	overflow-y: auto;
	background-color: #1c153f;
}

#prehot {
	/* width: 7.50rem;
	height: 47.25rem;
	background-image: url('~@/assets/prehot/img/img-test.jpg'); */
	background-size: cover;
	background-color: #2c3343;
}

.btn{
	display: inline-block;
	background-size: 100%;
	border: none;
	outline: none;
	background-color: transparent;

	&:active{
		filter: brightness(90%);
	}
}
</style>
