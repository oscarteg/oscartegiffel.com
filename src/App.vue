<template>
  <div>
    <Hero />
    <router-view class="section"/>
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
