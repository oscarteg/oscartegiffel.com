import Vue from "vue";
import Router from "vue-router";
import AboutMe from "./views/AboutMe.vue";
import WhatICan from "./views/WhatICan.vue";
import WhatIHaveLearned from "./views/WhatIHaveLearned.vue";
import WhatIHaveDone from "./views/WhatIHaveDone.vue";
Vue.use(Router);
export default new Router({
  mode: "history",
  linkExactActiveClass: "is-active",
  routes: [
    {
      path: "/wat-ik-kan",
      name: "WhatICan",
      component: WhatICan
    },
    {
      path: "/wat-ik-heb-geleerd",
      name: "WhatIHaveLearned",
      component: WhatIHaveLearned
    },
    {
      path: "/wat-ik-heb-gedaan",
      name: "WhatIHaveDone",
      component: WhatIHaveDone
    },
    {
      path: "/",
      name: "AboutMe",
      component: AboutMe
    }
  ]
});
//# sourceMappingURL=router.js.map
