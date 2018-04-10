<template>
  <div>
    <Hero />
    <transition mode="out-in" 
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
      >
      <router-view class="section container"  />
    </transition>
    <Footer />
  </div> 
</template>
<script>
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Hero,
    Footer
  }
};
</script>
