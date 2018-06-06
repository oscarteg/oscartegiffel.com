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
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PreLoader from "@/components/PreLoader";
import Fade from "@/components/transition/Fade";
import JobStatus from "@/components/JobStatus";
import FooterCta from "@/components/FooterCta";

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
