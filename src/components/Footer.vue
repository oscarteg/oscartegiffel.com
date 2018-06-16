<template>
    <footer class="footer has-text-white-ter">
        <div class="container">
            <section class="section">
                <div class="columns is-centered">
                    <div class="column is-one-quarter">
                        <communication/>
                    </div>
                    <div class="column is-one-quarter">
                        <skills/>
                    </div>
                    <div class="column is-one-quarter">
                        <referrals/>
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
import Referrals from "@/components/Referrals.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Skills,
    Copyright,
    Communication,
    Socials,
    Referrals
  }
})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
</style>
