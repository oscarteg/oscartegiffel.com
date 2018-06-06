<template>
    <div class="app">
        <Fade>
            <PreLoader v-if="loading"/>
            <div v-cloak v-if="!loading">
                <Hero/>
                <Fade>
                    <div class="background-wavy">
                        <router-view class="section container content"/>
                    </div>
                </Fade>
                <FooterCta/>
                <Footer/>
            </div>
        </Fade>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";
import PreLoader from "@/components/PreLoader.vue";
import Fade from "@/components/transition/Fade.vue";
import JobStatus from "@/components/JobStatus.vue";
import FooterCta from "@/components/FooterCta.vue";

@Component({
  components: { Hero, Footer, PreLoader, Fade, JobStatus, FooterCta }
})
export default class App extends Vue {
  loading = true;

  created(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>


<style lang="scss">
.background-wavy {
  background: url(./assets/img/wave.svg) no-repeat top;
  background-size: 200%;
}
</style>
