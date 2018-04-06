<template>
  <header class="header">
    <Particlejs />
    <section class="hero is-fullheight is-bold">
      <div class="hero-head">
        <NavBar />
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="box">
                <figure class="image is-square">
                  <img src="https://picsum.photos/600/600/?random" alt="Description">
                </figure>
              </div>
            </div>
            <div class="column is-6 is-offset-1">
              <h1 id="typed-element" class="title is-2">
              </h1>
              <h2 class="subtitle is-4">
                Let this cover page describe a product or service.
              </h2>
              <br>
              <p class="has-text-centered">
                <a class="button is-medium is-primary is-outlined">
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>    
      <div class="hero-foot">
        <div class="container">
          <div class="tabs is-centered is-boxed is-fullwidth">
            <Navigation />
          </div>
        </div>
      </div>
    </section>
      </header>
</template>

<script>
import Navigation from "@/components/Navigation";
import NavBar from "@/components/Navbar";
import Particlejs from "@/components/Particlejs";
import Typed from "typed.js";

export default {
  name: "Hero",
  components: {
    Navigation,
    NavBar,
    Particlejs
  },
  mounted() {
    new Typed("#typed-element", {
      strings: ["Developer", "Dont know what i am"],
      typeSpeed: 250,
      loop: true,
      showCursor: false
    });
  }
};
</script>
