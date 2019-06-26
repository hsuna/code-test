import KDialog from "../Base/Dialog";
import KSelect from "../Base/Form/select.vue";

export default {
	components:{
		KDialog,
		KSelect
	},
	computed:{
		state(){
			return this.$store.state
		}
	}
}