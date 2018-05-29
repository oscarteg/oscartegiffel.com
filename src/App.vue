<template>
  <div> 
    <Fade>
      <PreLoader v-if="loading"/>
      <div v-cloak v-if="!loading">
        <Hero />
        <Fade>
          <router-view class="section container" />
        </Fade>
        <FooterCta/>
        <Footer />
      </div> 
    </Fade>
  </div>
</template>

<script>
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PreLoader from "@/components/PreLoader";
import Fade from "@/components/transition/Fade";
import JobStatus from "@/components/JobStatus";
import FooterCta from "@/components/FooterCta";

export default {
  name: "App",
  data() {
    return {
      loading: true
    };
  },
  components: {
    Hero,
    Footer,
    PreLoader,
    Fade,
    JobStatus,
    FooterCta
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
</style>
