<template>
<div> 
  
  <PreLoader v-if="loading" />
  <transition mode="out-in" enter-active-class="animated fadeIn">
    <div v-cloak v-if="!loading">
      <Hero />
      <transition mode="out-in" 
        enter-active-class="router--transition animated fadeIn"
        leave-active-class="router--transition animated fadeOut">
        <router-view class="section container" />
      </transition>
      <Footer />
    </div> 
  </transition>
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

.router--transition {
  -webkit-animation-duration: 250ms;
  -moz-animation-duration: 250ms;
  animation-duration: 250ms;
}
</style>
