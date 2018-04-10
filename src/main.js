import Vue from "vue";
import Buefy from "buefy";
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import VueI18n from "vue-i18n";
import _ from "lodash";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/sass/main.scss";

// Add Internationalization
const messages = {
  en: {
    message: {
      hello: "hello world"
    }
  },
  ja: {
    message: {
      hello: "こんにちは、世界"
    }
  }
};

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en", // set locale
  messages // set locale messages
});

/*

Add styling to Vue

Buefy 
Fontawesome
Vue loading

*/
Vue.use(Buefy, {
  defaultIconPack: "fas"
});

// Add libraries to fontawesome
fontawesome.library.add(brands, solid, regular);

/*
 Adding utils

 Lodash
*/

Vue.prototype.$_ = _;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
