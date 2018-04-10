<template>
  <section class="hero is-fullheight is-bold">
  <div class="hero-body">
    <div class="container has-text-centered"> 
        <div class="level-item">
            <Loading />
        </div> 
    </div>
  </div>
</section>
</template>

<script>
import Loading from "@/components/Loading";

export default {
  name: "PreLoader",
  components: {
    Loading
  }
};
</script>

<style>
</style>
