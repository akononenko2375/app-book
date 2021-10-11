import Vue from 'vue'
import App from './App.vue'
import store from "@/store";
import Vuelidate from 'vuelidate';
import router from "@/router/router";

Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  Vuelidate,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
