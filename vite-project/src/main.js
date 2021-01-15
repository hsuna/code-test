// 完整引入 Element
import { createApp } from 'vue'
import { ElPagination, locale } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import { use } from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/zh-cn';

import App from './App2.vue'

use(lang);
const app = createApp(App);
app.use(ElPagination)
app.mount('#app')
