import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// createApp(App).mount('#app')


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

// 引入element图标
// npm install @element-plus/icons-vue
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// 引入element ui
// npm install element-plus --save
app.use(ElementPlus)        
app.mount('#app')
