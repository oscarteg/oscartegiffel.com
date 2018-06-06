<template>
    <footer class="footer has-text-white-ter">
        <div class="container">
            <section class="section">
                <div class="columns is-centered">
                    <div class="column is-one-quarter">
                        <h2 class="subtitle has-text-white-ter">Neem anders contact op via</h2>
                        <communication/>
                    </div>
                    <div class="column is-one-quarter">
                        <h2 class="subtitle has-text-white-ter">Ik heb ervaring met</h2>
                        <skills/>
                    </div>
                </div>
            </section>
            <hr>
            <socials/>
            <copyright/>
        </div>
    </footer>
</template>

<script lang="ts">
import Skills from "@/components/Skills.vue";
import Copyright from "@/components/Copyright.vue";
import Communication from "@/components/Communication.vue";
import Socials from "@/components/Socials.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Skills,
    Copyright,
    Communication,
    Socials
  }
})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
</style>
