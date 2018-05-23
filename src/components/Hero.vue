<template>
  <header class="header">
    <!-- <Particlejs classes="is-overlay"/> -->
    <!-- <div class="background-image is-overlay"/> -->
    <section class="hero is-fullheight is-bold background-image" >
      <div class="hero-head">
        <NavBar />
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered is-centered">
            <div class="column is-half title">
              <h1 class="name--title">Oscar te Giffel</h1>
              <!-- <TypedJs :strings="['developer']" /> -->
              <br>
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
import TypedJs from "@/components/Typedjs";

export default {
  name: "Hero",
  components: {
    Navigation,
    NavBar,
    Particlejs,
    TypedJs
  }
};
</script>

<style lang="scss">
.background-image {
  // background: url("../assets/img/hero-background.svg") no-repeat right top;
  // background-size: cover;
  // z-index: 10000;
}

.name--title {
  letter-spacing: 1rem;
  text-transform: uppercase;
}
</style>
