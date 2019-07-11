<template>
    <div class="treeNode">
        <label><input type="radio" :checked="index==select" @change="onSelect(index)" name="treeNode" :value="index" /> └ {{index}}：{{id}}</label>
        <tree-node v-for="node in nodes" :key="node.id" :id="node.id" :select="select" :index="node.index" :level="node.level" :nodes="node.nodes" @change="onSelect"></tree-node>
    </div>
</template>

<script>
import TreeNode from './TreeNode'
export default {
    name: 'TreeNode',
    props:{
        select: {
            type: Number,
            defalut: 0,
        },
        index: {
            type: Number,
            defalut: 0,
        },
        id: {
            type: String,
            defalut: '',
        },
        level: {
            type: Number,
            defalut: 1,
        },
        nodes:{
            type: Array,
            defalut: () => []
        }
    },
    methods: {
        onSelect(index){
            this.$emit('change', index)
        }
    },
    components:{
        TreeNode
    }
}
</script>

<style scope>
.treeNode{
    padding-left: 20px;
}
</style>
