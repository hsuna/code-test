/*
 * @Description: 状态管理器
 * @Author: Hsuna
 */

import { reactive } from "vue";

class Store {
  constructor(){
    this.state = reactive({
      // tab切換狀態
      dialogWrap: {
        visible: false,
        server: [],
        close: false
      },
    })
  }
}


export default new Store();