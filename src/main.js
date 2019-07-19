import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

import MyModal from './components/MyModal'

// import {Tabs, Tab} from 'vue-tabs-component';
import store from './store'
import './assets/scss/style.scss'

Vue.config.productionTip = false

Vue.component('MyModal', MyModal)

Vue.filter('renamePentahauseToStudia', function (value) {
  if (/Пентхаус/.test(value)) {
    return value.replace(/Пентхаус/g, 'Студия')
  }
  return value
})

Vue.use(Vuelidate)
Vue.use(VueMask)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
