import Vue from "vue";
import Buefy from "buefy";
import VueLoading from "vuex-loading";
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/sass/main.scss";

Vue.use(Buefy, {
  defaultIconPack: "fas"
});

fontawesome.library.add(brands, solid);

Vue.use(VueLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vueLoading: new VueLoading({
    useVuex: true
  }),
  render: h => h(App)
}).$mount("#app");
