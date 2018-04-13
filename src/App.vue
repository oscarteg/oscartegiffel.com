<template>
<div> 
  <PreLoader v-if="loading" />
  <div v-cloak v-if="!loading">
    <Hero />
    <transition mode="out-in" 
      class="transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      >
      <router-view class="section container"  />
    </transition>
    <Footer />
  </div> 
</div>
</template>
<script>
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PreLoader from "@/components/PreLoader";

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
    PreLoader
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

.animated {
  -webkit-animation-duration: 200ms;
  -moz-animation-duration: 200ms;
  animation-duration: 200ms;
}
</style>
