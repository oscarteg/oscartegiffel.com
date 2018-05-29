<template>
  <header class="header">
    <section class="hero is-fullheight is-bold background-image" >
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered is-centered">
            <div class="column is-half title">
              <h1 class="name--title" style="display: inline-block;">Oscar te Giffel</h1>
            </div>
          </div>
        </div>
      </div>    
      <div class="hero-foot">
        <div class="container">
          <Navigation />
        </div>
      </div>
    </section>
      </header>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "Hero",
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
.name--title {
  letter-spacing: 1.5rem;
  text-transform: uppercase;
}
</style>
