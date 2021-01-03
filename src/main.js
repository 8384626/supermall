import mitt from "mitt"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast } from 'vant';
import fastClick from 'fastclick'



Toast.setDefaultOptions({ duration: 1000 });
fastClick.attach(document.body)

const app = createApp(App)//正常配置
//挂载事务总线
app.config.globalProperties.$bus = new mitt()


app.use(router).use(store).use(Toast).mount('#app')
