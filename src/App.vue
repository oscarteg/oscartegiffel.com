<template>
<div> 
  <Fade>
    <PreLoader v-if="loading"/>
    <div v-cloak v-if="!loading">
      <Hero />
      <Fade>
        <router-view class="section container" />
      </Fade>
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
    Fade
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

.router--transition {
  -webkit-animation-duration: 250ms;
  -moz-animation-duration: 250ms;
  animation-duration: 250ms;
}
</style>
