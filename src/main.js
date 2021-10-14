import Vue from 'vue'
import App from './App.vue'
import store from "@/store";
import router from "@/router/router";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
