<template>
    <section class="hero is-fullheight is-bold">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="level-item">
                    <Loading/>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Loading from "@/components/Loading.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    Loading
  }
})
export default class PreLoader extends Vue {}
</script>

<style>
</style>
