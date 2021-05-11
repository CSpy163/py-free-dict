import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// 全局 sql 模版
Vue.prototype.$sqlTemplate = {
  prefix: "",
  suffix: "",
  singlePattern: "",
  singleFullPattern: "",
  multiPattern: "",
  multiFullPattern: "",
}

// 全局对比列下标
Vue.prototype.$compareIndexMap = {}

new Vue({
  render: h => h(App),
  components: {
    
  }
}).$mount('#app')
