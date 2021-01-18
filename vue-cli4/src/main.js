import { createApp } from 'vue'
import { ElPagination, locale } from 'element-plus';
import { use } from 'element-plus/es/locale';
import lang from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';

const app = createApp(App)
debugger
locale(lang);
app.use(ElPagination);
app.mount('#app')