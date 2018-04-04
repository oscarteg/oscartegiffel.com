<template>
  <div class="has-navbar-fixed-top">
    <Hero />
    <router-view class="section"/>
  </div> 
</template>
<script>
import Hero from "@/components/Hero";

export default {
  name: "App",
  components: {
    Hero
  }
};
</script>
