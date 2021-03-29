import { createApp } from 'vue'
import App from './App.vue'

import init from '../../test/1.js';

createApp(App)
    .use(init)
    .mount('#app')
