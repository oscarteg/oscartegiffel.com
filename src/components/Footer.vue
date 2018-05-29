<template>
  <footer class="footer has-text-white-ter">
    <div class="container">
      <section class="section">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <h2 class="subtitle has-text-white-ter">Contact</h2>
            <communication />
          </div>
          <div class="column is-one-quarter">
            <h2 class="subtitle has-text-white-ter">Skills</h2>
            <skills />
          </div>
        </div>
      </section>
      <hr>
      <socials />
      <copyright />
    </div>
  </footer>
</template>

<script>
import Skills from "@/components/Skills";
import Copyright from "@/components/Copyright";
import Communication from "@/components/Communication";
import Socials from "@/components/Socials";

export default {
  name: "Footer",
  components: {
    Skills,
    Copyright,
    Communication,
    Socials
  }
};
</script>

<style lang="scss" scoped>
</style>
