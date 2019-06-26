<template>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="50%">
            <viewer  class="img-box">
                <img :src="url">
            </viewer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
</template>

<script>
    export default {
        name: "picshow",
        props: {
           /* dialogTitle: {
                type: String,
                default: null
            },
            dialogVisible:{
                type: Boolean,
                default:false
            },
            url:{
                type:String,
                default:null
            }*/
        },
        data: function(){
            return {
                dialogTitle: '',
                dialogVisible: false,
                url: ''
            }
        }
    }
    /*export function show(dialogTitle,dialogVisible,url){
        this.dialogTitle = dialogTitle;
        this.dialogVisible = dialogVisible;
        this.url = url;
    }*/

</script>

<style scoped>

</style>
