<template>
  <div>
    <Hero />
    <router-view/>
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
