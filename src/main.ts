import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faBriefcase,
  faBusinessTime,
  faMobile,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import _ from "lodash";
import "./assets/sass/main.scss";

import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas"
});

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);

// Add libraries to fontawesome
library.add(fab, faEnvelope, faBriefcase, faBusinessTime, faMobile, faSquare);

Vue.prototype.$_ = _;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
