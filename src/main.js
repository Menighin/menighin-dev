import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueHead from 'vue-head'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueHead);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
