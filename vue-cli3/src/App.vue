<template>
  <div id="app">
    <div class="left">
      <TreeNode id="root" :select="select" :level="0" :nodes="transform"  @change="onSelect"/>
    </div>
    <div class="right">
      <div class="btn-group">
        <button type="button" @click="onNew">+</button>
        <button type="button" @click="onChild">++</button>
        <button type="button" @click="onUp">↑</button>
        <button type="button" @click="onDown">↓</button>
      </div>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>parentId</th>
              <th>level</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{red: index==select}" v-for="(item, index) in flatArray" :key="item.id">
              <td>{{index}}</td>
              <td>{{item.id}}</td>
              <td>{{item.parentId}}</td>
              <td>{{item.level}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">共：{{flatArray.length}} 条</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TreeNode from './components/TreeNode'

export default {
  components:{
    TreeNode
  },
  data(){
    return {
      select: -1,
      flatArray: []
    }
  },
  computed: {
    transform(){
      let tree = [], treeTable = {}
      this.flatArray.forEach((node, index) => {
        const newNode = treeTable[node.id] = {
          index,
          ...node,
          nodes: []
        }
        if(node.parentId){
          treeTable[node.parentId].nodes.push(newNode)
        }else{
          tree.push(newNode)
        }
      })
      return tree
    }
  },
  methods: {
    onSelect(index){
      this.select = index
    },
    onNew(){
      if(this.select>0 && this.select < this.flatArray.length){
        let item = this.flatArray[this.select];
        this.flatArray.splice(this.select+1, 0, {
          id: 's' + Date.now(),
          parentId: item.parentId,
          level: item.level
        })
      }else{
        this.flatArray.push({
          id: 's' + Date.now(),
          parentId: null,
          level: 1
        })
      }
    },
    onChild(){
      if(this.select < 0) return;

      let item = this.flatArray[this.select];
      this.flatArray.splice(this.select+1, 0, {
        id: 's' + Date.now(),
        parentId: item.id,
        level: item.level+1
      })
    },
    getNodesEnd(index){
      let item = this.flatArray[index];
      let nextItem = this.flatArray[++index];
      while(nextItem){
        if(item.level === nextItem.level) break;
        nextItem = this.flatArray[++index]
      }
      return index
    },
    onUp(){
      if(this.select <= 0){
        return;
      }
     
     /*  let item = this.flatArray[this.select];
      let swapItem = this.flatArray[swapIndex];
      if(swapItem.level > item.level){
        swapIndex = this.select-1;
        swapItem = this.flatArray[swapIndex]
        while(swapItem){
          if(item.level+1 === swapItem.level){
            item.level = item.level+1
            item.parentId = swapItem.parentId
            break;
          }
          swapItem = this.flatArray[--swapIndex]
        }
      }else{
        item.level = swapItem.level
        item.parentId = swapItem.parentId
        this.$set(this.flatArray, swapIndex, item)
        this.$set(this.flatArray, this.select, swapItem)
        this.select = swapIndex;
      } */
    },
    onDown(){
      if(this.select >= this.flatArray.length-1){
        return;
      }
      let endIndex = this.getNodesEnd(this.select);
      let nodesItem = this.flatArray.splice(this.select, endIndex-this.select)
      endIndex = this.getNodesEnd(this.select);
      this.flatArray.splice(endIndex, 0, ...nodesItem)
      this.select = endIndex
    }
  }
}
</script>


<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 1200px;
  height: 800px;
  margin: 0 auto;

  .left{
    float: left;
    width: 600px;
    height: 100%;
    text-align: left;
  }
  .right{
    float: right;
    width: 600px;
    height: 100%;

    .btn-group{
      text-align: left;

      button{
        margin: 0 4px;
      }
    }
    .list{
      text-align: left;
      .red{
        color: red;
      }
      table{
        width: 100%;
      }
      tfoot{
        text-align: right;
      }
    }
  }
}
</style>
