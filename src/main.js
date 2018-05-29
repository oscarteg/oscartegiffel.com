import Vue from "vue";
import Buefy from "buefy";
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import _ from "lodash";

import App from "./App.vue";
import router from "./router";
import "./assets/sass/main.scss";

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
  render: h => h(App)
}).$mount("#app");
