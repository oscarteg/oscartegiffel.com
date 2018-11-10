<template>
  <header class="header background-wavy">
    <section class="hero is-fullheight is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered is-centered">
            <div class="column is-half title is-centered text-center">
              <h1
                class="title name--title has-text-white-bis underline--magical"
              >
                Oscar te Giffel
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container"><Navigation /></div>
      </div>
    </section>
  </header>
</template>

<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Title from "@/components/Title.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Navigation,
    Title
  }
})
export default class Hero extends Vue {}
</script>

<style lang="scss">
@import "../assets/sass/_variables";

.name--title {
  letter-spacing: 1.5rem;
  text-transform: uppercase;
}
</style>
