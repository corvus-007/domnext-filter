import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

// import {Tabs, Tab} from 'vue-tabs-component';
import store from './store'
import './assets/scss/style.scss'

Vue.config.productionTip = false

Vue.filter('renamePentahauseToStudia', function (value) {
  if (/Пентхаус/.test(value)) {
    return value.replace(/Пентхаус/g, 'Студия')
  }
  return value
})

Vue.use(VModal)
Vue.use(Vuelidate)
Vue.use(VueMask)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
