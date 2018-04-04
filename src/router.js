import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import Services from "@/views/Services";
import Resume from "@/views/Resume";
import Work from "@/views/Work";
import Contact from "@/views/Contact";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkExactActiveClass: "is-active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/wat-ik-doe",
      name: "services",
      component: Services
    },
    {
      path: "/cv",
      name: "resume",
      component: Resume
    },
    {
      path: "/ervaring",
      name: "work",
      component: Work
    },
    {
      path: "/over-mij",
      name: "about",
      component: About
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    }
  ]
});
