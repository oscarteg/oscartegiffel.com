<template>
  <header class="header">
    <section class="hero is-fullheight is-bold background-image" >
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered is-centered">
            <div class="column is-half title">
              <h1 class="name--title">Oscar te Giffel</h1> <BlinkingCursor/>
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
import BlinkingCursor from "@/components/BlinkingCursor";

export default {
  name: "Hero",
  components: {
    Navigation,
    BlinkingCursor
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
