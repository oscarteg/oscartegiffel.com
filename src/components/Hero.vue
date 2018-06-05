<template>
    <header class="header">
        <section class="hero is-fullheight is-bold">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="columns is-vcentered is-centered">
                        <div class="column is-half title">
                            <h1 class="name--title title has-text-white-bis">Oscar te Giffel</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hero-foot">
                <div class="container">
                    <Navigation/>
                </div>
            </div>
        </section>
    </header>
</template>

<script lang="ts">
import Navigation from "@/components/Navigation";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Navigation
  }
})
export default class Hero extends Vue {}
</script>

<style lang="scss">
@import "../assets/sass/_variables";

.name--title {
  letter-spacing: 1.5rem;
  text-transform: uppercase;
  font-family: $family-monospace;
}
</style>
