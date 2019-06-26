<template>
	<transition :name="transitionName" 
		@after-leave="onAfter"
	>
		<section ref="dialog" class="dialog" :class="isIOS" @touchstart="onclick">
			<slot></slot>
		</section>
	</transition>
</template>
<script>
export default {
    props: {
        isFixed: Boolean,
        isShow: Boolean,
        transitionName: {
            type: String,
            default: "dialog-fade"
        },
        isDisableSetTop: Boolean
    },
    watch: {
        isShow(value) {
            if (value) {
                window.lockPage();
            } else {
                window.unlockPage();
            }
        }
    },
    computed: {
        isIOS() {
            if (!this.isFixed && FN.isIOS) {
                return "ios-fix";
            } else {
                return "";
            }
        }
    },
    methods: {
        onclick(e) {
            if (e.target === e.currentTarget) {
                e.preventDefault();
                this.$emit("click");
            }
        },
        scrollTop() {
            return Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
		},
		onAfter(){
			if(!this.$store){
				return
			}
			this.$store.commit("TOGGLE_PAGE_LOCKED",false)
		},
        setTop() {
            if (this.isDisableSetTop) {
                return;
            }
            if (this.isIOS) {
                this.$refs.dialog.style.top = this.scrollTop() + "px";
            }
        },
	},
	created(){
		if(!this.$store){
				return
			}
		this.$store.commit("TOGGLE_PAGE_LOCKED",true)
	},
    mounted() {
        if (this.isDisableSetTop) {
            return;
		}
		this.setTop();
		window.lockPage();
    },
    beforeDestroy() {},
    destroyed() {
		
        if (this.isDisableSetTop) {
            return;
		}
		window.unlockPage();
		
    }
};
</script>
<style>
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
	z-index: 600;

    /* background-color: rgba(0, 0, 0, .5); */
}
.ios-fix {
    position: absolute !important;
}
.dialog-btn {
	display: block;
    width: 3.33rem;
	height: 0.89rem;
    margin: auto;
    border: none;
    outline: none;
    transition: all 0.5s;
}
.dialog-btn:active {
    transform: scale(0.8);
}
</style>
