<template>
    <div class="container-fluid footer-cta--container ">
        <div class="columns is-centered box">
          <div class="column">
            <h1 class="subtitle">Fuck</h1>
          </div>
          <div class="column">
            <div class="job-status">
                <job-status />
            </div> 
          </div>
        </div>
    </div>
</template>

<script>
import JobStatus from "@/components/JobStatus";

export default {
  name: "FooterCta",
  components: {
    JobStatus
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_variables";

.footer-cta--container {
  padding: 50px;
  background-image: linear-gradient(
    180deg,
    $white,
    $white 50%,
    $footer-background-color 0,
    $footer-background-color
  );
}
</style>
